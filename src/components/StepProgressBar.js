const steps = [
  { icon: '🛒', label: 'Ürün' },
  { icon: '📤', label: 'Fotoğraf' },
  { icon: '🎨', label: 'Tema' },
  { icon: '📝', label: 'Not' },
  { icon: '💳', label: 'Ödeme' },
];

export default function StepProgressBar({ currentStep }) {
  return (
    <div className="flex justify-center md:justify-end items-center gap-4 p-4 pr-8">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isCompleted = currentStep > stepIndex;
        const isActive = currentStep === stepIndex;

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all duration-300 transform ${
              isActive
                ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white scale-110 -translate-y-1 shadow-md'
                : isCompleted
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            <span className="text-xl leading-none">
              {isCompleted ? (
                <span className="text-lg">✓</span>
              ) : (
                step.icon
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
