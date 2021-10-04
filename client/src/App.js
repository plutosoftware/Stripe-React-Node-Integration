import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Form from "./Form";

const stripeTestPromise = loadStripe(
    "pk_test_51JgnLJSJ229F330WKbpzyiV5X3WnU0hlFxV1FdA7j7jjB5fesOAqrwDu9iNd688ePNxnrFzguXBXCOlKK5Dzi4xZ00xHggH640"
);

const App = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <Form />
        </Elements>
    );
};

export default App;
