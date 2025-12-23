
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 border-4 border-dashed border-blue-200 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group"
         onClick={triggerUpload}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      <div className="bg-white p-6 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
        <i className="fas fa-cloud-upload-alt text-4xl text-blue-400"></i>
      </div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">Upload your photo</h3>
      <p className="text-blue-500 text-sm">JPEG, PNG or WEBP formats supported</p>
    </div>
  );
};
