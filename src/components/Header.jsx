import StepProgressBar from './StepProgressBar';
import logo from '../assets/logo3.png';

export default function Header({ currentStep }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 bg-rose-100 shadow-md h-[88px]">
      {/* Sol üst: Sadece Logo */}
      <div className="flex items-center h-full justify-center">
        <img
          src={logo}
          alt="Dreamfie Logo"
          className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain"
          style={{ maxHeight: '100%', width: 'auto' }}
        />
      </div>

      {/* Sağ üst: Adım ilerleme çubuğu */}
      <div className="flex-shrink-0">
        <StepProgressBar currentStep={currentStep} />
      </div>
    </header>
  );
}
