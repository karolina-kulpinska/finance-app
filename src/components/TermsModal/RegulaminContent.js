import React from "react";
import * as S from "./contentStyled.js";

const RegulaminContent = () => {
  return (
    <S.ContentWrapper>
      <S.Section>
        <S.SectionTitle>1. POSTANOWIENIA OGÓLNE</S.SectionTitle>
        <S.Paragraph>
          1.1. Niniejszy regulamin (zwany dalej „Regulaminem") określa szczegółowe zasady, warunki oraz zakres korzystania z aplikacji internetowej Smart Budget (zwanej dalej „Aplikacją"), dostępnej pod adresem smartbudget.pl oraz jej subdomenami.
        </S.Paragraph>
        <S.Paragraph>
          1.2. Właścicielem oraz Administratorem Aplikacji jest osoba fizyczna, której pełne dane identyfikacyjne wskazano w Punkcie 7 niniejszego Regulaminu (sekcja „Dane Kontaktowe i Identyfikacyjne").
        </S.Paragraph>
        <S.Paragraph>
          1.3. Rozpoczęcie korzystania z Aplikacji, w tym proces rejestracji Konta, jest równoznaczne z pełną akceptacją niniejszego Regulaminu bez zastrzeżeń.
        </S.Paragraph>
        <S.Paragraph>
          1.4. Aplikacja ma charakter wyłącznie informacyjno-pomocniczy i stanowi narzędzie do osobistej organizacji budżetu. Nie jest to usługa płatnicza, bankowa, ani doradztwo finansowe w rozumieniu właściwych przepisów prawa.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>2. DEFINICJE POJĘĆ</S.SectionTitle>
        <S.Paragraph>
          2.1. <strong>Użytkownik</strong> – każda osoba fizyczna posiadająca pełną zdolność do czynności prawnych, korzystająca z Aplikacji.
        </S.Paragraph>
        <S.Paragraph>
          2.2. <strong>Konto</strong> – zbiór zasobów i uprawnień w systemie teleinformatycznym Administratora, zabezpieczony hasłem, pozwalający na korzystanie z funkcjonalności Aplikacji.
        </S.Paragraph>
        <S.Paragraph>
          2.3. <strong>Dane Użytkownika</strong> – wszelkie informacje, kwoty, terminy, nazwy wierzycieli oraz pliki (paragony, faktury) wprowadzane przez Użytkownika do systemów Aplikacji.
        </S.Paragraph>
        <S.Paragraph>
          2.4. <strong>Siła Wyższa</strong> – zdarzenie o charakterze zewnętrznym, niemożliwe do przewidzenia i zapobieżenia, w tym m.in. awarie globalne sieci Internet, pożary, powodzie, pandemie, akty terroru lub awarie serwerów dostawców trzecich (np. Google Firebase).
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>3. WARUNKI TECHNICZNE KORZYSTANIA Z APLIKACJI</S.SectionTitle>
        <S.Paragraph>
          3.1. Do poprawnego działania Aplikacji wymagane jest:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) połączenie z siecią Internet o przepustowości min. 2 Mb/s;</S.ListItem>
          <S.ListItem>b) przeglądarka internetowa (Chrome v.90+, Firefox v.88+, Safari v.14+) z włączoną obsługą JavaScript oraz plików Cookies;</S.ListItem>
          <S.ListItem>c) urządzenie z systemem operacyjnym niepoddanym modyfikacjom typu „root" lub „jailbreak".</S.ListItem>
        </S.List>
        <S.Paragraph>
          3.2. Administrator nie gwarantuje responsywności i poprawnego wyświetlania interfejsu na urządzeniach o niestandardowych rozdzielczościach ekranu.
        </S.Paragraph>
        <S.Paragraph>
          3.3. Koszty połączenia z siecią Internet ponosi w całości Użytkownik zgodnie z taryfą swojego operatora.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>4. ZASADY KORZYSTANIA I REJESTRACJA</S.SectionTitle>
        <S.Paragraph>
          4.1. Rejestracja wymaga podania aktywnego adresu e-mail. Użytkownik odpowiada za bezpieczeństwo swojego hasła.
        </S.Paragraph>
        <S.Paragraph>
          4.2. Zabrania się wykorzystywania Aplikacji do celów komercyjnych, działań niezgodnych z prawem, przesyłania treści o charakterze bezprawnym lub prób naruszania integralności systemu.
        </S.Paragraph>
        <S.Paragraph>
          4.3. Administrator zastrzega sobie prawo do przerw technicznych w celu konserwacji systemu bez uprzedniego powiadomienia Użytkowników.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>5. OGRANICZENIE GWARANCJI I WYŁĄCZENIE ODPOWIEDZIALNOŚCI (WAŻNE)</S.SectionTitle>
        <S.Paragraph>
          5.1. <strong>APLIKACJA JEST UDOSTĘPNIANA W FORMIE „TAKIEJ, JAKA JEST" (AS IS). ADMINISTRATOR NIE UDZIELA ŻADNYCH GWARANCJI, WYRAŹNYCH ANI DOROZUMIANYCH, CO DO PRZYDATNOŚCI APLIKACJI DO OKREŚLONYCH CELÓW.</strong>
        </S.Paragraph>
        <S.Paragraph>
          5.2. <strong>BRAK GWARANCJI POWIADOMIEŃ:</strong> Funkcja przypomnień o terminach płatności ma charakter wyłącznie pomocniczy. Administrator nie gwarantuje skutecznego dostarczenia powiadomień (Push, E-mail), co może wynikać z błędów sieciowych, ustawień systemowych telefonu Użytkownika lub awarii usług trzecich.
        </S.Paragraph>
        <S.Paragraph>
          5.3. <strong>WYŁĄCZENIE ODPOWIEDZIALNOŚCI FINANSOWEJ:</strong> ADMINISTRATOR NIE PONOSI ODPOWIEDZIALNOŚCI ZA:
        </S.Paragraph>
        <S.List>
          <S.ListItem>a) jakiekolwiek niezapłacone rachunki, opóźnienia w płatnościach lub odcięcie mediów u Użytkownika;</S.ListItem>
          <S.ListItem>b) naliczone odsetki karnie, koszty windykacji lub wpisanie Użytkownika do rejestrów dłużników;</S.ListItem>
          <S.ListItem>c) decyzje inwestycyjne lub finansowe podjęte na podstawie danych w Aplikacji;</S.ListItem>
          <S.ListItem>d) błędy w obliczeniach statystycznych lub sumowaniu wydatków wyświetlanych przez system.</S.ListItem>
        </S.List>
        <S.Paragraph>
          5.4. <strong>BŁĘDY UŻYTKOWNIKA:</strong> Administrator nie odpowiada za skutki błędnego wprowadzenia danych, literówek w kwotach lub pominięcia istotnych informacji przez Użytkownika.
        </S.Paragraph>
        <S.Warning>
          <strong>UWAGA:</strong> Zgodnie z art. 385¹ Kodeksu cywilnego, nie można wyłączyć odpowiedzialności za umyślne szkody lub szkody wynikające z rażącego niedbalstwa. Powyższe wyłączenia nie dotyczą takich przypadków.
        </S.Warning>
      </S.Section>

      <S.Section>
        <S.SectionTitle>6. BEZPIECZEŃSTWO DANYCH I INFRASTRUKTURA</S.SectionTitle>
        <S.Paragraph>
          6.1. Dane są przechowywane w infrastrukturze Google Firebase. Administrator stosuje standardowe zabezpieczenia, jednak Użytkownik akceptuje, że żaden system online nie jest w 100% odporny na ataki hakerskie lub wycieki danych.
        </S.Paragraph>
        <S.Paragraph>
          6.2. Użytkownik wprowadza dokumenty (skany faktur, paragony) na własne ryzyko. Administrator zaleca nieprzechowywanie dokumentów o najwyższym stopniu poufności.
        </S.Paragraph>
        <S.Paragraph>
          6.3. W przypadku wystąpienia błędu technicznego po stronie dostawcy infrastruktury (Google), odpowiedzialność Administratora jest całkowicie wyłączona.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>7. DANE KONTAKTOWE I IDENTYFIKACYJNE</S.SectionTitle>
        <S.Paragraph>
          Zgodnie z wymogami ustawowymi dotyczącymi transparentności usług świadczonych drogą elektroniczną, poniżej znajdują się dane kontaktowe Administratora:
        </S.Paragraph>
        <S.ContactInfo>
          <div>Administrator: Karolina Kulpińska</div>
          <div>Adres zamieszkania: Goworowice 63/6, 48-388 Kamiennik</div>
          <div>Adres e-mail do kontaktu: kulpinska.karolinaa@gmail.com</div>
          <div>Adres do korespondencji: jw.</div>
        </S.ContactInfo>
      </S.Section>

      <S.Section>
        <S.SectionTitle>8. PROCEDURA REKLAMACYJNA</S.SectionTitle>
        <S.Paragraph>
          8.1. Wszelkie reklamacje dotyczące działania Aplikacji należy zgłaszać wyłącznie drogą elektroniczną na adres wskazany w Punkcie 7.
        </S.Paragraph>
        <S.Paragraph>
          8.2. Reklamacja musi zawierać: opis błędu, model urządzenia, wersję przeglądarki oraz zrzut ekranu dokumentujący problem.
        </S.Paragraph>
        <S.Paragraph>
          8.3. Administrator rozpatruje reklamacje w terminie 30 dni roboczych. Brak odpowiedzi w tym terminie nie jest równoznaczny z uznaniem reklamacji.
        </S.Paragraph>
        <S.Paragraph>
          8.4. Postępowanie reklamacyjne nie dotyczy roszczeń finansowych wynikających z niezapłaconych przez Użytkownika rachunków (zgodnie z Punktem 5.3).
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>9. OCHRONA DANYCH OSOBOWYCH (RODO)</S.SectionTitle>
        <S.Paragraph>
          9.1. Administratorem danych jest osoba wskazana w Punkcie 7.
        </S.Paragraph>
        <S.Paragraph>
          9.2. Dane są przetwarzane w celu świadczenia usługi drogą elektroniczną (Art. 6 ust. 1 lit. b RODO).
        </S.Paragraph>
        <S.Paragraph>
          9.3. Użytkownik ma prawo do wglądu, sprostowania oraz usunięcia swoich danych w dowolnym momencie poprzez funkcje dostępne w panelu Użytkownika.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>10. WŁASNOŚĆ INTELEKTUALNA</S.SectionTitle>
        <S.Paragraph>
          10.1. Całość kodu źródłowego, grafiki oraz logotyp Smart Budget stanowią własność intelektualną Administratora.
        </S.Paragraph>
        <S.Paragraph>
          10.2. Zabrania się kopiowania, dekompilacji, inżynierii wstecznej lub wykorzystywania fragmentów kodu Aplikacji bez pisemnej zgody Administratora pod rygorem odpowiedzialności karnej i cywilnej.
        </S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SectionTitle>11. POSTANOWIENIA KOŃCOWE</S.SectionTitle>
        <S.Paragraph>
          11.1. Administrator zastrzega sobie prawo do zmiany Regulaminu w dowolnym czasie. Nowy Regulamin wchodzi w życie z dniem publikacji w Aplikacji.
        </S.Paragraph>
        <S.Paragraph>
          11.2. W sprawach nieuregulowanych mają zastosowanie przepisy Kodeksu Cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.
        </S.Paragraph>
        <S.Paragraph>
          11.3. Wszelkie spory będą rozstrzygane przez sąd właściwy dla miejsca zamieszkania Administratora.
        </S.Paragraph>
      </S.Section>
    </S.ContentWrapper>
  );
};

export default RegulaminContent;
