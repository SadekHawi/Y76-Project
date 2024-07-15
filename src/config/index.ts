import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, API_URL } = process.env;
