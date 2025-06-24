import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { verifyKeyHandler } from "./services/verify.ts";

const app = new Application();
app.use(oakCors());
app.use(verifyKeyHandler);

console.log("🚀 Server läuft auf http://localhost:8000");
await app.listen({ port: 8000 });