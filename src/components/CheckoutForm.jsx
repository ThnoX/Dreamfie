import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      alert("Stripe yüklü değil. Lütfen tekrar deneyin.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log('✅ Ödeme başarılı:', paymentMethod);
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-100 text-green-800 p-4 rounded-md text-center font-semibold">
        ✅ Ödeme başarıyla tamamlandı! Siparişiniz alındı.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md bg-white shadow-sm">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                  color: '#a0aec0',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full px-6 py-3 rounded-full font-semibold text-white transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-sky-400 to-pink-400 hover:brightness-110'
        }`}
      >
        {loading ? 'Ödeniyor...' : `${totalPrice} ₺ Öde ve Siparişi Tamamla!`}
      </button>
    </form>
  );
}
