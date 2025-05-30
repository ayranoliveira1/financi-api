import { z } from 'zod'

export const envShema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  STRIPE_PREMIUM_PLAN_PRICE_ID: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  APP_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
})

export type Env = z.infer<typeof envShema>
