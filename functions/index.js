const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const { defineSecret, defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Resend } = require("resend");
const Stripe = require("stripe");
const express = require("express");

admin.initializeApp();
const db = admin.firestore();

const resendApiKey = defineSecret("RESEND_API_KEY");
const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const stripePriceId = defineString("STRIPE_PRICE_ID", { default: "" });

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
        "Podaj email i link zaproszenia (inviteLink).",
      );
    }

    const apiKey = resendApiKey.value();
    if (!apiKey) {
      throw new HttpsError(
        "failed-precondition",
        "Brak klucza RESEND_API_KEY. Ustaw: firebase functions:secrets:set RESEND_API_KEY",
      );
    }

    const resend = new Resend(apiKey);
    const from = "Smart Budget <onboarding@resend.dev>";
    const appName = familyName ? `Rodzina „${familyName}”` : "Rodzina";

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333;">Zaproszenie do ${appName}</h2>
  <p>Otrzymujesz zaproszenie do dołączenia do grupy rodzinnej w Smart Budget.</p>
  <p><strong>Kliknij w link poniżej, aby dołączyć:</strong></p>
  <p style="margin: 24px 0;"><a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Dołącz do rodziny</a></p>
  <p style="color: #666; font-size: 14px;">Jeśli przycisk nie działa, skopiuj i wklej ten adres w przeglądarce:</p>
  <p style="word-break: break-all; font-size: 13px; color: #667eea;">${inviteLink}</p>
  <p style="color: #999; font-size: 12px; margin-top: 32px;">Smart Budget – smartbudget.pl</p>
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
        throw new HttpsError(
          "internal",
          error.message || "Błąd wysyłki e-mail.",
        );
      }

      return { success: true, id: data?.id };
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      throw new HttpsError(
        "internal",
        err.message || "Nie udało się wysłać e-maila.",
      );
    }
  },
);

exports.createCheckoutSession = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Musisz być zalogowany.");
    }

    const priceId = stripePriceId.value();
    if (!priceId) {
      throw new HttpsError(
        "failed-precondition",
        "Ustaw STRIPE_PRICE_ID w pliku functions/.env (patrz docs/STRIPE_SETUP.md)",
      );
    }

    const { successUrl, cancelUrl } = request.data || {};
    if (!successUrl || !cancelUrl) {
      throw new HttpsError(
        "invalid-argument",
        "Podaj successUrl i cancelUrl (np. adres Twojej aplikacji).",
      );
    }

    const stripe = new Stripe(stripeSecretKey.value(), {
      apiVersion: "2024-11-20.acacia",
    });
    const uid = request.auth.uid;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: uid,
        metadata: { firebaseUid: uid },
        payment_method_collection: "always",
        excluded_payment_method_types: ["customer_balance"],
      });

      return { url: session.url };
    } catch (err) {
      throw new HttpsError(
        "internal",
        err.message || "Błąd tworzenia sesji płatności.",
      );
    }
  },
);

exports.createCustomerPortalSession = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Musisz być zalogowany.");
    }

    const { returnUrl } = request.data || {};
    if (!returnUrl) {
      throw new HttpsError(
        "invalid-argument",
        "Podaj returnUrl (adres powrotu po zamknięciu Customer Portal).",
      );
    }

    const stripe = new Stripe(stripeSecretKey.value(), {
      apiVersion: "2024-11-20.acacia",
    });
    const uid = request.auth.uid;

    try {
      // Najpierw próbujemy znaleźć customer ID z sesji checkout
      let customerId = null;

      // Sprawdzamy czy użytkownik ma customer ID w Firestore (jeśli używasz rozszerzenia Stripe)
      try {
        const customerRef = db.collection("customers").doc(uid);
        const customerSnap = await customerRef.get();
        if (customerSnap.exists) {
          const customerData = customerSnap.data();
          if (customerData.stripeCustomerId) {
            customerId = customerData.stripeCustomerId;
          }
        }
      } catch (e) {
        // Ignoruj błąd jeśli kolekcja nie istnieje
      }

      // Jeśli nie znaleźliśmy customer ID, szukamy w sesjach checkout
      if (!customerId) {
        const sessions = await stripe.checkout.sessions.list({
          limit: 100,
        });
        const userSession = sessions.data.find(
          (s) =>
            (s.client_reference_id === uid ||
              s.metadata?.firebaseUid === uid) &&
            s.customer,
        );
        if (userSession && userSession.customer) {
          customerId =
            typeof userSession.customer === "string"
              ? userSession.customer
              : userSession.customer.id;
        }
      }

      // Jeśli nadal nie mamy customer ID, szukamy w subskrypcjach
      if (!customerId) {
        const subscriptions = await stripe.subscriptions.list({
          limit: 100,
        });
        const userSubscription = subscriptions.data.find(
          (sub) => sub.metadata?.firebaseUid === uid,
        );
        if (userSubscription && userSubscription.customer) {
          customerId =
            typeof userSubscription.customer === "string"
              ? userSubscription.customer
              : userSubscription.customer.id;
        }
      }

      // Jeśli nadal nie mamy customer ID, tworzymy nowego customera
      if (!customerId) {
        const userDoc = await db.collection("users").doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};
        const userEmail = request.auth.token.email || userData.email;

        const customer = await stripe.customers.create({
          email: userEmail,
          metadata: { firebaseUid: uid },
        });
        customerId = customer.id;

        // Zapisujemy customer ID w Firestore dla przyszłych użyć
        try {
          await db
            .collection("customers")
            .doc(uid)
            .set({ stripeCustomerId: customerId }, { merge: true });
        } catch (e) {
          // Ignoruj błąd zapisu
        }
      }

      // Tworzymy sesję Customer Portal
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return { url: portalSession.url };
    } catch (err) {
      throw new HttpsError(
        "internal",
        err.message || "Błąd tworzenia sesji Customer Portal.",
      );
    }
  },
);

