import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51K8rI6HhTU398IhbqF3VJCQyT0gns3nkHlg9OmyjTSeNpm6yeg6GthewOaVDuwCc4IB3jJ4BAATv72nAOpMSmcNi00PiW7n5Dh"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}