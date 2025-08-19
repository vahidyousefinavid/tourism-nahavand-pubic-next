// components/CTACard.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTACardProps {
  title: string;
  description?: string;
  image: string;
  buttonText: string;
  onClick?: () => void;
}

const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  image,
  buttonText,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="relative rounded-3xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300"
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={500}
        className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-white/80 mb-4 max-w-[90%]">
            {description}
          </p>
        )}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-full shadow hover:bg-gray-100 transition"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CTACard;
