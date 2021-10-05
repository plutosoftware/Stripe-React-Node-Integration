const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/payment", async (req, res) => {
    const { amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "INR",
            payment_method_types: ["card"],
            metadata: {
                name: "Pluto Software",
            },
        });
        res.json({
            message: payment.client_secret,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/pay", async (req, res) => {
    const { type } = req.body;
    if (!type) {
        res.status(400).send({ message: "Payment Unsuccessfull." });
    }
    if (type.status == "succeeded") {
        res.send({ message: "Payment Successfull." });
    }
});

app.listen(8010, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Payment Server is running on port no 8010");
    }
});
