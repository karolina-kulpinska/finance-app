import React from "react";
import { useTranslation } from "react-i18next";
import { toRegulamin, toPrivacy } from "../../../routes";
import * as S from "./styled";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <S.Footer>
      <S.FooterContent>
        <S.FooterText>© 2024 {t("appName")}. {t("footer.rights")}</S.FooterText>
        <S.FooterLinks>
          <S.FooterLink to={toRegulamin()}>Regulamin</S.FooterLink>
          <S.FooterLink to={toPrivacy()}>Polityka Prywatności</S.FooterLink>
        </S.FooterLinks>
      </S.FooterContent>
    </S.Footer>
  );
};

export default Footer;
