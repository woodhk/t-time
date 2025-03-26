"use client";

import { useState, useEffect } from 'react';
import { Heart, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const intros = [
  "My dearest Talicia,",
  "To my beautiful Talicia,",
  "My lovely Talicia,",
  "To the one who makes my heart smile,",
  "To my incredible girlfriend,",
];

const bodies = [
  "Every moment with you feels like a dream come true. Your funny little dances brightens my depressing days, and your unconditional love allows me to feel like a kid again. The way you understand me, support me, and care for me makes me fall in love with you more each day (OKAY? sorry i had to)",
  "From the day we met at Twin Dolphins, I knew you wanted me. Your kindness, your passion, and your beautiful heart have captured mine completely. Every little thing about you makes my life better - your little dances, your caring nature, and the way you make everything brighter just by being there (even though you're 5ft).",
  "Words can't fully express how grateful I am to have you in my life. You're not just my girlfriend; you're my best friend, my future wife, and my biggest supporter. Your calmness, your patience, your determination (to finish assignments), and your gentle spirit inspire me every single day.",
  "When I think about all our memories together - every laugh we've shared, every challenge we've faced (switch), and every quiet moment we've enjoyed (dinners where you just stare at me -> Gangnam) - I'm reminded of how lucky I am to have found you. Your love makes every day feel like Valentine's Day.",
  "You have this amazing ability to make my heart skip a beat with just a simple OKAY HELLO. Your presence in my life has brought so much happiness, laughter, and love. I cherish every moment we spend together, whether we're on adventures to phi phi island or just enjoying each other's company at bangkok brothers.",
];

const closings = [
  "Forever yours,",
  "With all my love,",
  "Loving you always,",
  "Yours truly,",
  "With endless love,",
];

export default function LoveLetterPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIntro, setCurrentIntro] = useState(0);
  const [currentBody, setCurrentBody] = useState(0);
  const [currentClosing, setCurrentClosing] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const generateNewLetter = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCurrentIntro(Math.floor(Math.random() * intros.length));
    setCurrentBody(Math.floor(Math.random() * bodies.length));
    setCurrentClosing(Math.floor(Math.random() * closings.length));
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className={`mb-8 transition-all duration-700 transform
          ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <Link href="/home" 
            className="inline-flex items-center text-pink-600 hover:text-pink-700 
                     transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Main content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-8 md:p-12
                      transform transition-all duration-700
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
          
          {/* Title */}
          <div className="text-center mb-8">
            <Heart className="mx-auto text-pink-500 mb-4" size={40} />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Love Letter Generator
            </h1>
            <p className="text-pink-600">
              A special message, just for you ✨
            </p>
          </div>

          {/* Letter content */}
          <div className="bg-pink-50/50 rounded-xl p-6 md:p-8 mb-8
                        font-serif leading-relaxed text-gray-800">
            <p className="mb-6 text-xl">
              {intros[currentIntro]}
            </p>
            
            <p className="mb-8 text-lg">
              {bodies[currentBody]}
            </p>
            
            <p className="text-xl">
              {closings[currentClosing]}
            </p>
            <p className="text-xl">
              Your Valentine ❤️
            </p>
          </div>

          {/* Generate button */}
          <div className="text-center">
            <button
              onClick={generateNewLetter}
              disabled={isGenerating}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                       from-pink-400 to-pink-500 text-white rounded-lg
                       hover:from-pink-500 hover:to-pink-600
                       focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
                       transform active:scale-[0.98] transition-all duration-200
                       disabled:opacity-70 disabled:cursor-not-allowed
                       font-medium text-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Generate New Letter
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}