import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51L5QunBjjP4I5Q3r4Nf8CeaKS1JvcpSu5gCTmlrqdBwXSsZ31fcUr2tVWGGWaUzQkHsZJO8K87570SZx5la08N4j00bwPkXmTh";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const totalDue = props.totalDue 
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm totalDue={totalDue} />
    </Elements>
  );
}
