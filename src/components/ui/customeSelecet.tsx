'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'انتخاب کنید',
  size = 'md',
  disabled = false,
}: CustomSelectProps) {
  // ارتفاع بر اساس سایز
  const heightClasses = {
    sm: 'h-8 text-sm px-2',
    md: 'h-10 text-base px-3',
    lg: 'h-12 text-lg px-4',
  };

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled} dir="rtl">
      <SelectPrimitive.Trigger
        className={cn(
          'inline-flex items-center justify-between rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
          heightClasses[size],
          'w-full',
          'flex-row-reverse', // معکوس برای راست‌چین کردن آیکون و متن
          'text-right'
        )}
        aria-label="انتخاب گزینه"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-gray-400">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'overflow-hidden rounded-md border border-gray-200 bg-white shadow-md',
            'z-50 min-w-[var(--radix-select-trigger-width)]',
            'text-right' // راست‌چین کردن لیست آیتم‌ها
          )}
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center p-1 cursor-default">
            <ChevronUpIcon className="h-4 w-4 text-gray-400" />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-1 max-h-60 overflow-y-auto">
            {options.map(({ label, value: val }) => (
              <SelectPrimitive.Item
                key={val}
                value={val}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-900 outline-none',
                  'data-[highlighted]:bg-blue-500 data-[highlighted]:text-white',
                  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed'
                )}
              >
                <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center p-1 cursor-default">
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