const stripeWebhookApp = express();
stripeWebhookApp.use(express.raw({ type: "application/json" }));

stripeWebhookApp.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = stripeWebhookSecret.value();
  const stripe = new Stripe(stripeSecretKey.value(), {
    apiVersion: "2024-11-20.acacia",
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const uid = session.client_reference_id || session.metadata?.firebaseUid;
    if (!uid) {
      res.status(200).end();
      return;
    }

    try {
      await db
        .collection("users")
        .doc(uid)
        .set({ plan: "pro" }, { merge: true });

      // Zapisujemy Stripe customer ID – wymagane do Customer Portal
      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;
      if (customerId) {
        await db
          .collection("customers")
          .doc(uid)
          .set({ stripeCustomerId: customerId }, { merge: true });
      }
    } catch (e) {
    }
  }

  res.status(200).end();
});

exports.stripeWebhook = onRequest(
  { secrets: [stripeWebhookSecret, stripeSecretKey] },
  stripeWebhookApp,
);

async function setUserPlanPro(userId) {
  if (!userId) return;
  try {
    await db
      .collection("users")
      .doc(userId)
      .set({ plan: "pro" }, { merge: true });
  } catch (e) {
  }
}

function handlePaymentSnapshot(snap, userId) {
  if (snap && snap.data().status === "succeeded") setUserPlanPro(userId);
}

exports.onStripePaymentCreated = onDocumentCreated(
  "customers/{userId}/payments/{paymentId}",
  async (event) => {
    handlePaymentSnapshot(event.data, event.params.userId);
  },
);

exports.onStripePaymentUpdated = onDocumentUpdated(
  "customers/{userId}/payments/{paymentId}",
  async (event) => {
    handlePaymentSnapshot(event.data?.after, event.params.userId);
  },
);

exports.onStripeSubscriptionActive = onDocumentUpdated(
  "customers/{userId}/subscriptions/{subId}",
  async (event) => {
    const snap = event.data?.after;
    if (!snap || snap.data().status !== "active") return;
    await setUserPlanPro(event.params.userId);
  },
);

exports.verifyAndSetProFromStripe = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Zaloguj się.");
    const uid = request.auth.uid;
    const stripe = new Stripe(stripeSecretKey.value(), {
      apiVersion: "2024-11-20.acacia",
    });

    try {
      const sessions = await stripe.checkout.sessions.list({ limit: 100 });
      const forUser = sessions.data.filter(
        (s) =>
          (s.client_reference_id === uid || s.metadata?.firebaseUid === uid) &&
          (s.status === "complete" || s.payment_status === "paid"),
      );
      if (forUser.length > 0) {
        await setUserPlanPro(uid);
        return { ok: true, planSet: true };
      }
      return { ok: true, planSet: false };
    } catch (e) {
      throw new HttpsError(
        "internal",
        e.message || "Błąd weryfikacji płatności.",
      );
    }
  },
);

exports.syncProPlanAfterPayment = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Musisz być zalogowany.");
  }
  const uid = request.auth.uid;

  try {
    const customerRef = db.collection("customers").doc(uid);

    const paymentsSnap = await customerRef
      .collection("payments")
      .where("status", "==", "succeeded")
      .limit(1)
      .get();
    if (!paymentsSnap.empty) {
      await setUserPlanPro(uid);
      return { ok: true, planSet: true, reason: "payment" };
    }

    const subsSnap = await customerRef
      .collection("subscriptions")
      .where("status", "==", "active")
      .limit(1)
      .get();
    if (!subsSnap.empty) {
      await setUserPlanPro(uid);
      return { ok: true, planSet: true, reason: "subscription" };
    }

    let sessionsSnap;
    try {
      sessionsSnap = await customerRef
        .collection("checkout_sessions")
        .limit(10)
        .get();
    } catch (_) {
      sessionsSnap = { docs: [] };
    }
    for (const d of sessionsSnap.docs) {
      const data = d.data();
      if (
        data.status === "complete" ||
        data.status === "completed" ||
        data.payment_status === "paid"
      ) {
        await setUserPlanPro(uid);
        return { ok: true, planSet: true, reason: "session" };
      }
    }

    return { ok: true, planSet: false };
  } catch (e) {
    throw new HttpsError(
      "internal",
      e.message || "Błąd sprawdzania płatności.",
    );
  }
});


exports.setCurrentUserPro = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Zaloguj się.");
  const uid = request.auth.uid;
  const userRef = db.collection("users").doc(uid);
  const userSnap = await userRef.get();
  const data = userSnap.exists ? userSnap.data() : {};
  if (data.proGrantedAt) {
    return { ok: true, message: "Pro już wcześniej przyznany." };
  }
  await userRef.set(
    {
      plan: "pro",
      proGrantedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  return { ok: true, message: "Plan Pro ustawiony." };
});
