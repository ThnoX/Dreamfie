import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

const themes = [
  { id: '1', name: 'Uzay ve Astronot' },
  { id: '2', name: 'Transformers' },
  { id: '3', name: 'Prensesler' },
  { id: '4', name: 'Dinozorlar' },
  { id: '5', name: 'Plaj / Tatil' },
  { id: '6', name: 'Fantastik Krallık' },
  { id: '7', name: 'Oyun Evreni' },
  { id: '8', name: 'Süper Kahramanlar Şehri' },
  { id: '9', name: 'Sihirli Okul' },
];

export default function DeliveryStep({ onBack, onNext, selectedProduct, selectedTheme, note }) {
  const [delivery, setDelivery] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const isDigital = delivery === 'dijital';
  const isValid =
    delivery &&
    form.name &&
    form.email &&
    (isDigital || (form.address && form.city && form.postalCode));

  const basePrice = selectedProduct?.price || 0;
  const totalPrice = delivery === 'fiziksel' ? basePrice + 159 : basePrice;

  const handleSubmit = () => {
    onNext({
      delivery,
      form,
      totalPrice,
    });
  };

  return (
    <div className="pt-4 px-6">
      <h1 className="text-4xl font-extrabold text-center leading-snug bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 text-transparent bg-clip-text mb-2">
        Neredeyse Bitti! Teslimat & Ödeme
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Rüya ürünün sana nasıl ulaşsın? Bilgilerini gir ve siparişini tamamla.
      </p>

      {/* Teslimat Seçimi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        {[
          {
            type: 'dijital',
            title: 'Dijital Teslimat',
            desc: 'E-posta ile yüksek çözünürlüklü görsel gönderimi.',
            price: `${basePrice} ₺`,
            icon: '📧',
            sub: 'Genellikle 1-2 iş günü içinde e-postanızda!',
          },
          {
            type: 'fiziksel',
            title: 'Fiziksel Teslimat',
            desc: 'Baskılı ürün + kargo ile kapınıza kadar.',
            price: `${basePrice + 159} ₺`,
            icon: '📦',
            sub: 'Kargo ücreti (159₺) dahilidir. 3-5 iş günü içinde teslim.',
          },
        ].map((opt) => {
          const isSelected = delivery === opt.type;
          const bgClass = isSelected
            ? opt.type === 'dijital'
              ? 'bg-gradient-to-b from-[#3ea2ff] to-[#3c88ff]'
              : 'bg-gradient-to-b from-[#f76ca6] to-[#f75590]'
            : 'bg-[#FFFAFC] hover:bg-white';
          const textColor = isSelected ? 'text-white' : 'text-gray-900';
          const descColor = isSelected ? 'text-white/90' : 'text-gray-600';
          const subColor = isSelected ? 'text-white/70' : 'text-gray-400';
          const priceColor = isSelected
            ? 'text-white'
            : 'bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent';

          return (
            <div
              key={opt.type}
              onClick={() => setDelivery(opt.type)}
              className={`relative cursor-pointer rounded-2xl p-8 text-center transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 shadow-xl ${bgClass}`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md text-lg animate-spin-pop">
                  ✓
                </div>
              )}
              <div className="text-5xl mb-3">{opt.icon}</div>
              <h3 className={`text-xl font-bold ${textColor}`}>{opt.title}</h3>
              <p className={`text-sm ${descColor}`}>{opt.desc}</p>
              <p className={`text-3xl font-extrabold mt-2 ${priceColor}`}>{opt.price}</p>
              <p className={`text-xs mt-1 ${subColor}`}>{opt.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Teslimat Bilgileri */}
      {delivery && (
        <>
          <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-6 mb-10">
            <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2">
              <span className="text-xl">📮</span>
              <span className="bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
                Teslimat Bilgileri
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="Adınız Soyadınız" value={form.name} onChange={handleChange} className="border rounded-lg p-2 w-full text-sm" />
              <input name="email" placeholder="E-posta Adresiniz" value={form.email} onChange={handleChange} className="border rounded-lg p-2 w-full text-sm" />
              {!isDigital && (
                <>
                  <input name="address" placeholder="Adres" value={form.address} onChange={handleChange} className="border rounded-lg p-2 w-full text-sm md:col-span-2" />
                  <input name="city" placeholder="Şehir" value={form.city} onChange={handleChange} className="border rounded-lg p-2 w-full text-sm" />
                  <input name="postalCode" placeholder="Posta Kodu" value={form.postalCode} onChange={handleChange} className="border rounded-lg p-2 w-full text-sm" />
                </>
              )}
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-6 mb-10">
            <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2">
              <span className="text-xl">📦</span>
              <span className="bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
                Sipariş Özeti
              </span>
            </h3>
            <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-2">
              <div className="text-left font-semibold">Ürün:</div>
              <div className="text-right">{selectedProduct?.name || '—'}</div>

              <div className="text-left font-semibold">Tema:</div>
              <div className="text-right">
                {themes.find((t) => t.id === String(selectedTheme))?.name || '—'}
              </div>

              <div className="text-left font-semibold">Teslimat:</div>
              <div className="text-right">{delivery === 'dijital' ? 'Dijital' : 'Fiziksel'}</div>

              {note && (
                <>
                  <div className="text-left font-semibold">Not:</div>
                  <div className="text-right">{note}</div>
                </>
              )}

              <div className="col-span-2 border-t border-pink-300 mt-2 pt-2 flex justify-between font-bold text-pink-600">
                <span>Toplam Tutar:</span>
                <span>{totalPrice} ₺</span>
              </div>
            </div>
          </div>

          {/* Ödeme Alanı */}
          <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-6 mb-10">
            <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2">
              <span className="text-xl">💳</span>
              <span className="bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
                Kart ile Güvenli Ödeme
              </span>
            </h3>
            <CheckoutForm totalPrice={totalPrice} />
          </div>
        </>
      )}

      {/* Butonlar */}
      <div className="flex justify-between max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-white border border-blue-400 text-blue-600 hover:bg-blue-100"
        >
          ← Önceki
        </button>
        
      </div>
    </div>
  );
}
