"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [heartPositions, setHeartPositions] = useState<Array<{left: number; top: number}>>([]);
  const router = useRouter();

  const heartStyles = [
    { size: 40, opacity: 0.4, className: "text-pink-300" },
    { size: 32, opacity: 0.5, className: "text-pink-400" },
    { size: 48, opacity: 0.3, className: "text-pink-200" },
    { size: 36, opacity: 0.45, className: "text-pink-300" },
    { size: 44, opacity: 0.35, className: "text-pink-400" },
    { size: 38, opacity: 0.5, className: "text-pink-200" },
    { size: 42, opacity: 0.4, className: "text-pink-300" },
    { size: 34, opacity: 0.45, className: "text-pink-400" }
  ];

  // Generate random positions on the client side only
  useEffect(() => {
    const positions = heartStyles.map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setHeartPositions(positions);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    if (username.toLowerCase() === 'talicia' && password.toLowerCase() === 'twindolphins') {
      router.push('/home');
    } else {
      setError('Hmm... try again, bubba ❤️');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-100 flex items-center justify-center p-4">
      {/* Background hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {heartStyles.map((style, i) => (
          heartPositions[i] && (
            <Heart
              key={i}
              className={`absolute ${style.className}`}
              style={{
                left: `${heartPositions[i].left}%`,
                top: `${heartPositions[i].top}%`,
                animationDelay: `${i * 0.7}s`,
                transform: `scale(${0.8 + (i * 0.1)})`,
                opacity: style.opacity,
                animation: `float-${(i % 6) + 1} 6s infinite ease-in-out`
              }}
              size={style.size}
            />
          )
        ))}
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100">
          <div className="text-center mb-8">
            <Heart className="mx-auto text-pink-400 mb-4 animate-pulse" size={40} />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, Bubba
            </h1>
            <p className="text-pink-600 text-sm">
              Enter our special details to begin ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  The name of Alex Wood's future wife
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                  placeholder="Enter the name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Our Special Place
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                  placeholder="Where did we first meet?"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-50 rounded-lg p-3 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-pink-500 hover:to-pink-600 focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transform active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Heart size={18} />
                  <span>Enter</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}