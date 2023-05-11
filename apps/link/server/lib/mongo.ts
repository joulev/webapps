import { MongoClient } from "mongodb";
import { env } from "~/env";

export const client = new MongoClient(env.MONGODB_URI);
