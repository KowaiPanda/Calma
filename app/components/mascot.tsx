'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Mascot({ hints }: { hints?: string[] }) {
  const [showBubble, setShowBubble] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleClick = () => {
    if (!hints?.length) return;

    if (!showBubble) {
      setShowBubble(true);
    } else {
      if (currentHintIndex === hints.length - 1) {
        setShowBubble(false);
        setCurrentHintIndex(0);
      } else {
        setCurrentHintIndex(prev => prev + 1);
      }
    }
  };

  return (
    <div className="relative hover:scale-110 transition-transform duration-300">
      <Image
        src="/images/realmascot.png"
        alt="Mascot"
        width={250}
        height={250}
        onClick={handleClick}
        className="cursor-pointer invert"
      />
      {showBubble && hints?.[currentHintIndex] && (
        <div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 
                    bg-white p-4 rounded-2xl shadow-lg
                    before:content-[''] before:absolute before:bottom-[-10px] 
                    before:left-1/2 before:-translate-x-1/2
                    before:border-l-[10px] before:border-l-transparent
                    before:border-r-[10px] before:border-r-transparent
                    before:border-t-[10px] before:border-t-white"
        >
          <p className="text-gray-800 text-sm whitespace-pre-wrap">
            {hints[currentHintIndex]}
          </p>
        </div>
      )}
    </div>
  );
}
