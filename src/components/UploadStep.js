import { useState } from 'react';

const themes = [
  'Uzay ve Astronot',
  'Transformers',
  'Prensesler',
  'Dinozorlar',
  'Plaj / Tatil',
  'Fantastik Krallık',
  'Oyun Evreni',
];

export default function UploadStep({ onBack }) {
  const [images, setImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [note, setNote] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Fotoğraf ve Tema Seçimi</h2>

      <label className="block mb-2 font-medium">Fotoğraflar (en az 3 adet):</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-4"
      />

      <label className="block mb-2 font-medium">Tema Seçimi:</label>
      <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
        className="w-full p-2 rounded border mb-4"
      >
        <option value="">Tema seçin...</option>
        {themes.map((theme, i) => (
          <option key={i} value={theme}>{theme}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Notunuz:</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 rounded border mb-6"
        rows={4}
        placeholder="Örn: Arka plan yıldızlı olsun, yazı 'Küçük Kahramanım' yazsın..."
      />

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition"
        >
          Geri
        </button>
        <button
          disabled={images.length < 3 || !selectedTheme}
          className="px-4 py-2 rounded bg-purple-500 text-white font-semibold disabled:bg-gray-400"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
}
