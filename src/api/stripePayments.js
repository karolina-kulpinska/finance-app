import app from "./firebase";
import { getStripePayments } from "@invertase/firestore-stripe-payments";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export default payments;
