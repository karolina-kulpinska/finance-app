import { Capacitor } from "@capacitor/core";

/**
 * Google Play Billing Service
 * Gdy aplikacja będzie zapakowan aw Capacitor (Android),
 * wtyczkę Google Play Billing należy dodać ręcznie w android/app/build.gradle
 */

const isNative = Capacitor.isNativePlatform();

class GooglePlayBillingService {
  constructor() {
    this.isInitialized = false;
    this.isAvailable = isNative;
    this.billingClient = null;
  }

  async initialize() {
    if (!this.isAvailable) return false;
    if (this.isInitialized) return true;

    try {
      // W przyszłości: tutaj będzie inicjalizacja Google Play Billing API
      // Tymczasowo: fallback na Stripe (będzie wdrażane w Androidzie)
      console.log("Google Play Billing inicjalizacja (w trakcie wdrażania)");
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.warn("Błąd inicjalizacji Google Play Billing:", error);
      return false;
    }
  }

  async getProducts(skus = ["pro_plan_monthly"]) {
    if (!this.isAvailable) return [];
    console.log("Pobieranie produktów:", skus);
    return [];
  }

  async purchaseProduct(sku) {
    if (!this.isAvailable)
      throw new Error("Google Play Billing niedostępna (web)");

    throw new Error("Google Play Billing będzie dostępny w aplikacji mobilnej");
  }

  async getPastPurchases() {
    if (!this.isAvailable) return [];
    console.log("Pobieranie historii zakupów");
    return [];
  }

  async acknowledgePurchase(purchaseToken) {
    if (!this.isAvailable) return false;
    console.log("Potwierdzenie zakupu:", purchaseToken);
    return false;
  }

  async disconnect() {
    if (!this.isAvailable) return;
    this.isInitialized = false;
  }
}

export const googlePlayBilling = new GooglePlayBillingService();
export default googlePlayBilling;
