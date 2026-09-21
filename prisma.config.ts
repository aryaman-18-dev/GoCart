import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "prisma/config";

const envPath = resolve(process.cwd(), ".env");

if (existsSync(envPath)) {
    const envFile = readFileSync(envPath, "utf8");

    for (const line of envFile.split(/\r?\n/)) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

        if (!match || match[1].startsWith("#")) {
            continue;
        }

        const [, key, rawValue = ""] = match;
        const value = rawValue.replace(/^['"]|['"]$/g, "");

        process.env[key] ??= value;
    }
}

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: requiredEnv("DATABASE_URL"),
        directUrl: requiredEnv("DIRECT_URL"),
    },
});

function requiredEnv(key: string) {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
}
