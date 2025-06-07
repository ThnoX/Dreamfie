import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RXNtNGq6VVebEgHyGCsZm7JjiqidLbgGYWECsFZPoOCODTIRQ708Mqzfi0btmKbSHRovJ6VjDsV4OOKKkkOH2vM009D5aEjsl');

export default function PaymentButton({ product }) {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product }),
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-6 py-3 rounded-full mt-4 hover:bg-green-600"
    >
      Ödeme Yap
    </button>
  );
}
