import React from "react";
import axios from "axios";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";

const Form = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token;
        await axios
            .post("http://localhost:8010/api/payment", { amount: 100000 })
            .then((response) => {
                token = response.data.message;
            });

        const cardElement = elements.getElement(
            CardNumberElement,
            CardExpiryElement,
            CardCvcElement
        );

        const confirm = await stripe.confirmCardPayment(token, {
            payment_method: { card: cardElement },
        });

        const { paymentIntent } = confirm;

        console.log(paymentIntent);

        await axios
            .post("http://localhost:8010/api/pay", {
                type: paymentIntent,
            })
            .then((response) => {
                window.alert("Payment Successfull.");
            })
            .catch((err) => {
                window.alert("Payment Unsuccessfull.");
            });
    };

    return (
        <section id="payment_form_container">
            <form id="payment_form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Your Name" />
                <CardNumberElement showIcon="true" />
                <CardExpiryElement />
                <CardCvcElement />
                <button>Pay Now</button>
            </form>
        </section>
    );
};

export default Form;
