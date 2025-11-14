import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LicensePlateInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const LicensePlateInput = ({
  value,
  onChange,
  onSubmit,
}: LicensePlateInputProps) => {
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");

  const lettersRef = useRef<HTMLInputElement | null>(null);
  const numbersRef = useRef<HTMLInputElement | null>(null);

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
    const combined =
      letters && numbers ? `${letters} ${numbers}` : letters || numbers;
    onChange(combined);
  }, [letters, numbers, onChange]);

  const handleLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (input.length <= 3) {
      setLetters(input);

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
    <div className={cn("space-y-2 w-full")}>
      {/* Оставляем только внешний заголовок на странице, здесь label убран */}

      <div className="flex justify-center">
        <div className="rounded-xl shadow-xl border-[3px] border-black bg-gradient-to-b from-slate-100 to-slate-200 px-0 py-0 overflow-hidden">
          <div className="flex h-20 items-stretch">
            {/* Flag / PL section */}
            <div className="flex flex-col items-center justify-center w-16 bg-blue-700 text-white border-r border-black rounded-l-xl">
              <div className="w-8 h-4 border border-slate-300 overflow-hidden mb-1">
                <div className="h-1/2 w-full bg-white" />
                <div className="h-1/2 w-full bg-red-600" />
              </div>
              <span className="text-xs font-semibold tracking-wide">PL</span>
            </div>

            {/* Letters */}
            <div className="flex items-center justify-center px-2">
              <input
                ref={lettersRef}
                value={letters}
                onChange={handleLettersChange}
                onKeyDown={handleLettersKeyDown}
                className="bg-transparent outline-none border-none font-extrabold uppercase text-black text-center tracking-[0.18em] text-[2.6rem] leading-none w-[105px]"
                style={{
                  transform: letters.length === 3 ? "scale(0.86)" : "scale(1)",
                  transformOrigin: "left center",
                }}
                inputMode="text"
                maxLength={3}
                placeholder="SS"
              />
            </div>

            {/* Divider */}
            <div className="w-px bg-slate-400 my-3" />

            {/* Numbers */}
            <div className="flex items-center justify-center px-4">
              <input
                ref={numbersRef}
                value={numbers}
                onChange={handleNumbersChange}
                onKeyDown={handleNumbersKeyDown}
                className="bg-transparent outline-none border-none font-extrabold uppercase text-slate-500 text-center tracking-[0.18em] text-[2.6rem] leading-none w-[210px]"
                maxLength={5}
                inputMode="text"
                placeholder="4657C"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
