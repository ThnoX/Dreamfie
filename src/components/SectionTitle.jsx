export default function SectionTitle({ children }) {
  return (
    <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 leading-tight">
      {children}
    </h2>
  );
}
