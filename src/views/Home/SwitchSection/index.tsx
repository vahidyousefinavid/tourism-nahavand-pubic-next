'use client';

import { useState } from 'react';
import clsx from 'clsx';

const options = ['روزانه', 'هفتگی', 'ماهانه'];

export default function SwitcherCard() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="w-full max-w-sm mx-auto mt-10 p-2 bg-blue-100 rounded-2xl">
            <div className="relative flex items-center justify-between bg-blue-200 rounded-xl p-1">
                {/* انیمیشن پس‌زمینه دکمه فعال */}
                <div
                    className="absolute top-1 left-1 h-[90%] w-1/3 bg-white rounded-xl shadow-md transition-all duration-300"
                    style={{
                        transform: `translateX(${selected * 100}%)`,
                    }}
                ></div>

                {/* دکمه‌ها */}
                {options.map((label, index) => (
                    <button
                        key={label}
                        onClick={() => setSelected(index)}
                        className={clsx(
                            'z-10 flex-1 text-center py-2 font-medium transition-colors duration-200',
                            selected === index ? 'text-blue-700' : 'text-blue-900/70'
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
