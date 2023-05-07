import { cookies } from "next/headers";
import { isCorrectUser } from "./utils";

export function getToken() {
  const token = cookies().get("token");
  if (!token || !isCorrectUser(token.value)) return null;
  return token.value;
}
