import { config } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { encodeHex } from "https://deno.land/std@0.224.0/encoding/hex.ts";

const env = await config();

const STRIPE_SECRET_KEY = env["STRIPE_SECRET_KEY"];

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature") || "";
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(STRIPE_SECRET_KEY);
  const dataBuf = encoder.encode(body);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, dataBuf);
  const signatureHex = encodeHex(new Uint8Array(signature));

  return new Response(signatureHex, {
    headers: { "Content-Type": "text/plain" },
  });
});