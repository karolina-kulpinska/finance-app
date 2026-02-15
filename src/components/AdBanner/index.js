import React from "react";
import { useSelector } from "react-redux";
import { selectIsPro } from "../../features/subscription/subscriptionSlice";
import * as S from "./styled";

const AdBanner = () => {
  const isPro = useSelector(selectIsPro);
  if (isPro) return null;

  return (
    <S.Banner>
      <S.Label>Reklama</S.Label>
      <S.Placeholder>
        Tu możesz dodać reklamę (np. Google AdSense). Plan Pro = bez reklam.
      </S.Placeholder>
    </S.Banner>
  );
};

export default AdBanner;
