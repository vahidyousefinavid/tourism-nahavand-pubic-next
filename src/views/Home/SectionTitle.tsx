import React from "react";

type SectionTitleProps = {
  text: string;
  className?: string;
};

export default function SectionTitle({ text, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* <div className="w-4 h-4 rounded-full bg-blue-500"></div> */}

      <h3 className="text-md sm:text-2xl px-10 bg-[#480355] p-2 rounded-l-[12px] font-semibold text-white-100">
        {text}
      </h3>
    </div>
  );
}
