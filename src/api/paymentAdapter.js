import { Capacitor } from "@capacitor/core";
import stripePayments from "./stripePayments";
import googlePlayBilling from "./googlePlayBilling";

/**
 * Adapter do obsługi dwu-torowego systemu płatności:
 * - Web (www.smartbudget.pl) → Stripe
 * - Mobilna aplikacja (Google Play) → Google Play Billing
 */

const isNative = Capacitor.isNativePlatform();

class PaymentAdapter {
  /**
   * Inicjalizuj system płatności dla aktualne platformy
   */
  async initialize() {
    if (isNative) {
      return await googlePlayBilling.initialize();
    }
    // Stripe inicjalizuje się automatycznie z Firebase
    return true;
  }

  /**
   * Rozpocznij proces kupienia subskrypcji
   */
  async purchaseSubscription(userId) {
    if (isNative) {
      try {
        const purchase =
          await googlePlayBilling.purchaseProduct("pro_plan_monthly");
        return {
          platform: "google_play",
          purchaseData: purchase,
        };
      } catch (error) {
        throw new Error(`Google Play: ${error.message}`);
      }
    } else {
      try {
        // Stripe: otwórz portal płatności
        const result = await stripePayments.createCheckoutSession({
          uid: userId,
        });
        return {
          platform: "stripe",
          sessionId: result.sessionId,
        };
      } catch (error) {
        throw new Error(`Stripe: ${error.message}`);
      }
    }
  }

  /**
   * Sprawdź, czy użytkownik ma aktywną subskrypcję
   */
  async checkSubscriptionStatus(userId) {
    if (isNative) {
      try {
        const purchases = await googlePlayBilling.getPastPurchases();
        // Weź ostatni zakup (być może aktywny)
        if (purchases.length > 0) {
          const latestPurchase = purchases[purchases.length - 1];
          return {
            isPro: latestPurchase.purchaseState === "PURCHASED",
            platform: "google_play",
            purchaseToken: latestPurchase.purchaseToken,
          };
        }
        return { isPro: false, platform: "google_play" };
      } catch (error) {
        console.error("Błąd sprawdzenia statusu Google Play:", error);
        return { isPro: false, platform: "google_play" };
      }
    } else {
      try {
        // Stripe: sprawdź subskrypcję z Firestore (logika w subscriptionSaga)
        return {
          isPro: false, // Ustawiasz w subscriptionSaga
          platform: "stripe",
        };
      } catch (error) {
        console.error("Błąd sprawdzenia statusu Stripe:", error);
        return { isPro: false, platform: "stripe" };
      }
    }
  }

  /**
   * Odśwież status subskrypcji (dla Google Play — sprawdzaj periodycznie)
   */
  async refreshSubscriptionStatus() {
    if (isNative) {
      return await this.checkSubscriptionStatus();
    }
    // Web: Firestore listener robi to automatycznie
    return null;
  }

  /**
   * Anuluj subskrypcję
   */
  async cancelSubscription() {
    if (isNative) {
      // Google Play: użytkownik anuluje w Google Play Console
      console.log("Anuluj w Google Play Console");
      return true;
    } else {
      // Stripe: logika w komponencie (portal Stripe)
      console.log("Anuluj w portalu Stripe");
      return true;
    }
  }

  /**
   * Zwróć aktualną platformę płatności
   */
  getPlatform() {
    return isNative ? "google_play" : "stripe";
  }

  /**
   * Czy aplikacja jest w wersji natywnej?
   */
  isNativeApp() {
    return isNative;
  }

  /**
   * Wyczyść zasoby
   */
  async cleanup() {
    if (isNative) {
      await googlePlayBilling.disconnect();
    }
  }
}

export const paymentAdapter = new PaymentAdapter();
export default paymentAdapter;
