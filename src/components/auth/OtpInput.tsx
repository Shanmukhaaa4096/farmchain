import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  length?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  disabled = false,
  autoFocus = true,
  length = 6,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0] && !disabled) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const digits = value.padEnd(length, '').split('').slice(0, length);

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    const combined = newDigits.join('').trimEnd();
    onChange(combined);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join('').trimEnd());
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join('').trimEnd());
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          value={digits[index] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          aria-label={`Digit ${index + 1} of verification code`}
          className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold text-[#2F4A3A] bg-[#FBF8F2] border-2 border-[#2F4A3A]/15 rounded-xl sm:rounded-2xl transition-all duration-150 focus:border-[#C77B58] focus:ring-4 focus:ring-[#C77B58]/15 focus:outline-none disabled:opacity-50 disabled:bg-gray-100"
        />
      ))}
    </div>
  );
};
