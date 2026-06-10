// src/components/Newsletter.tsx
"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-blue-600 py-10 px-4 mt-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Subscribe on our newsletter
        </h2>
        <p className="text-blue-100 text-sm sm:text-base mb-6 max-w-md">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        {/* Input Row */}
        {subscribed ? (
          <div className="bg-white/20 text-white text-sm font-medium px-6 py-3 rounded">
            ✓ You're subscribed! Thank you.
          </div>
        ) : (
          <div className="flex w-full max-w-md gap-0 rounded overflow-hidden shadow-sm">
            <div className="flex items-center bg-white flex-1 px-3 gap-2">
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 py-3 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-6 py-3 transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </div>
        )}

      </div>
    </section>
  );
}