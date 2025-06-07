import { useState } from 'react';
import '../index.css';
import Toast from './Toast';

export default function PhotoUploadStep({ onBack, onNext }) {
  const [front, setFront] = useState(null);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [toast, setToast] = useState(null);

  const isValid = front && left && right;

  const handleFileChange = (e, setImage, labelText) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setToast({
        message: 'Fotoğraf Yüklendi!',
        subtext: `${labelText} başarıyla yüklendi.`,
      });
    }
  };

  const renderBox = (label, desc, icon, setter, file, shortLabel) => (
    <div className="bg-[#FFFAFC] rounded-2xl shadow-xl text-center p-4 h- w-full flex flex-col transform transition-transform duration-300 hover:scale-[1.05]">
      <h3 className="font-semibold text-sky-500 text-lg mb-2">{label}</h3>

      <div className="border-2 border-dashed border-sky-300 rounded-xl px-4 py-3 flex-1 flex flex-col justify-center bg-gradient-to-r from-blue-100 to-pink-100">
        <div className="text-[3.2rem] mb-2 animate-bounce-slow">{icon}</div>
        <p className="text-sm text-gray-500 mb-3">{desc}</p>

        <input
          type="file"
          accept="image/*"
          id={label}
          onChange={(e) => handleFileChange(e, setter, shortLabel)}
          className="hidden"
        />
        <div className="flex justify-center mt-2">
          <label
            htmlFor={label}
            className={`w-32 h-9 inline-flex items-center justify-center gap-2 rounded-full font-medium text-xs text-white shadow-md cursor-pointer transition-all duration-300 ${
              file
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-sky-400 to-pink-400 hover:brightness-110'
            }`}
          >
            📷 {file ? 'Yüklendi!' : 'Fotoğraf Seç'}
          </label>
        </div>

        {file && (
          <p className="text-xs font-bold text-green-600 mt-2 truncate">{file.name}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 pt-2">
      <h1 className="text-4xl font-extrabold text-center leading-snug bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 text-transparent bg-clip-text mb-2">
        Harika! Şimdi Fotoğraflarını Yükle
      </h1>
      <p className="text-center text-gray-600 mb-6">
        En iyi sonuç için 3 farklı açıdan, aydınlık ve net fotoğraflar yüklemelisin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
        {renderBox('Önden Fotoğraf', 'Yüz net ve tam karşıdan', '👩‍🚀', setFront, front, 'Ön fotoğraf')}
        {renderBox('Sağ Profil', 'Sağ yandan net profil', '👉', setRight, right, 'Sağ profil')}
        {renderBox('Sol Profil', 'Sol yandan net profil', '👈', setLeft, left, 'Sol profil')}
      </div>

      <p className="text-center text-sm text-gray-600 mb-6">
        Unutma, fotoğrafların ne kadar kaliteli olursa sonucun o kadar harika olur! ✨
      </p>

      <div className="flex justify-between max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-white border border-blue-400 text-blue-600 hover:bg-blue-100"
        >
          ← Önceki
        </button>
        <div className="text-sm text-gray-500 pt-2">Adım 2 / 5</div>
        <button
          onClick={() => onNext({ front, right, left })}
          disabled={!isValid}
          className={`px-6 py-2 rounded-full text-white font-semibold ${
            isValid
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
