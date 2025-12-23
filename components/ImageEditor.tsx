
import React, { useState } from 'react';
import { geminiImageService } from '../services/geminiService';
import { ProcessingStatus } from '../types';

interface ImageEditorProps {
  originalImage: string;
  onReset: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ originalImage, onReset }) => {
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<ProcessingStatus>({
    isLoading: false,
    message: '',
    error: null
  });

  const handleEdit = async () => {
    if (!prompt.trim()) {
      setStatus(prev => ({ ...prev, error: "Please enter a description of what you'd like to change." }));
      return;
    }

    setStatus({
      isLoading: true,
      message: "Rubbing the magic lamp... Gemini is working!",
      error: null
    });

    try {
      const result = await geminiImageService.editImage(originalImage, prompt);
      setEditedImage(result);
      setStatus({ isLoading: false, message: "Magic complete!", error: null });
    } catch (err: any) {
      setStatus({
        isLoading: false,
        message: '',
        error: err.message || "Something went wrong. The magic fizzled out."
      });
    }
  };

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Visual Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Original</span>
            <button 
              onClick={onReset}
              className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
            >
              <i className="fas fa-redo"></i> Reset
            </button>
          </div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner relative">
            <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Result Area */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">Result</span>
            {editedImage && (
              <button 
                onClick={() => downloadImage(editedImage, 'edited-magic.png')}
                className="text-xs text-green-500 hover:text-green-700 flex items-center gap-1"
              >
                <i className="fas fa-download"></i> Save
              </button>
            )}
          </div>
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-blue-100 shadow-inner relative flex items-center justify-center">
            {editedImage ? (
              <img src={editedImage} alt="Edited" className="w-full h-full object-contain animate-in fade-in duration-700" />
            ) : status.isLoading ? (
              <div className="flex flex-col items-center gap-4 text-center p-6">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-blue-600 font-medium">{status.message}</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-200">
                  <i className="fas fa-wand-sparkles text-3xl"></i>
                </div>
                <p className="text-gray-400">Enter a prompt below to see the magic!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-blue-50 p-6 rounded-2xl space-y-4">
        <label className="block text-blue-800 font-bold text-lg mb-2">
          What should we change?
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={status.isLoading}
            placeholder='Try: "Make it look like a vintage postcard", "Add a cute robot next to the person", or "Change the background to a sunny beach"'
            className="w-full p-4 pr-12 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none h-32 text-gray-700"
          />
          <button
            onClick={handleEdit}
            disabled={status.isLoading || !prompt.trim()}
            className={`absolute bottom-4 right-4 p-3 rounded-lg flex items-center gap-2 font-bold transition-all shadow-md ${
              status.isLoading || !prompt.trim() 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            {status.isLoading ? (
              <i className="fas fa-circle-notch animate-spin"></i>
            ) : (
              <i className="fas fa-magic"></i>
            )}
            Cast Spell
          </button>
        </div>

        {status.error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 flex items-start gap-3 rounded-r-lg animate-in slide-in-from-left duration-300">
            <i className="fas fa-exclamation-circle mt-1"></i>
            <p className="text-sm font-medium">{status.error}</p>
          </div>
        )}
      </div>

      {/* Quick Presets */}
      {!status.isLoading && (
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Make it a retro film aesthetic",
              "Add some fluffy white clouds",
              "Turn the background into a cyberpunk city",
              "Make it look like an oil painting",
              "Convert to black and white with high contrast"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(preset)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
