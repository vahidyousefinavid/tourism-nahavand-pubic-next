import React, { useEffect, useState } from 'react';

const TypingBox = ({ text, speed = 500 }:any) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const splitWords = text.split(' ');
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < splitWords.length) {
          setWords(splitWords.slice(0, prev + 1));
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      style={{
        border: '2px solid #ccc',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '18px',
        direction: 'rtl',
        fontFamily: 'IranSans, sans-serif',
        lineHeight: '2'
      }}
    >
      {words.join(' ')}
    </div>
  );
};

export default TypingBox;
