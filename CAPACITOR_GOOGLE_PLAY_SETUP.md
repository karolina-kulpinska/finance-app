# 🚀 Integracja Capacitor + Google Play Billing

## Faza 1: Instalacja Capacitor

```powershell
# W głównym folderze projektu (obok package.json)
npm install @capacitor/core @capacitor/cli
npx cap init
```

**Pytania podczas `cap init`:**
- App name: `SmartBudget`
- App Package ID: `pl.smartbudget.app`
- Web dir: `build`

```powershell
# Dodaj Capacitor dla Android
npm install @capacitor/android
npx cap add android
```

---

## Faza 2: Instalacja wtyczki Google Play Billing

```powershell
npm install @react-native-google-play-billing/react-native-google-play-billing
npx cap sync android
```

---

## Faza 3: Konfiguracja Android (Gradle)

W pliku `android/app/build.gradle` dodaj:

```gradle
dependencies {
    implementation 'com.android.billingclient:billing:5.2.0'
}
```

---

## Faza 4: Build

```powershell
# Build React
npm run build

# Synchronizuj z Androidem
npx cap sync

# Otwórz Android Studio
npx cap open android
```

Wtedy:
1. W Android Studio → Build → Build Bundle(s) / APK(s)
2. Generujesz APK lub Bundle
3. Wysyłasz do Google Play Console

---

## 📍 Co w kodzie się zmienia?

- ✅ `src/api/googlePlayBilling.js` — nowa integracja
- ✅ `src/api/paymentAdapter.js` — adapter do obu systemów
- ✅ `src/features/subscription/subscriptionSaga.js` — logika subskrypcji
- ✅ `.env` — dodaj flagi do wyboru systemu płatności

---

## ⚠️ Ważne: Google Play Console

1. Zaloguj się do https://play.google.com/console
2. Wybierz aplikację
3. Zarabiaj → Produkty w aplikacji
4. Utwórz subskrypcję "Pro Plan" z ID: `pro_plan_monthly`
5. Ustaw cenę (np. 9.99 PLN/miesiąc)

To ID (`pro_plan_monthly`) używasz w kodzie!

