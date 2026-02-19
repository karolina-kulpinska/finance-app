import React from "react";
import { Link } from "react-router-dom";
import { toRegulamin, toPrivacy } from "../../../routes";
import * as S from "./styled";

const Footer = () => {
  return (
    <S.Footer>
      <S.FooterContent>
        <S.FooterText>© 2024 Smart Budget. Wszelkie prawa zastrzeżone.</S.FooterText>
        <S.FooterLinks>
          <S.FooterLink to={toRegulamin()}>Regulamin</S.FooterLink>
          <S.FooterLink to={toPrivacy()}>Polityka Prywatności</S.FooterLink>
        </S.FooterLinks>
      </S.FooterContent>
    </S.Footer>
  );
};

export default Footer;
