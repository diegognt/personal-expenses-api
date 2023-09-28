import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();
const router = new Router();

router.get("/warm-up/", (ctx) => {
  ctx.response.body = "The API is now working!";
});

app.use(router.routes());

await app.listen({ port: 8000 });
