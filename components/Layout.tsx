
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl flex flex-col items-center mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-blue-500 p-3 rounded-full shadow-lg border-4 border-white">
             <i className="fas fa-magic text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 tracking-tight">
            Dora-Edit
          </h1>
        </div>
        <p className="text-gray-600 text-lg text-center max-w-lg">
          Transform your images with the magic of AI. Upload a photo and tell us what to change!
        </p>
      </header>

      <main className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border-4 border-blue-100 overflow-hidden">
        {children}
      </main>

      <footer className="mt-12 text-gray-400 text-sm flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><i className="fas fa-bolt text-yellow-500"></i> Powered by Gemini 2.5</span>
          <span className="flex items-center gap-1"><i className="fas fa-heart text-red-400"></i> Magic in every pixel</span>
        </div>
        <p>© 2024 Magical Image Assistant</p>
      </footer>
    </div>
  );
};
