
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ImageUploader } from './components/ImageUploader';
import { ImageEditor } from './components/ImageEditor';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setImage(base64);
  };

  const handleReset = () => {
    setImage(null);
  };

  return (
    <Layout>
      {!image ? (
        <div className="p-10 md:p-16 space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                New Feature
              </div>
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                AI Magic for your photos
              </h2>
              <p className="text-gray-500 text-lg">
                Upload any image and give it a whole new look. From retro filters to complex object removal, Gemini 2.5 Flash Image makes it happen in seconds.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Text-to-Image editing instructions",
                  "High-quality generative fills",
                  "Stylistic transformations",
                  "One-click photo enhancements"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="bg-green-100 p-1 rounded-full">
                      <i className="fas fa-check text-green-600 text-[10px]"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">Try something like this</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Retro Filter", img: "https://picsum.photos/id/10/300/300" },
                { label: "Add a Hat", img: "https://picsum.photos/id/64/300/300" },
                { label: "Sunset Background", img: "https://picsum.photos/id/15/300/300" },
                { label: "Cartoon Style", img: "https://picsum.photos/id/1011/300/300" },
              ].map((example, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <img src={example.img} alt={example.label} className="w-full h-32 object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                    <span className="text-white text-xs font-medium">{example.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ImageEditor originalImage={image} onReset={handleReset} />
      )}
    </Layout>
  );
};

export default App;
