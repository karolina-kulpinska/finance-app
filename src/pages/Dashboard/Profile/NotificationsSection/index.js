import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationPreferences,
  saveNotificationPreferencesRequest,
  checkPaymentRemindersRequest,
} from "../../../../features/notifications/notificationsSlice";
import { showNotification } from "../../../../features/notification/notificationSlice";
import * as S from "./styled";

export const NotificationsSection = ({ isDemo = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const preferences = useSelector(selectNotificationPreferences);

  const [enabled, setEnabled] = useState(preferences.enabled);
  const [daysBefore, setDaysBefore] = useState(String(preferences.daysBefore));
  const [onDueDate, setOnDueDate] = useState(preferences.notifyOnDueDate);
  const [familyPayment, setFamilyPayment] = useState(preferences.notifyFamilyPaymentAdded);
  const [familyList, setFamilyList] = useState(preferences.notifyFamilyListAdded);

  useEffect(() => {
    setEnabled(preferences.enabled);
    setDaysBefore(String(preferences.daysBefore));
    setOnDueDate(preferences.notifyOnDueDate);
    setFamilyPayment(preferences.notifyFamilyPaymentAdded);
    setFamilyList(preferences.notifyFamilyListAdded);
  }, [preferences]);

  const handleEnable = async () => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "granted") {
      setEnabled(true);
      return;
    }
    const result = await Notification.requestPermission();
    if (result === "granted") {
      setEnabled(true);
      dispatch(showNotification({ message: "✅ " + t("notifications.enableDesc"), type: "success" }));
    } else {
      dispatch(showNotification({ message: "⚠️ " + t("notifications.permissionNeeded"), type: "warning" }));
    }
  };

  const handleSave = () => {
    if (isDemo) return;
    const payload = {
      enabled,
      daysBeforePayment: Math.max(0, Math.min(30, parseInt(daysBefore, 10) || 0)),
      notifyOnDueDate: onDueDate,
      notifyFamilyPaymentAdded: familyPayment,
      notifyFamilyListAdded: familyList,
    };
    dispatch(saveNotificationPreferencesRequest(payload));
    dispatch(showNotification({ message: "✅ " + t("notifications.settingsSaved"), type: "success" }));
    dispatch(checkPaymentRemindersRequest());
  };

  return (
    <S.Container>
      <S.Section>
        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            checked={enabled}
            onChange={(e) => {
              if (e.target.checked) handleEnable();
              else setEnabled(false);
            }}
            disabled={isDemo}
          />
          <span>{t("notifications.enable")}</span>
        </S.CheckboxLabel>
        <S.Hint>{t("notifications.enableDesc")}</S.Hint>
      </S.Section>

      <S.Section>
        <S.Label>{t("notifications.daysBefore")}</S.Label>
        <S.NumberInput
          type="number"
          min="0"
          max="30"
          value={daysBefore}
          onChange={(e) => setDaysBefore(e.target.value)}
          disabled={isDemo}
        />
        <S.Hint>{t("notifications.daysBeforeDesc")}</S.Hint>
      </S.Section>

      <S.Section>
        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            checked={onDueDate}
            onChange={(e) => setOnDueDate(e.target.checked)}
            disabled={isDemo}
          />
          <span>{t("notifications.onDueDate")}</span>
        </S.CheckboxLabel>
      </S.Section>

      <S.Section>
        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            checked={familyPayment}
            onChange={(e) => setFamilyPayment(e.target.checked)}
            disabled={isDemo}
          />
          <span>{t("notifications.familyPayment")}</span>
        </S.CheckboxLabel>
      </S.Section>

      <S.Section>
        <S.CheckboxLabel>
          <S.Checkbox
            type="checkbox"
            checked={familyList}
            onChange={(e) => setFamilyList(e.target.checked)}
            disabled={isDemo}
          />
          <span>{t("notifications.familyList")}</span>
        </S.CheckboxLabel>
      </S.Section>

      {!isDemo && (
        <S.SaveButton type="button" onClick={handleSave}>
          {t("notifications.save")}
        </S.SaveButton>
      )}
    </S.Container>
  );
};
