import { useState } from 'react';

export default function NoteStep({ onBack, onNext }) {
  const [note, setNote] = useState('');

  return (
    <div className="p-4 pt-2">
      <h1 className="text-4xl font-extrabold text-center leading-snug bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 text-transparent bg-clip-text mb-1">
        Eklemek İstediklerin Var mı?
      </h1>
      <p className="text-center text-gray-600 mb-4">
        Ürünün için özel isteklerini, hayallerini bizimle paylaşabilirsin.
      </p>

      <div className="bg-[#FFFCFE] rounded-2xl shadow-xl max-w-2xl mx-auto p-6 mb-6">
        <h3 className="text-lg font-semibold text-sky-600 mb-2 flex items-center gap-2">
          <span className="text-xl">🖋️</span> Özel Notların
        </h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Örn: 'Arka planda daha fazla yıldız olsun.' veya 'Tişörtüme Küçük Kahramanım yazılsın.'"
          rows="7"
          className="w-full border border-pink-200 rounded-xl p-4 text-sm text-gray-700"
        />
        <p className="text-xs text-gray-400 mt-2">ⓘ Bu alan isteğe bağlıdır, boş bırakabilirsin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        <div className="bg-blue-100 rounded-xl p-5 shadow-md">
          <h4 className="text-blue-700 font-semibold text-lg mb-3 flex items-center gap-2">
            <span>💡</span> Örnek İstekler
          </h4>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>Arka planı daha canlı renklerde yapın.</li>
            <li>Karakterimin saç rengi sarı olsun.</li>
            <li>Üzerine "Hayalperest" yazısı eklensin.</li>
            <li>Belirli bir font stili kullanılabilir mi?</li>
          </ul>
        </div>
        <div className="bg-pink-100 rounded-xl p-5 shadow-md">
          <h4 className="text-pink-700 font-semibold text-lg mb-3 flex items-center gap-2">
            <span>⚡</span> Hızlı İpuçları
          </h4>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>İsteklerini net ve anlaşılır yaz.</li>
            <li>Renk tercihlerini (örn: açık mavi) belirt.</li>
            <li>Yazı eklenmesini istiyorsan tam metni yaz.</li>
            <li>Ne kadar detay, o kadar harika sonuç!</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto mt-4">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-white border border-blue-400 text-blue-600 hover:bg-blue-100"
        >
          ← Önceki
        </button>
        <div className="text-sm text-gray-500 pt-2">Adım 4 / 5</div>
        <button
          onClick={() => onNext(note)}
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-sky-300 to-pink-300 hover:brightness-110"
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
