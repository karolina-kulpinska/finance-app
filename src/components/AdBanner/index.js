import React from "react";
import { useSelector } from "react-redux";
import { selectIsPro } from "../../features/subscription/subscriptionSlice";
import * as S from "./styled";

const AVALON_URL = "https://www.fundacjaavalon.pl/nasi_beneficjenci/lara_kulpinska_21138/";
const ULOTKA_IMG_URL = `${process.env.PUBLIC_URL || ""}/lara_kulpinska_21138_card.png`;

const AdBanner = () => {
  const isPro = useSelector(selectIsPro);

  const bannerContent = (
    <S.AvalonContentWrap>
      <S.AvalonMainTitle $small={isPro}>Kliknij i przekaż 1,5% podatku lub darowiznę!</S.AvalonMainTitle>
      <S.UlotkaWrap $small={isPro}>
        <S.UlotkaImg
          $small={isPro}
          src={ULOTKA_IMG_URL}
          alt="Ulotka – Wesprzyj Larę, przekaż 1,5% podatku lub darowiznę"
        />
      </S.UlotkaWrap>
      <S.AvalonText>
        <S.AvalonHook $small={isPro}>System o niej zapomniał. Ty nie musisz. ❤️</S.AvalonHook>
        <S.AvalonBody>
          <S.AvalonParagraph $small={isPro}>
            W Twoim zeznaniu PIT ukryta jest moc. Jeśli nie wskażesz celu, Twoje pieniądze
            rozpłyną się w budżetowej machinie, na którą nie masz wpływu. Często trafiają tam,
            gdzie wcale nie chcesz ich widzieć.
          </S.AvalonParagraph>
          <S.AvalonParagraph $small={isPro}>
            Możesz jednak sprawić, by ten jeden raz Twój podatek uratował czyjeś jutro.
          </S.AvalonParagraph>
          <S.AvalonParagraph $small={isPro}>
            Tam, gdzie NFZ stawia mur, Ty budujesz most. Twoje 1,5% to dla Lary realne godziny
            rehabilitacji i szansa na życie bez bólu. To nic Cię nie kosztuje – a dla niej zmienia
            wszystko.
          </S.AvalonParagraph>
          <S.AvalonClosing $small={isPro}>Zmień podatek na uśmiech. Dziękujemy!</S.AvalonClosing>
        </S.AvalonBody>
      </S.AvalonText>
    </S.AvalonContentWrap>
  );

  return isPro ? (
    <S.AvalonCardPro href={AVALON_URL} target="_blank" rel="noopener noreferrer">
      {bannerContent}
    </S.AvalonCardPro>
  ) : (
    <S.AvalonCard href={AVALON_URL} target="_blank" rel="noopener noreferrer">
      {bannerContent}
    </S.AvalonCard>
  );
};

export default AdBanner;
