import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LicensePlateInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const LicensePlateInput = ({ value, onChange, onSubmit }: LicensePlateInputProps) => {
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");
  const lettersRef = useRef<HTMLInputElement>(null);
  const numbersRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Parse existing value if provided
    if (value) {
      const match = value.match(/^([A-Z]{2,3})\s*(.*)$/);
      if (match) {
        setLetters(match[1]);
        setNumbers(match[2]);
      }
    }
  }, []);

  useEffect(() => {
    // Update parent value
    const combined = letters && numbers ? `${letters} ${numbers}` : letters || numbers;
    onChange(combined);
  }, [letters, numbers, onChange]);

  const handleLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    
    if (input.length <= 3) {
      setLetters(input);
      
      // Auto-focus numbers input only after 3 letters
      if (input.length === 3) {
        setTimeout(() => numbersRef.current?.focus(), 0);
      }
    }
  };

  const handleNumbersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    
    if (input.length <= 5) {
      setNumbers(input);
    }
  };

  const handleLettersKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && letters.length >= 2) {
      e.preventDefault();
      numbersRef.current?.focus();
    } else if (e.key === "Backspace" && letters.length === 0) {
      e.preventDefault();
    }
  };

  const handleNumbersKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && numbers.length > 0) {
      e.preventDefault();
      onSubmit();
    } else if (e.key === "Backspace" && numbers.length === 0) {
      e.preventDefault();
      lettersRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center gap-0 bg-gradient-to-b from-[#e8e8e8] to-[#d4d4d4] border-[3px] border-black rounded-md overflow-hidden shadow-[0_4px_0_0_rgba(0,0,0,0.3),0_8px_16px_-4px_rgba(0,0,0,0.4)] relative">
      {/* Polish Flag Section */}
      <div className="w-14 h-[70px] flex-shrink-0 border-r-2 border-black bg-[#0033A0] flex flex-col items-center justify-between py-2">
        {/* Polish flag stripes */}
        <div className="flex flex-col w-9 h-6 border border-black/20 rounded-sm overflow-hidden">
          <div className="h-1/2 bg-white"></div>
          <div className="h-1/2 bg-[#DC143C]"></div>
        </div>
        {/* PL text */}
        <span className="text-white text-base font-bold tracking-wide">PL</span>
      </div>

      {/* Letters Input */}
      <div className="flex-shrink-0 px-3">
        <input
          ref={lettersRef}
          type="text"
          value={letters}
          onChange={handleLettersChange}
          onKeyDown={handleLettersKeyDown}
          placeholder="SR"
          maxLength={3}
          className="w-[70px] h-[70px] text-[42px] font-black text-black bg-transparent text-center outline-none placeholder:text-black/25 tracking-tighter"
          style={{ 
            fontFamily: "'Arial Black', 'Helvetica', sans-serif",
            textShadow: '0 2px 4px rgba(0,0,0,0.15)'
          }}
        />
      </div>

      {/* Separator */}
      <div className="h-[70px] flex items-center">
        <div className="w-[2px] h-14 bg-black/10"></div>
      </div>

      {/* Numbers Input */}
      <div className="flex-1 px-3 min-w-[140px]">
        <input
          ref={numbersRef}
          type="text"
          value={numbers}
          onChange={handleNumbersChange}
          onKeyDown={handleNumbersKeyDown}
          placeholder="4657C"
          maxLength={5}
          className="w-full h-[70px] text-[42px] font-black text-black bg-transparent text-center outline-none placeholder:text-black/25 tracking-wider"
          style={{ 
            fontFamily: "'Arial Black', 'Helvetica', sans-serif",
            textShadow: '0 2px 4px rgba(0,0,0,0.15)',
            letterSpacing: '0.08em'
          }}
        />
      </div>
    </div>
  );
};
