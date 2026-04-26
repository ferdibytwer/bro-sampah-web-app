import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid env");
}

export const env = {
  apiUrl: parsed.data.EXPO_PUBLIC_API_URL,
  appName: parsed.data.EXPO_PUBLIC_APP_NAME,
};
