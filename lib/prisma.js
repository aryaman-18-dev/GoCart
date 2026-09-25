// lib/prisma.js

import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Neon serverless config
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const globalForPrisma = globalThis;

const adapter = new PrismaNeon({
  connectionString,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(
    process.env.NEXT_RUNTIME === "edge"
      ? {
          adapter,
        }
      : {},
  );

if (process.env.NEXT_RUNTIME !== "edge") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
