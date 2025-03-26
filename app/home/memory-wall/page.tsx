"use client";

import { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Reason {
  emoji: string;
  title: string;
  description: string;
}

interface ReasonCardProps {
  reason: Reason;
  index: number;
  isVisible: boolean;
}

const reasons: Reason[] = [
  {
    emoji: "💝",
    title: "Your Beautiful Smile",
    description: "The way your smile lights up any room and makes me feel warm & calm every single time."
  },
  {
    emoji: "💖",
    title: "Your Kindness",
    description: "How you always think of others and show such genuine care and compassion."
  },
  {
    emoji: "✨",
    title: "Your Strength",
    description: "The incredible strength you show in everything you do, despite your past inspires me every day."
  },
  {
    emoji: "💃",
    title: "Your Little Dances",
    description: "Your funny dances when your happy can turn any moment into a joyful memory."
  },
  {
    emoji: "💫",
    title: "Your Support",
    description: "How you're always there for me, believing in me even when I doubt myself."
  },
  {
    emoji: "🦋",
    title: "Your Calmness",
    description: "Your calmness makes it seem like everythings okay."
  },
  {
    emoji: "🌸",
    title: "Your Heart",
    description: "The endless love and warmth you bring to my life."
  },
  {
    emoji: "⭐",
    title: "Our Memories",
    description: "Every precious moment we've shared from Minigolf and beyond."
  },
  {
    emoji: "💕",
    title: "Your Understanding",
    description: "How you understand me like no one else, sometimes without words."
  }
];

const ReasonCard: React.FC<ReasonCardProps> = ({ reason, index, isVisible }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`min-h-[200px] transition-all duration-1000 ease-out
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full h-full cursor-pointer"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : '',
          transition: 'transform 0.6s'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full bg-white rounded-xl p-6 shadow-lg 
                     hover:shadow-xl transition-shadow duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-4xl mb-4">{reason.emoji}</span>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {reason.title}
            </h3>
            <p className="text-pink-500 text-center">
              Click to reveal 💝
            </p>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-pink-400 to-pink-500 
                     rounded-xl p-6 shadow-lg text-white"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-center leading-relaxed">
              {reason.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MemoryWallPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsLoaded(true);
    reasons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, index]));
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/home" 
            className="inline-flex items-center text-pink-600 hover:text-pink-700 
                     transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <Heart className="mx-auto text-pink-500 mb-4" size={40} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Reasons Why I Love You, Talicia
          </h1>
          <p className="text-pink-600">
            Click each card to reveal a special reason ✨
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              reason={reason}
              index={index}
              isVisible={visibleCards.has(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}