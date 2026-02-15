# Domena Smart Budget (smartbudget.pl)

Konfiguracja domeny w **GitHub Pages**, **DNS** i **Firebase**.

---

## 1. GitHub Pages

1. **Settings** → **Pages** → **Custom domain**: wpisz **smartbudget.pl** i zapisz.
2. W projekcie jest plik **`CNAME`** z wpisem `smartbudget.pl` – po pushu GitHub użyje go automatycznie.

---

## 2. DNS u dostawcy domeny

U swojego dostawcy domeny (np. home.pl, OVH, Cloudflare, domeny.pl) dodaj wpisy DNS.

### Wariant A: Rekordy A (bez www)

Dodaj **4 rekordy A** wskazujące na serwery GitHub Pages:

| Typ | Nazwa (Host) | Wartość (Target) |
|-----|--------------|------------------|
| A   | `@`          | `185.199.108.153` |
| A   | `@`          | `185.199.109.153` |
| A   | `@`          | `185.199.110.153` |
| A   | `@`          | `185.199.111.153` |

*(U niektórych dostawców zamiast `@` wpisuje się pustą wartość lub domenę główną.)*

### Wariant B: Z „www” (subdomena www)

- Dla **domeny głównej** (smartbudget.pl) – rekordy A jak wyżej.
- Dla **www** – jeden rekord **CNAME**: Host **www** → Wartość **karolina-kulpinska.github.io**.

### Czekanie na propagację

Zmiany DNS mogą zająć od kilku minut do ok. 48 godzin. Gdy się rozpropagują, w GitHub → Settings → Pages przy **Custom domain** zobaczysz informację, że domena jest poprawnie skonfigurowana. Możesz wtedy włączyć **Enforce HTTPS**.

---

## 3. Firebase – autoryzowana domena

Żeby logowanie (e-mail, Google, reset hasła) działało na smartbudget.pl:

1. **Firebase Console** → **Authentication** → **Settings** → **Authorized domains** → **Add domain**.
2. Wpisz **smartbudget.pl** (i ewentualnie **www.smartbudget.pl**).
3. Zapisz.

---

## Podsumowanie

| Gdzie              | Co zrobić |
|--------------------|-----------|
| **GitHub**         | Custom domain: **smartbudget.pl**, plik **CNAME** w repo. |
| **DNS**            | 4× rekord A (185.199.108.153 … 185.199.111.153), opcjonalnie CNAME **www**. |
| **Firebase**       | Authorized domains: **smartbudget.pl** (i ewentualnie www). |

---

**E-mail zaproszeń:** Link w mailu jest generowany po stronie przeglądarki (z aktualnego adresu), więc na smartbudget.pl w mailach będzie zawsze **https://smartbudget.pl/#/zaproszenie/...**.

**Reset hasła:** Szablon maila w Firebase (Authentication → Szablony) możesz dostosować do Smart Budget i ustawić np. nadawcę / treść. Domena przekierowania to ustawienie w Firebase (custom action URL), nie w kodzie.
