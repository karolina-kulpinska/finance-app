import React from "react";
import * as S from "./contentStyled.js";

const PrivacyContent = () => {
  return (
    <S.ContentWrapper>
      <S.Section>
        <S.SectionTitle>1. INFORMACJE OGÓLNE</S.SectionTitle>
        <S.Paragraph>
          1.1. Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych Użytkowników korzystających z aplikacji Mój Smart Budget (zwanej dalej "Aplikacją"), dostępnej pod adresem smartbudget.pl.
        </S.Paragraph>
        <S.Paragraph>
          1.2. Administratorem danych osobowych jest Karolina Kulpińska, zamieszkała w Goworowicach 63/6, 48-388 Kamiennik (zgodnie z danymi wskazanymi w Regulaminie, Punkcie 7).
        </S.Paragraph>
        <S.Paragraph>
          1.3. Dane przetwarzane są z poszanowaniem przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) oraz polskiej ustawy z dnia 10 maja 2018 r. o ochronie danych osobowych.
        </S.Paragraph>
        <S.Paragraph>
          1.4. Administrator dokłada starań, aby zapewnić bezpieczeństwo danych Użytkowników zgodnie z obowiązującymi standardami technicznymi i prawnymi.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>2. ZAKRES I CEL ZBIERANIA DANYCH</S.SectionTitle>
        <S.Paragraph>
          2.1. Administrator przetwarza następujące kategorie danych osobowych niezbędne do świadczenia usług drogą elektroniczną (rejestracja i utrzymanie konta):
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Adres e-mail (identyfikacja Użytkownika, logowanie do systemu);</S.ListItem>
          <S.ListItem>b) Imię i nazwisko (opcjonalne, wprowadzane dobrowolnie przez Użytkownika);</S.ListItem>
          <S.ListItem>c) Dane finansowe i płatnicze wprowadzane dobrowolnie przez Użytkownika (kwoty, terminy płatności, nazwy wierzycieli, kategorie wydatków);</S.ListItem>
          <S.ListItem>d) Pliki w formie załączników (skany rachunków, faktur, paragonów) przesyłane dobrowolnie przez Użytkownika;</S.ListItem>
          <S.ListItem>e) Dane dotyczące subskrypcji Planu Pro (jeśli Użytkownik korzysta z płatnej wersji);</S.ListItem>
          <S.ListItem>f) Dane dotyczące rodzinnego udostępniania (udział w rodzinie, udostępnione płatności i listy zakupów).</S.ListItem>
        </S.List>
        <S.Paragraph>
          2.2. Administrator przetwarza również dane techniczne w celach statystycznych i zapewnienia bezpieczeństwa IT:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Adres IP;</S.ListItem>
          <S.ListItem>b) Logi systemowe;</S.ListItem>
          <S.ListItem>c) Dane o przeglądarce i urządzeniu;</S.ListItem>
          <S.ListItem>d) Data i godzina logowania.</S.ListItem>
        </S.List>
        <S.Paragraph>
          2.3. W przypadku logowania przez Google, Administrator otrzymuje podstawowe dane profilowe (adres e-mail, imię i nazwisko) zgodnie z zakresem uprawnień udzielonych przez Użytkownika w procesie autoryzacji Google.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>3. PODSTAWA PRAWNA PRZETWARZANIA</S.SectionTitle>
        <S.Paragraph>
          3.1. Przetwarzanie danych osobowych odbywa się na podstawie Art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy o świadczenie usługi drogą elektroniczną, tj. Regulaminu aplikacji Mój Smart Budget).
        </S.Paragraph>
        <S.Paragraph>
          3.2. W zakresie plików przesyłanych dobrowolnie przez Użytkownika (skany faktur, paragonów, rachunków), podstawą prawną jest zgoda wyrażona poprzez aktywne działanie (przesłanie pliku do systemu) – Art. 6 ust. 1 lit. a RODO.
        </S.Paragraph>
        <S.Paragraph>
          3.3. Przetwarzanie danych technicznych (logi, adresy IP) odbywa się na podstawie prawnie uzasadnionego interesu Administratora (Art. 6 ust. 1 lit. f RODO) w celu zapewnienia bezpieczeństwa systemu informatycznego.
        </S.Paragraph>
        <S.Paragraph>
          3.4. W przypadku subskrypcji Planu Pro, przetwarzanie danych płatniczych odbywa się w celu wykonania umowy o świadczenie usługi płatnej (Art. 6 ust. 1 lit. b RODO).
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>4. PRZECHOWYWANIE DANYCH I INFRASTRUKTURA</S.SectionTitle>
        <S.Paragraph>
          4.1. Głównym miejscem przechowywania danych jest infrastruktura chmurowa Google Firebase (serwery na terenie Unii Europejskiej). Administrator korzysta z następujących usług Google Firebase:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Firebase Authentication (uwierzytelnianie użytkowników);</S.ListItem>
          <S.ListItem>b) Cloud Firestore (baza danych dla danych użytkowników, płatności, list zakupów, rodzin);</S.ListItem>
          <S.ListItem>c) Firebase Storage (przechowywanie plików – załączników);</S.ListItem>
          <S.ListItem>d) Firebase Functions (funkcje serwerowe, w tym integracja z Stripe).</S.ListItem>
        </S.List>
        <S.Paragraph>
          4.2. Dokumenty przesyłane przez Użytkownika (faktury, paragony, rachunki) są przechowywane w Firebase Storage. Dostęp do nich jest ograniczony wyłącznie do zalogowanego właściciela Konta poprzez reguły bezpieczeństwa Firebase. W przypadku udostępnienia danych rodzinie, dostęp mają również członkowie rodziny zgodnie z ustawieniami Użytkownika.
        </S.Paragraph>
        <S.Paragraph>
          4.3. <strong>Okres przechowywania danych:</strong> Dane osobowe są przechowywane przez okres posiadania Konta przez Użytkownika. W przypadku usunięcia Konta przez Użytkownika, dane są trwale wymazywane z bazy danych i Storage w ciągu 30 dni od momentu usunięcia.
        </S.Paragraph>
        <S.Paragraph>
          4.4. <strong>Automatyczne usuwanie nieaktywnych kont:</strong> W przypadku braku aktywności na koncie przez okres 6 (sześciu) miesięcy, Administrator ma prawo do automatycznego usunięcia Konta wraz z wszystkimi danymi Użytkownika (w tym plikami przechowywanymi w Storage). Użytkownik zostanie uprzedzony o planowanym usunięciu konta poprzez wiadomość e-mail wysłaną na adres powiązany z kontem, na 30 dni przed planowanym usunięciem.
        </S.Paragraph>
        <S.Paragraph>
          4.5. Z zastrzeżeniem logów technicznych niezbędnych do celów dowodowych (przechowywanych przez okres wymagany przepisami prawa, nie dłużej niż 3 lata), wszystkie dane osobowe są trwale wymazywane po upływie wskazanych powyżej terminów.
        </S.Paragraph>
        <S.Paragraph>
          4.6. W przypadku subskrypcji Planu Pro, dane płatnicze są przetwarzane przez Stripe (Stripe, Inc.) zgodnie z Polityką Prywatności Stripe. Administrator nie przechowuje numerów kart kredytowych ani innych pełnych danych płatniczych.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>5. ODBIORCY DANYCH</S.SectionTitle>
        <S.Paragraph>
          5.1. Odbiorcą danych Użytkowników jest firma Google Ireland Limited (jako dostawca infrastruktury Firebase), z siedzibą w Irlandii, z którą Administrator zawarł umowę powierzenia przetwarzania danych zgodnie z Art. 28 RODO.
        </S.Paragraph>
        <S.Paragraph>
          5.2. W przypadku subskrypcji Planu Pro, odbiorcą danych płatniczych jest Stripe, Inc. (z siedzibą w USA, z certyfikacją Privacy Shield), który przetwarza płatności zgodnie z własną Polityką Prywatności dostępną pod adresem: https://stripe.com/privacy.
        </S.Paragraph>
        <S.Paragraph>
          5.3. Administrator nie przekazuje, nie sprzedaje ani nie użycza zebranych danych osobowych osobom trzecim w celach marketingowych lub innych celach niezwiązanych ze świadczeniem usługi.
        </S.Paragraph>
        <S.Paragraph>
          5.4. W przypadku udostępnienia danych rodzinie (funkcja Family Sharing), dane mogą być widoczne dla członków rodziny zgodnie z ustawieniami Użytkownika. Administrator nie ma bezpośredniego dostępu do treści udostępnionych danych.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>6. BEZPIECZEŃSTWO</S.SectionTitle>
        <S.Paragraph>
          6.1. Administrator stosuje następujące środki techniczne i organizacyjne zapewniające bezpieczeństwo danych:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Szyfrowanie połączeń (protokół SSL/HTTPS) – wszystkie dane przesyłane są w formie zaszyfrowanej;</S.ListItem>
          <S.ListItem>b) Mechanizmy autoryzacji dostępu do bazy danych (reguły bezpieczeństwa Firestore i Storage);</S.ListItem>
          <S.ListItem>c) Izolacja danych użytkowników (każdy użytkownik ma dostęp tylko do swoich danych);</S.ListItem>
          <S.ListItem>d) Regularne aktualizacje zabezpieczeń infrastruktury Firebase;</S.ListItem>
          <S.ListItem>e) Ograniczenie dostępu do danych osobowych wyłącznie do osób upoważnionych.</S.ListItem>
        </S.List>
        <S.Paragraph>
          6.2. Użytkownik jest świadomy, że korzystanie z usług online wiąże się z ryzykiem, a Administrator, mimo stosowania zabezpieczeń zgodnych z obowiązującymi standardami, nie gwarantuje absolutnej odporności systemu na ataki osób trzecich, awarie techniczne lub działania siły wyższej.
        </S.Paragraph>
        <S.Paragraph>
          6.3. Administrator zaleca Użytkownikom nieprzechowywanie dokumentów o najwyższym stopniu poufności w systemie oraz regularne tworzenie kopii zapasowych swoich danych.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>7. PRAWA UŻYTKOWNIKA</S.SectionTitle>
        <S.Paragraph>
          7.1. Zgodnie z RODO, każdemu Użytkownikowi przysługuje prawo do:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Dostępu do swoich danych oraz otrzymania ich kopii (Art. 15 RODO);</S.ListItem>
          <S.ListItem>b) Sprostowania (poprawiania) swoich danych (Art. 16 RODO);</S.ListItem>
          <S.ListItem>c) Usunięcia danych ("prawo do bycia zapomnianym") – Art. 17 RODO;</S.ListItem>
          <S.ListItem>d) Ograniczenia przetwarzania (Art. 18 RODO);</S.ListItem>
          <S.ListItem>e) Przenoszenia danych (Art. 20 RODO);</S.ListItem>
          <S.ListItem>f) Wniesienia sprzeciwu wobec przetwarzania (Art. 21 RODO);</S.ListItem>
          <S.ListItem>g) Cofnięcia zgody na przetwarzanie danych (jeśli przetwarzanie odbywa się na podstawie zgody);</S.ListItem>
          <S.ListItem>h) Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO) – Art. 77 RODO.</S.ListItem>
        </S.List>
        <S.Paragraph>
          7.2. Użytkownik może realizować swoje prawa poprzez:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Funkcje dostępne w panelu Użytkownika (edycja danych, eksport danych, usunięcie konta);</S.ListItem>
          <S.ListItem>b) Kontakt z Administratorem na adres e-mail: biuroobslugi.kontakt@gmail.com.</S.ListItem>
        </S.List>
        <S.Paragraph>
          7.3. Administrator rozpatruje wnioski dotyczące realizacji praw Użytkownika w terminie 30 dni roboczych od otrzymania wniosku.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>8. PLIKI COOKIES I NARZĘDZIA ANALITYCZNE</S.SectionTitle>
        <S.Paragraph>
          8.1. Aplikacja wykorzystuje pliki cookies (ciasteczka) niezbędne do prawidłowego działania systemu (zapamiętanie sesji użytkownika, preferencji).
        </S.Paragraph>
        <S.Paragraph>
          8.2. Aplikacja może wykorzystywać narzędzia analityczne Google Analytics (jeśli włączone) w celu analizy korzystania z Aplikacji. Dane są zbierane w sposób anonimowy.
        </S.Paragraph>
        <S.Paragraph>
          8.3. Użytkownik może zarządzać plikami cookies poprzez ustawienia przeglądarki internetowej.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>9. UDOSTĘPNIANIE DANYCH RODZINIE</S.SectionTitle>
        <S.Paragraph>
          9.1. Aplikacja umożliwia Użytkownikom tworzenie rodzin i udostępnianie danych finansowych członkom rodziny (funkcja Family Sharing).
        </S.Paragraph>
        <S.Paragraph>
          9.2. W przypadku udostępnienia danych rodzinie, członkowie rodziny mają dostęp do:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) Płatności oznaczonych jako "udostępnione rodzinie";</S.ListItem>
          <S.ListItem>b) List zakupów oznaczonych jako "udostępnione rodzinie";</S.ListItem>
          <S.ListItem>c) Załączników do udostępnionych płatności.</S.ListItem>
        </S.List>
        <S.Paragraph>
          9.3. Użytkownik ma pełną kontrolę nad tym, które dane udostępnia rodzinie. Administrator nie ma bezpośredniego dostępu do treści udostępnionych danych.
        </S.Paragraph>
        <S.Paragraph>
          9.4. W przypadku opuszczenia rodziny lub usunięcia konta, dostęp do udostępnionych danych jest automatycznie cofany.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>10. POSTANOWIENIA KOŃCOWE</S.SectionTitle>
        <S.Paragraph>
          10.1. Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności w przypadku zmiany przepisów prawa lub zmian w funkcjonalnościach Aplikacji.
        </S.Paragraph>
        <S.Paragraph>
          10.2. O zmianach w Polityce Prywatności Użytkownicy zostaną poinformowani poprzez wyświetlenie komunikatu w Aplikacji lub wysłanie wiadomości e-mail.
        </S.Paragraph>
        <S.Paragraph>
          10.3. W sprawach nieuregulowanych w niniejszej Polityce Prywatności mają zastosowanie przepisy RODO oraz polskiej ustawy o ochronie danych osobowych.
        </S.Paragraph>
        <S.Paragraph>
          10.4. Polityka Prywatności wchodzi w życie z dniem publikacji w Aplikacji.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>11. KONTAKT</S.SectionTitle>
        <S.Paragraph>
          11.1. Wszelkie zapytania dotyczące ochrony prywatności, realizacji praw Użytkownika lub przetwarzania danych osobowych należy kierować na adres e-mail:biuroobslugi.kontakt@gmail.com          .
        </S.Paragraph>
        <S.Paragraph>
          11.2. Administrator odpowiada na zapytania w terminie 30 dni roboczych od otrzymania wiadomości.
        </S.Paragraph>
      </S.Section>
    </S.ContentWrapper>
  );
};

export default PrivacyContent;
