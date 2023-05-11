import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { z } from "zod";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const inputSchema = z.object({
  prompt: z.string(),
  previousMessages: z.array(
    z.object({ role: z.literal("assistant").or(z.literal("user")), content: z.string() }),
  ),
});

export async function POST(request: Request) {
  const secret = cookies().get("secret")?.value;
  if (!secret || secret !== process.env.JOULEV_PASSWORD)
    return NextResponse.json({}, { status: 401 });

  const result = inputSchema.safeParse(await request.json());
  if (!result.success) return NextResponse.json({}, { status: 400 });
  const { prompt, previousMessages } = result.data;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...previousMessages,
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      stream: true,
    });

    return new Response(completion.body);
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 500 });
  }
}

export const runtime = "edge";
