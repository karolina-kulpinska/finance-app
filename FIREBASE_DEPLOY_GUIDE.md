# 🚀 Instrukcja wdrażania reguł Firebase

## Sposób 1: Firebase Console (Rekomendowany dla początkujących)

### Krok 1: Zaloguj się do Firebase Console
1. Wejdź na: https://console.firebase.google.com/
2. Wybierz swój projekt z listy

### Krok 2: Przejdź do Firestore Database
1. W menu po lewej kliknij **"Firestore Database"**
2. Kliknij zakładkę **"Reguły"** (Rules) u góry ekranu

### Krok 3: Wklej nowe reguły
1. Usuń stare reguły z edytora
2. Otwórz plik `firestore.rules` z tego projektu
3. Zaznacz całą zawartość (Ctrl+A)
4. Skopiuj (Ctrl+C)
5. Wklej do edytora w Firebase Console (Ctrl+V)

### Krok 4: Opublikuj
1. Kliknij niebieski przycisk **"Opublikuj"** (Publish)
2. Poczekaj na potwierdzenie (kilka sekund)
3. Gotowe! ✅

---

## Sposób 2: Firebase CLI (Dla zaawansowanych)

### Instalacja Firebase CLI

**Windows:**
```powershell
npm install -g firebase-tools
```

### Inicjalizacja projektu
```bash
# Zaloguj się do Firebase
firebase login

# Inicjalizuj projekt (tylko raz)
firebase init firestore
# Wybierz:
# - Use an existing project
# - Wybierz swój projekt
# - Firestore Rules: firestore.rules
# - Firestore Indexes: firestore.indexes.json
```

### Wdrażanie reguł
```bash
# Wdróż tylko reguły Firestore
firebase deploy --only firestore:rules

# Lub wdróż wszystko
firebase deploy
```

### Podgląd przed wdrożeniem
```bash
firebase deploy --only firestore:rules --dry-run
```

---

## ✅ Weryfikacja po wdrożeniu

1. **Sprawdź w Firebase Console:**
   - Firestore Database → Reguły
   - Powinny być widoczne nowe reguły z obsługą rodzin

2. **Sprawdź w aplikacji:**
   - Odśwież stronę aplikacji
   - Spróbuj utworzyć rodzinę
   - Dodaj płatność z checkboxem "Udostępnij rodzinie"

---

## 🔍 Co się zmieniło w regułach?

### Dodano:
- ✅ Wsparcie dla kolekcji `families/{familyId}`
- ✅ Dostęp do udostępnionych płatności dla członków rodziny
- ✅ Dostęp do udostępnionych list zakupów dla członków rodziny
- ✅ Ochrona danych - tylko właściciel i rodzina widzą udostępnione elementy

### Bezpieczeństwo:
- 🔒 Właściciel może wszystko ze swoimi danymi
- 🔒 Członkowie rodziny mogą tylko **czytać** udostępnione elementy
- 🔒 Nieudostępnione elementy są całkowicie prywatne

---

## ⚠️ Ważne uwagi

1. **Backup:** Firebase automatycznie tworzy backup starych reguł
2. **Przywracanie:** Możesz przywrócić stare reguły w zakładce "Historia"
3. **Testowanie:** Przetestuj reguły przed wdrożeniem produkcyjnym
4. **Storage:** Jeśli używasz Firebase Storage, zaktualizuj też `storage.rules`

---

## 🐛 Rozwiązywanie problemów

### Problem: "Permission denied" po wdrożeniu
**Rozwiązanie:** 
- Odśwież aplikację (Ctrl+Shift+R)
- Wyloguj się i zaloguj ponownie
- Sprawdź czy `familyId` jest poprawnie ustawione w dokumencie użytkownika

### Problem: Reguły się nie zapisują
**Rozwiązanie:**
- Sprawdź składnię w edytorze Firebase
- Upewnij się że masz uprawnienia "Editor" w projekcie
- Spróbuj w innej przeglądarce

### Problem: Firebase CLI nie działa
**Rozwiązanie:**
```powershell
# Odinstaluj starą wersję
npm uninstall -g firebase-tools

# Zainstaluj najnowszą
npm install -g firebase-tools

# Sprawdź wersję
firebase --version
```

---

## 📚 Przydatne linki

- [Firebase Console](https://console.firebase.google.com/)
- [Dokumentacja Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase CLI Dokumentacja](https://firebase.google.com/docs/cli)
