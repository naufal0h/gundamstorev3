require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeMiddleware = async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "IDR",
      description: "Organify",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

module.exports = stripeMiddleware;
