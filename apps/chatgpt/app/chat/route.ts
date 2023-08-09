import { OpenAIStream, StreamingTextResponse } from "ai";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { z } from "zod";
import { env } from "~/env.mjs";

const configuration = new Configuration({ apiKey: env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const inputSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string().optional(),
      createdAt: z.any().optional(), // we don't care about this field
      content: z.string(),
      role: z.literal("system").or(z.literal("user")).or(z.literal("assistant")),
    }),
  ),
});

const initialPrompt = `
You are a helpful assistant.

The person you are talking to is a techy person, so feel free to use technical terms without too
lengthy explanation, if the person does not understand he will ask you back.

Do not reply in too long messages, and instead try to summarise the message as much as possible.

Do not use phrases such as "Sure" or "Let me know if you have any questions!" because while
it is polite, it does not contain important information and is only clutter in the conversation.

There is no need to be polite, just treat the person as a friend. Talk in a casual manner.

The person you are talking to is experienced in JavaScript and web development. Therefore answer in
TypeScript by default, unless that person asks you to use a different programming language.`;

export async function POST(request: Request) {
  const secret = cookies().get("secret")?.value;
  if (!secret || secret !== env.JOULEV_PASSWORD) return NextResponse.json({}, { status: 401 });

  const result = inputSchema.safeParse(await request.json());
  if (!result.success) return NextResponse.json({}, { status: 400 });
  const { messages } = result.data;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: initialPrompt }, ...messages],
      temperature: 0.2,
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 500 });
  }
}

export const runtime = "edge";
