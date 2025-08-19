import React from 'react';

type InfoRowProps = {
  icon: React.ReactNode;
  text: string;
};

export default function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center space-x-2 gap-2 space-x-reverse">
      {icon}
      <span>{text}</span>
    </div>
  );
}
