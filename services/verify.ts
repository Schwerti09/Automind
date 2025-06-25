// services/verify.ts

/**
 * Dummy-Handler, den main.ts importiert.
 * Später kannst du hier echte Lizenz- oder Token-Prüfung einbauen.
 */
export async function verifyKeyHandler(req: Request): Promise<Response> {
  // Beispiel: Key per Header schicken
  const clientKey = req.headers.get("x-automind-key") ?? "";
  const masterKey = Deno.env.get("LICENSE_MASTER_KEY") ?? "";

  const isValid = clientKey === masterKey;

  return new Response(
    JSON.stringify({ valid: isValid }),
    { status: isValid ? 200 : 401, headers: { "Content-Type": "application/json" } },
  );
}
