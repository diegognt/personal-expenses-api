import { PrismaClient } from "../generated/client/deno/edge.ts";
import { load } from "https://deno.land/std@0.203.0/dotenv/mod.ts";

const env = await load();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});
const banks = [
  {
    name: "Davivienda",
  },
  {
    name: "Bancolombia",
  },
  {
    name: "Scotiabank",
  },
];

await prisma.bank.deleteMany({});
for (const bank of banks) {
  try {
    const newBank = await prisma.bank.create({
      data: bank,
    });
    console.log(`Created new bank with id: ${newBank.id}`);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
}

await prisma.$disconnect();
