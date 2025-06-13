import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useRef, useEffect } from 'react';

export default function CheckoutForm({ totalPrice, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const orderSent = useRef(false);

  // Ödeme başarılı olduktan sonra flag sıfırlanıyor
  useEffect(() => {
    if (!success) {
      orderSent.current = false;
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      alert("Stripe yüklü değil. Lütfen tekrar deneyin.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Sunucu hatası: ${errorText}`);
      }

      const { clientSecret } = await res.json();
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        alert("Ödeme başarısız: " + error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        if (onSuccess && !orderSent.current) {
          orderSent.current = true;
          onSuccess();
          // onSuccess sonrası genelde sayfa değişir, loading'i burada false yapmaya gerek yok
        }
      } else {
        alert("Ödeme tamamlanamadı. Lütfen tekrar deneyin.");
        setLoading(false);
      }
    } catch (err) {
      alert("PaymentIntent oluşturulamadı: " + err.message);
      setLoading(false);
    }
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
