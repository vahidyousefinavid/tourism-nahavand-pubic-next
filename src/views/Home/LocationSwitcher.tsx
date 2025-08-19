'use client';

import { useState } from 'react';
import clsx from 'clsx';

type LocationSwitcherProps = {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
};

export default function LocationSwitcher({
  label,
  options,
  onChange,
}: LocationSwitcherProps) {
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (onChange) onChange(options[index]);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      <h3 className="text-gray-800 font-bold text-right pr-2 text-md">{label}</h3>
      <div className="relative flex items-center justify-between bg-blue-100 rounded-xl p-1 overflow-hidden">
        {/* بک‌گراند دکمه فعال */}
        <div
          className="absolute top-1 left-1 h-[90%] w-1/3 bg-white rounded-lg shadow-md transition-all duration-300"
          style={{
            transform: `translateX(${selected * 100}%)`,
          }}
        ></div>

        {/* گزینه‌ها */}
        {options.map((item, index) => (
          <button
            key={item}
            onClick={() => handleSelect(index)}
            className={clsx(
              'z-10 flex-1 py-2 text-center text-sm sm:text-base font-medium transition-colors duration-200',
              selected === index ? 'text-blue-700' : 'text-blue-900/70'
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
