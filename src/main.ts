import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
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
const app = new Application();
const router = new Router();

router.get("/warm-up/", (ctx) => {
  ctx.response.body = "The API is now working!";
});

router.get("/banks", async (ctx) => {
  const banks = await prisma.bank.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  ctx.response.body = banks;
});

app.use(router.routes());

await app.listen({ port: 8000 });
