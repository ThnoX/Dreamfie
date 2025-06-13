import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import PhotoUploadStep from './components/PhotoUploadStep';
import footerLogo from './assets/logo3.png';
import ThemeSelectStep from './components/ThemeSelectStep';
import NoteStep from './components/NoteStep';
import DeliveryStep from './components/DeliveryStep';
import Toast from './components/Toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RXNtNGq6VVebEgHyGCsZm7JjiqidLbgGYWECsFZPoOCODTIRQ708Mqzfi0btmKbSHRovJ6VjDsV4OOKKkkOH2vM009D5aEjsl');

const products = [
  { id: 1, name: 'Çerçeve Baskı', desc: 'Yüksek kaliteli çerçeveli rüya baskısı', price: 649, icon: '🖼️' },
  { id: 2, name: 'Tişört Baskı', desc: 'Premium kalite hayalperest tişört', price: 549, icon: '👕' },
  { id: 3, name: 'Puzzle Baskı', desc: '500 parça özel tasarım puzzle', price: 389, icon: '🧩' },
  { id: 4, name: 'Kupa Baskı', desc: 'Sihirli seramik kupa baskısı', price: 349, icon: '☕' },
  { id: 5, name: 'Poster', desc: 'A3 poster ', price: 249, icon: '🎨' },
  { id: 6, name: 'Boyama Kitabı', desc: 'Hayal gücünü renklendiren çizim kitabı', price: 449, icon: '📘' },
];

function AppContent({
  step,
  setStep,
  selectedId,
  setSelectedId,
  selectedProduct,
  setSelectedProduct,
  selectedTheme,
  setSelectedTheme,
  note,
  setNote,
  toast,
  setToast,
  emailSent,
  setEmailSent,
}) {
  useEffect(() => {
    if (selectedId !== null) {
      const product = products.find(p => p.id === selectedId);
      setSelectedProduct(product);
      setToast(`${product.name} seçildi. Harika bir seçim!`);
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedId, setSelectedProduct, setToast]);

  const handleSubmit = async (orderData) => {
    if (emailSent) {
      console.warn('📭 Sipariş zaten gönderildi, tekrar göndermiyoruz.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4242/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("📩 Sipariş e-posta ile gönderildi:", orderData);
        setEmailSent(true);
        setToast("Sipariş alındı, e-posta gönderildi!");
        setStep(1);
      } else {
        console.error("❌ E-posta gönderilemedi.");
        alert('Sipariş gönderimi başarısız oldu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error("⚠️ Mail gönderimi sırasında hata:", error);
      alert('Sipariş gönderilirken hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
    }
  };

  return (
    <div className="pt-[150px] min-h-screen bg-gradient-to-br from-rose-200 to-rose-100 p-6 relative">
      <Header currentStep={step} />
      {step === 1 && (
        <>
          <h1 className="text-4xl font-extrabold text-center leading-snug bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 text-transparent bg-clip-text mb-4">
            Hangi Ürünü Kişiselleştirmek İstiyorsun?
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Hayallerini gerçeğe dönüştürmek için ilk adımı at, ürününü seç!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {products.map((product) => {
              const isSelected = selectedId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedId(product.id)}
                  className={`relative cursor-pointer rounded-2xl p-6 h-60 flex flex-col justify-between shadow-xl border transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white'
                      : 'bg-[#FFFCFE] hover:bg-white text-gray-800'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-2xl animate-spin-in">
                      ✓
                    </div>
                  )}
                  <div className="text-6xl text-center mb-4 animate-bounce-slow">{product.icon}</div>
                  <h3 className="font-bold text-xl text-center">{product.name}</h3>
                  <p className={`text-sm text-center mt-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                    {product.desc}
                  </p>
                  <p
                    className={`text-[21px] font-bold font-price text-center mt-2 ${
                      isSelected
                        ? 'text-white'
                        : 'bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent'
                    }`}
                  >
                    {product.price} ₺
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              disabled={!selectedId}
              onClick={() => {
                setEmailSent(false); // Her yeni sipariş için flag sıfırlanıyor
                setStep(2);
              }}
              className={`px-8 py-3 rounded-full font-medium transition ${
                selectedId
                  ? 'bg-gradient-to-r from-blue-300 to-pink-300 text-white hover:brightness-110'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Sonraki →
            </button>
          </div>
        </>
      )}

      {step === 2 && <PhotoUploadStep onBack={() => setStep(1)} onNext={() => setStep(3)} />}

      {step === 3 && (
        <ThemeSelectStep
          onBack={() => setStep(2)}
          onNext={(themeId) => {
            setSelectedTheme(themeId);
            setStep(4);
          }}
        />
      )}

      {step === 4 && (
        <NoteStep
          onBack={() => setStep(3)}
          onNext={(userNote) => {
            setNote(userNote);
            setStep(5);
          }}
        />
      )}

      {step === 5 && (
        <DeliveryStep
          onBack={() => setStep(4)}
          onNext={handleSubmit}
          selectedProduct={selectedProduct}
          selectedTheme={selectedTheme}
          note={note}
          emailSent={emailSent}
          setEmailSent={setEmailSent}
        />
      )}

      {toast && <Toast message="Ürün Seçildi!" subtext={toast} onClose={() => setToast(null)} />}

      <footer className="mt-20 text-center text-sm text-gray-500">
        <img src={footerLogo} alt="Dreamfie Logo" className="h-10 mx-auto mb-2" />
        <p>Fotoğraflarınızı yapay zeka ile sanatsal eserlere dönüştürüyoruz.</p>
        <p>
          <a href="mailto:info@dreamfie.com" className="underline">
            info@dreamfie.com
          </a>{' '}
          | Güvenli ödeme altyapısı
        </p>
        <p className="mt-2">© 2025 Dreamfie. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [note, setNote] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  return (
    <Elements stripe={stripePromise}>
      <AppContent
        step={step}
        setStep={setStep}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        note={note}
        setNote={setNote}
        toast={toast}
        setToast={setToast}
        emailSent={emailSent}
        setEmailSent={setEmailSent}
      />
    </Elements>
  );
}

export default App;
