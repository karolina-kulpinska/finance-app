import { SiRevolut } from "react-icons/si";
import { FaMoneyBillWave, FaCreditCard, FaUniversity } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";

export const getBankConfig = (bank) => {
  const configs = {
    revolut: {
      icon: SiRevolut,
      color: "#000000",
      label: "Revolut",
    },
    mbank: {
      icon: BsBank2,
      color: "#CC0000",
      label: "mBank",
    },
    ing: {
      icon: BsBank2,
      color: "#FF6200",
      label: "ING",
    },
    pko: {
      icon: BsBank2,
      color: "#0033A0",
      label: "PKO BP",
    },
    millennium: {
      icon: BsBank2,
      color: "#000000",
      label: "Millennium",
    },
    santander: {
      icon: BsBank2,
      color: "#EC0000",
      label: "Santander",
    },
    alior: {
      icon: BsBank2,
      color: "#00A651",
      label: "Alior Bank",
    },
    pekao: {
      icon: BsBank2,
      color: "#003DA5",
      label: "Pekao SA",
    },
    bnpparibas: {
      icon: BsBank2,
      color: "#00915A",
      label: "BNP Paribas",
    },
    credit: {
      icon: BsBank2,
      color: "#00A3E0",
      label: "Credit Agricole",
    },
    nest: {
      icon: BsBank2,
      color: "#6C1D5F",
      label: "Nest Bank",
    },
    getin: {
      icon: BsBank2,
      color: "#E30613",
      label: "Getin Bank",
    },
    blik: {
      icon: FaCreditCard,
      color: "#FF0066",
      label: "BLIK",
    },
    cash: {
      icon: FaMoneyBillWave,
      color: "#43e97b",
      label: "Gotówka",
    },
    other: {
      icon: FaUniversity,
      color: "#667eea",
      label: "Inne",
    },
  };

  return configs[bank] || configs.other;
};

export const bankOptions = [
  { value: "revolut", label: "Revolut" },
  { value: "mbank", label: "mBank" },
  { value: "ing", label: "ING" },
  { value: "pko", label: "PKO BP" },
  { value: "millennium", label: "Millennium" },
  { value: "santander", label: "Santander" },
  { value: "alior", label: "Alior Bank" },
  { value: "pekao", label: "Pekao SA" },
  { value: "bnpparibas", label: "BNP Paribas" },
  { value: "credit", label: "Credit Agricole" },
  { value: "nest", label: "Nest Bank" },
  { value: "getin", label: "Getin Bank" },
  { value: "blik", label: "BLIK" },
  { value: "cash", label: "Gotówka" },
  { value: "other", label: "Inne" },
];
