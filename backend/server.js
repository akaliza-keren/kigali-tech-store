import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Stripe from "stripe";

/* ---------------- ENV CHECK ---------------- */
console.log("🔑 STRIPE KEY LOADED:", process.env.STRIPE_SECRET_KEY ? "YES" : "NO");

/* ---------------- APP SETUP ---------------- */
const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- STRIPE INIT ---------------- */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("🔥 Backend is running properly");
});

/* ---------------- CREATE PAYMENT INTENT ---------------- */
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("📩 Incoming amount:", amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Stop sending nonsense values.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("💳 PaymentIntent created:", paymentIntent.id);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("❌ Stripe Error:", error.message);

    res.status(500).json({
      error: "Payment failed",
      details: error.message,
    });
  }
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});