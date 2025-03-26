"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, PenLine, MessageCircleHeart, Brain, Sparkles } from 'lucide-react';

interface BackgroundElementProps {
  delay: number;
  size: number;
  className?: string;
}

const BackgroundHeart: React.FC<BackgroundElementProps> = ({ delay, size, className = "" }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    setPosition({
      left: Math.random() * 100,
      top: Math.random() * 100,
    });
  }, []);
  return (
    <Heart
      className={`absolute ${className}`}
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        animationDelay: `${delay}s`,
      }}
      size={size}
    />
  );
};

const BackgroundSparkle: React.FC<BackgroundElementProps> = ({ delay, size, className = "" }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    setPosition({
      left: Math.random() * 100,
      top: Math.random() * 100,
    });
  }, []);
  return (
    <Sparkles
      className={`absolute ${className}`}
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        animationDelay: `${delay}s`,
      }}
      size={size}
    />
  );
};

const PhotoItem = ({ index, caption }: { index: number; caption: string }) => (
  <div className="flex flex-col gap-2">
    <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={`/images/photo${index}.png`}
        alt={caption}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <p className="text-center text-gray-600 text-sm px-2">{caption}</p>
  </div>
);

// Updated BearLove Component
const BearLove: React.FC = () => {
  // Each heart has a random x and y offset (y is negative to move upward)
  interface HeartObj {
    id: number;
    x: number;
    y: number;
  }
  const [hearts, setHearts] = useState<HeartObj[]>([]);
  const [showLove, setShowLove] = useState(false);

  const handleClick = () => {
    setShowLove(true);
    // Create a burst of 8 hearts with random trajectories.
    const newHearts = Array.from({ length: 8 }).map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100 - 50,  // x offset: -50 to +50px
      y: -(Math.random() * 100 + 50), // y offset: -50 to -150px (upwards)
    }));
    setHearts(prev => [...prev, ...newHearts]);
    // Hide the "I love you" message after 2 seconds.
    setTimeout(() => {
      setShowLove(false);
    }, 2000);
  };

  // Remove each heart after its animation ends.
  const handleAnimationEnd = (id: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };

  return (
    <div className="relative flex flex-col items-center my-12">
      <div className="cursor-pointer" onClick={handleClick}>
        <Image
          src="/images/bear.png"
          alt="Bear"
          width={250}
          height={250}
          className="hover:scale-110 transition-transform duration-300"
        />
        <div className="mt-2 text-xl font-semibold text-pink-600">Click me when you feel sad</div>
      </div>
      {showLove && (
        <div className="mt-4 text-2xl font-bold text-pink-500 animate-bounce">
          I love you Talicia
        </div>
      )}
      {hearts.map(heart => (
        <div
          key={heart.id}
          onAnimationEnd={() => handleAnimationEnd(heart.id)}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '120px',
            // Pass the random offsets to the animation via CSS custom properties.
            '--tx': `${heart.x}px`,
            '--ty': `${heart.y}px`,
            animation: 'celebrate 1s ease-out forwards'
          } as React.CSSProperties}
        >
          <Heart size={24} className="text-pink-400" />
        </div>
      ))}
      <style jsx>{`
        @keyframes celebrate {
          0% {
            transform: translate(-50%, 0) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 0) translate(var(--tx), var(--ty)) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const photos = [
    { id: 1, caption: "Photo Booth Shenanigans 💋" },
    { id: 2, caption: "Beach Day Adventures 🌊" },
    { id: 5, caption: "The Switch 🏘️" },
    { id: 6, caption: "Our First Run 🏃" },
    { id: 8, caption: "Our First Holiday 🇹🇭" },
    { id: 9, caption: "Bubba's Graduation 👩🏽‍🎓" }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Hearts layer */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <BackgroundHeart
              key={`heart-${i}`}
              delay={i * 0.5}
              size={24 + Math.floor(i * 2)}
              className="text-pink-200 opacity-20 animate-float-slow"
            />
          ))}
        </div>

        {/* Sparkles layer */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <BackgroundSparkle
              key={`sparkle-${i}`}
              delay={i * 0.3}
              size={12 + Math.floor(i * 1.5)}
              className="text-pink-300 opacity-25 animate-pulse-slow"
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-pink-50/30 to-pink-100/40 animate-pulse-slower" />
      </div>

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <Heart className="mx-auto text-pink-500 mb-4 animate-pulse" size={40} />
            <Sparkles className="absolute -right-4 -top-4 text-pink-400 animate-spin-slow" size={20} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Happy Valentine&apos;s Day, Bubba ❤️
          </h1>
          <p className="text-pink-600 text-lg">
            I made these just for you...
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Love Letter Generator */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <Link href="/home/love-letter" className="group block h-full">
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/95">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <PenLine className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Love Letter Generator
                </h2>
                <p className="text-gray-600 text-center leading-relaxed">
                  Let me express my feelings for you with a special, personalized love letter.
                </p>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="text-pink-400 animate-spin-slow" size={20} />
                </div>
              </div>
            </Link>
          </div>

          {/* Memory Wall */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <Link href="/home/memory-wall" className="group block h-full">
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/95">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MessageCircleHeart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Reasons Why I Love You
                </h2>
                <p className="text-gray-600 text-center leading-relaxed">
                  Discover all the little things that make you special to me.
                </p>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="text-pink-400 animate-spin-slow" size={20} />
                </div>
              </div>
            </Link>
          </div>

          {/* Love Quiz */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <Link href="/home/quiz" className="group block h-full">
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/95">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  Our Love Quiz
                </h2>
                <p className="text-gray-600 text-center leading-relaxed">
                  Score 80%+ on this quiz to reveal the magic phrase you need to claim your special gift!
                </p>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="text-pink-400 animate-spin-slow" size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Photo Collage */}
        <div className={`mb-16 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Favourite Moments ✨</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <PhotoItem key={photo.id} index={photo.id} caption={photo.caption} />
            ))}
          </div>
        </div>

        {/* Bear Love Component */}
        <BearLove />

        {/* Footer Note */}
        <div className={`text-center mt-16 text-gray-600 transition-all duration-1000`} style={{ transitionDelay: '1000ms' }}>
          Made with ❤️ for you by Alex
        </div>
      </div>
    </div>
  );
};

export default HomePage;
