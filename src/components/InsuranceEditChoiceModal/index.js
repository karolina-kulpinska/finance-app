import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const SeriesEditChoiceModal = ({
  payment,
  relatedPayments,
  onChoose,
  onClose,
}) => {
  const { t } = useTranslation();
  const total = relatedPayments?.length || 1;
  const [rangeFrom, setRangeFrom] = useState(1);
  const [rangeTo, setRangeTo] = useState(total);

  const handleChoose = (scope) => {
    onChoose(scope);
    onClose();
  };

  const handleRange = () => {
    const from = Math.min(Math.max(1, parseInt(rangeFrom, 10) || 1), total);
    const to = Math.min(Math.max(1, parseInt(rangeTo, 10) || total), total);
    handleChoose({ type: "range", from: Math.min(from, to), to: Math.max(from, to) });
  };

  if (!payment) return null;

  return (
    <S.Overlay onClick={onClose} role="dialog" aria-modal="true">
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Title>{t("form.seriesEditTitle")}</S.Title>
        <S.Options>
          <S.OptionButton onClick={() => handleChoose("single")}>
            {t("form.seriesEditSingle")}
          </S.OptionButton>
          <S.OptionButton onClick={() => handleChoose({ type: "all" })}>
            {t("form.seriesEditAll", { count: total })}
          </S.OptionButton>

          <S.RangeSection>
            <S.SectionLabel>{t("form.seriesEditRange")}</S.SectionLabel>
            <S.NumberRow>
              <S.NumberInput
                type="number"
                min={1}
                max={total}
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
                placeholder={t("form.seriesEditRangeFrom")}
              />
              <S.Separator>-</S.Separator>
              <S.NumberInput
                type="number"
                min={1}
                max={total}
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
                placeholder={t("form.seriesEditRangeTo")}
              />
              <S.OptionButton $small onClick={handleRange}>
                OK
              </S.OptionButton>
            </S.NumberRow>
          </S.RangeSection>
        </S.Options>
        <S.CancelButton onClick={onClose}>{t("common.cancel")}</S.CancelButton>
      </S.Modal>
    </S.Overlay>
  );
};
