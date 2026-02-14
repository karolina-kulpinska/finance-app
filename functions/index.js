const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

const resendApiKey = defineSecret("RESEND_API_KEY");

/**
 * Wysyła e-mail z linkiem zaproszenia do rodziny.
 * Wywołanie z aplikacji: httpsCallable('sendFamilyInviteEmail')({ email, inviteLink, familyName })
 *
 * Konfiguracja:
 * 1. Konto na https://resend.com (darmowy plan: 100 maili/dzień)
 * 2. Utwórz API Key w Resend Dashboard
 * 3. Ustaw secret: firebase functions:secrets:set RESEND_API_KEY
 * 4. Nadawca (from): zweryfikuj domenę w Resend LUB użyj "onboarding@resend.dev" tylko do testów
 */
exports.sendFamilyInviteEmail = onCall(
  { secrets: [resendApiKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Musisz być zalogowany.");
    }

    const { email, inviteLink, familyName } = request.data || {};
    if (!email || !inviteLink) {
      throw new HttpsError(
        "invalid-argument",
        "Podaj email i link zaproszenia (inviteLink)."
      );
    }

    const apiKey = resendApiKey.value();
    if (!apiKey) {
      throw new HttpsError(
        "failed-precondition",
        "Brak klucza RESEND_API_KEY. Ustaw: firebase functions:secrets:set RESEND_API_KEY"
      );
    }

    const resend = new Resend(apiKey);
    const from = "Moja Aplikacja Finansowa <onboarding@resend.dev>";
    const appName = familyName ? `Rodzina „${familyName}”` : "Rodzina";

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333;">Zaproszenie do ${appName}</h2>
  <p>Otrzymujesz zaproszenie do dołączenia do grupy rodzinnej w aplikacji finansowej.</p>
  <p><strong>Kliknij w link poniżej, aby dołączyć:</strong></p>
  <p style="margin: 24px 0;"><a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Dołącz do rodziny</a></p>
  <p style="color: #666; font-size: 14px;">Jeśli przycisk nie działa, skopiuj i wklej ten adres w przeglądarce:</p>
  <p style="word-break: break-all; font-size: 13px; color: #667eea;">${inviteLink}</p>
  <p style="color: #999; font-size: 12px; margin-top: 32px;">Ta wiadomość została wysłana przez aplikację Moja Aplikacja Finansowa.</p>
</body>
</html>
`.trim();

    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [email],
        subject: `Zaproszenie do ${appName}`,
        html,
      });

      if (error) {
        console.error("Resend error:", error);
        throw new HttpsError("internal", error.message || "Błąd wysyłki e-mail.");
      }

      return { success: true, id: data?.id };
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      console.error("sendFamilyInviteEmail error:", err);
      throw new HttpsError(
        "internal",
        err.message || "Nie udało się wysłać e-maila."
      );
    }
  }
);
