import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const totalDue = props.totalDue 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3000/payment", {
          amount: totalDue * 100,
          id: id,
        });
        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-lg font-semibold pb-4">
            Input your Credit / Debit Card Number
          </h1>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="stripe-btn">PAY</button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-bold text-darkColor text-center">
            Payment Success!
          </h2>
        </div>
      )}
    </>
  );
}
