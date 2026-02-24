# 📱 Google Play Billing - Plan Implementacji

## ✅ Co już zrobione:

1. **Integracja Capacitor** - dodane do projektu
2. **Google Play Billing API** - biblioteka integrowana
3. **Adapter płatności** - dwu-torowy system (Stripe web + Google Play mobilna)
4. **Zmienione komponenty:**
   - ✅ `src/features/subscription/subscriptionSaga.js` - sprawdzanie subskrypcji
   - ✅ `src/pages/Dashboard/Header/index.js` - zakupowanie z headera
   - ✅ `src/pages/Dashboard/Profile/index.js` - zarządzanie subskrypcją
5. **package.json** - dodane dependencje

---

## 🚀 Kroki do uruchomienia:

### Krok 1: Zainstaluj zależności

```powershell
npm install
```

### Krok 2: Inicjalizuj Capacitor

```powershell
npm run cap:init
```

Odpowiedz na pytania:

- App ID: `pl.smartbudget.app`
- App name: `SmartBudget`
- Web directory: `build`

### Krok 3: Dodaj Android

```powershell
npm run cap:add:android
```

### Krok 4: Testowanie na web (bez zmian!)

```powershell
npm start
```

Aplikacja działa tak samo na web (Stripe)!

---

## 📋 To co musisz zrobić ręcznie:

### 1. Google Play Console (KLUCZOWE!)

🔴 **BEZ TEGO APLIKACJA NIE BĘDZIE PRACOWAĆ!**

W https://play.google.com/console:

1. Zaloguj się do projektu
2. Zarabiaj → **Produkty w aplikacji**
3. **Utwórz subskrypcję** z tymi danymi:
   - **Nazwa:** Pro Plan
   - **ID produktu:** `pro_plan_monthly`
   - **Cena:** 9.99 PLN/miesiąc (lub Twoja cena)
   - **Okres:** 1 miesiąc
   - **Okres próbny:** 7 dni (op cjonalnie)

4. Opublikuj (status: Draft → Active)

### 2. Plik build.gradle (Android)

W `android/app/build.gradle` dodaj pod `dependencies`:

```gradle
dependencies {
    // ... inne dependencje
    implementation 'com.android.billingclient:billing:5.2.0'
}
```

### 3. AndroidManifest.xml

W `android/app/src/main/AndroidManifest.xml` dodaj permissję:

```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

---

## 🏗️ Build dla Android

### Opcja A: Automatycznie (rekomenduje)

```powershell
npm run cap:build:android
```

### Opcja B: Krok po kroku

```powershell
# 1. Build React
npm run build

# 2. Synchronized z Androidem
npm run cap:sync

# 3. Otwórz Android Studio
npm run cap:open:android

# 4. W Android Studio:
# - Build → Build Bundle(s) / APK(s)
# - Jeśli Bundle (rekomenduje dla Play Store): Build → Build Bundle(s)
# - Jeśli APK (do testowania): Build → Build APK(s)
```

---

## 🧪 Testowanie przed wysłaniem do Google Play

### Testowanie na urządzeniu fizycznym

1. Podłącz telefon do komputera (USB, debugowanie włączone)
2. W Android Studio:
   ```
   Run → Run 'app' (lub Shift+F10)
   ```
3. Aplikacja uruchomi się na telefonie
4. Przejdź do **Profil → Zarządzaj subskrypcją** i spróbuj kupić

### Testowanie w emulatorze

```powershell
# W Android Studio: AVD Manager → Launch emulator
# Potem Run 'app'
```

---

## ⚠️ Ważne rzeczy do pamiętania

1. **Walidacja rachunków (Server-Side)**
   - Obecnie `purchaseSubscription()` zwraca dane lokalnie
   - **Musisz** dodać validację na serwerze (Firebase Cloud Function)
   - Google Play powinno wysłać webhook o zakupie
   - Dodaj do Cloud Function: webhook handler dla `PURCHASE_STATE_CHANGED`

2. **Testowanie w produkcji**
   - Zanim wrzucisz do Store: testuj na **Tester Track** (Alpha lub Beta)
   - Dodaj testowych użytkowników w Google Play Console

3. **Ceny i waluty**
   - Google Play obsługuje różne waluty
   - Ustaw w Console dla Polski (PLN)

---

## 🔗 Przydatne linki

- https://developer.android.com/google/play/billing
- https://capacitorjs.com/docs/getting-started
- https://play.google.com/console

---

## ❓ Masz pytania?

Sprawdź logi:

```powershell
# Logi z urządzenia
adb logcat | grep SmartBudget

# Lub w Android Studio: Logcat
```

---

**Status:** ✅ Kod gotowy. Czekam na konfigurację Google Play Console i build dla Android.
