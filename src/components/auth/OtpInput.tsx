import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  onComplete,
  disabled = false,
  hasError = false,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  useEffect(() => {
    // Auto focus first empty input on initial mount if not disabled
    if (!disabled) {
      const firstEmptyIndex = digits.findIndex(d => !d);
      const targetIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      inputsRef.current[targetIndex]?.focus();
    }
  }, [disabled]);

  const handleChange = (index: number, char: string) => {
    // Keep only the last numeric digit typed
    const numeric = char.replace(/\D/g, '');
    const digit = numeric.slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newOtp = newDigits.join('');
    onChange(newOtp);

    // Auto-advance to next input if a digit was entered
    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.length === 6 && onComplete) {
      onComplete(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and delete previous
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const numericOnly = pastedData.replace(/\D/g, '').slice(0, 6);

    if (numericOnly) {
      onChange(numericOnly);
      const focusIndex = Math.min(numericOnly.length, 5);
      inputsRef.current[focusIndex]?.focus();

      if (numericOnly.length === 6 && onComplete) {
        onComplete(numericOnly);
      }
    }
  };

  return (
    <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 max-w-sm mx-auto">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-black text-xl sm:text-2xl border-2 transition-all outline-hidden ${
            disabled ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed' :
            hasError ? 'bg-red-50 text-tomato-red border-tomato-red focus:bg-white focus:shadow-brutal-sm' :
            digit ? 'bg-paper-white text-ink-black border-ink-black shadow-brutal-sm' :
            'bg-warm-cream/60 text-ink-black border-ink-black/60 focus:border-ink-black focus:bg-paper-white focus:shadow-brutal-sm'
          }`}
          aria-label={`Digit ${idx + 1} of 6`}
        />
      ))}
    </div>
  );
};
