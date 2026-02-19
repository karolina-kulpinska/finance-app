export const toLogin = () => "/logowanie";
export const toDashboard = () => "/panel-glowny";
export const toAddPayment = () => "/dodaj-platnosc";
export const toLanding = () => "/";
export const toRegistration = () => "/rejestracja";
export const toInvite = (token) => token ? `/zaproszenie/${token}` : "/zaproszenie/:token";
export const toRegulamin = () => "/regulamin";
export const toPrivacy = () => "/polityka-prywatnosci";
export const toDemo = () => "/demo";
