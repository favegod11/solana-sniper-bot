import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PRIVATE_KEY: z.string().min(1, "PRIVATE_KEY is required"),
  DRY_RUN: z.enum(["true", "false"]).default("true"),
  LOG_LEVEL: z.string().default("info"),
  MAX_POSITION_USD: z.string().default("50"),
  MAX_DAILY_LOSS_USD: z.string().default("25"),
  TAKE_PROFIT_PCT: z.string().default("12"),
  STOP_LOSS_PCT: z.string().default("6"),
  RPC_URL: z.string().default("https://api.mainnet-beta.solana.com"),
  ORDER_SIZE_SOL: z.string().default("0.25"),
  PRIORITY_FEE_MICROLAMPORTS: z.string().default("50000"),
});

export const env = envSchema.parse(process.env);

export function buildRuntimeContext() {
  const privateKeyPreview =
    env.PRIVATE_KEY.length <= 10
      ? env.PRIVATE_KEY
      : `${env.PRIVATE_KEY.slice(0, 6)}...${env.PRIVATE_KEY.slice(-4)}`;

  return {
    repo: "solana-sniper-bot",
    family: "solana",
    market: "new Solana token launches and fresh liquidity pools",
    signal: "launch events, new pools, and execution-ready liquidity conditions",
    dryRun: env.DRY_RUN === "true",
    orderSize: env.ORDER_SIZE_SOL,
    privateKeyPreview,
  } as const;
}
