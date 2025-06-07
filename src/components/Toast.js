import { useEffect, useState } from 'react';

export default function Toast({ message, subtext = '', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white border border-pink-200 px-6 py-4 rounded-xl shadow-xl text-sm">
        <div className="flex items-center gap-2 font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
          <span>{message}</span>
          <span className="text-black text-base">✨</span>
        </div>
        {subtext && (
          <div className="text-xs text-gray-500 mt-1">{subtext}</div>
        )}
      </div>
    </div>
  );
}
