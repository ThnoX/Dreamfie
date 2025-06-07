import { useState } from 'react';
import Toast from './Toast'; // Toast bileşenini unutma!

const themes = [
  { id: 1, name: 'Uzay ve Astronot', desc: 'Galaksiler arası maceralar ve parlayan yıldızlar.', icon: '🚀', color: 'from-purple-500 to-pink-400' },
  { id: 2, name: 'Transformers', desc: 'Dev robotların ve epik dönüşümlerin dünyası.', icon: '🤖', color: 'from-slate-800 to-yellow-400' },
  { id: 3, name: 'Prensesler', desc: 'Büyülü şatolar, parıldayan elbiseler ve masalsı krallıklar.', icon: '👸', color: 'from-pink-400 to-purple-400' },
  { id: 4, name: 'Dinozorlar', desc: 'Tarih öncesi devler ve yemyeşil macera dolu vadiler.', icon: '🦕', color: 'from-green-500 to-lime-400' },
  { id: 5, name: 'Plaj / Tatil', desc: 'Turkuaz sular, altın kumlar ve tropik cennet hayalleri.', icon: '🏖️', color: 'from-cyan-400 to-teal-300' },
  { id: 6, name: 'Fantastik Krallık', desc: 'Ejderhalar, sihirbazlar ve unutulmaz efsaneler diyarı.', icon: '🏰', color: 'from-indigo-500 to-purple-500' },
  { id: 7, name: 'Oyun Evreni', desc: 'Neon ışıklar, pikseller ve dijital dünyanın sonsuz maceraları.', icon: '🎮', color: 'from-blue-500 to-blue-800' },
  { id: 8, name: 'Süper Kahramanlar Şehri', desc: 'Gizli kimlikler, özel güçler ve kötülüğe karşı verilen büyük savaşlar.', icon: '🦸‍♂️', color: 'from-red-500 to-yellow-500' },
  { id: 9, name: 'Sihirli Okul', desc: 'Büyü dersleri, uçan kalemler ve gizemli koridorlarla dolu fantastik bir eğitim dünyası.', icon: '🧙‍♂️', color: 'from-violet-500 to-fuchsia-400' },
];

export default function ThemeSelectStep({ onBack, onNext }) {
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelected(theme.id);
    setToast({
      message: 'Tema Seçildi!',
      subtext: `${theme.name} teması seçildi. Muhteşem gözükecek!`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-center leading-snug bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 text-transparent bg-clip-text mb-2">
        Rüya Temanı Seç
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Seni en çok yansıtan, hayallerini süsleyen temayı seçerek macerana başla!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`relative cursor-pointer p-6 rounded-2xl shadow-xl transform transition hover:scale-105 text-white bg-gradient-to-r ${theme.color}`}
          >
            {selected === theme.id && (
              <div className="absolute -top-3 -right-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-xl animate-spin-pop">
                ✓
              </div>
            )}

            <div className="text-5xl mb-3 text-center animate-bounce-slow">{theme.icon}</div>
            <h3 className="text-lg font-bold text-center">{theme.name}</h3>
            <p className="text-sm text-center mt-1">{theme.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between max-w-3xl mx-auto mt-10">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-white border border-blue-400 text-blue-600 hover:bg-blue-100"
        >
          ← Önceki
        </button>
        <div className="text-sm text-gray-500 pt-2">Adım 3 / 5</div>
        <button
          disabled={!selected}
          onClick={() => onNext(selected)}
          className={`px-6 py-2 rounded-full text-white font-semibold ${
            selected
              ? 'bg-gradient-to-r from-sky-300 to-pink-300 hover:brightness-110'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Sonraki →
        </button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          subtext={toast.subtext}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
