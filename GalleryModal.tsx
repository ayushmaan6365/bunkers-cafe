import React from 'react';
import { X } from 'lucide-react';
import { PHOTO_GALLERY } from '../data/cafeData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer" onClick={onClose} />
      
      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-4xl bg-white rounded-3xl text-left overflow-hidden shadow-2xl relative z-10 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                Bunker Cafe Gallery
              </h2>
              <span className="text-xs text-gray-500">
                Real food &amp; ambience photos from Sector 76, Noida
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-1">
            {PHOTO_GALLERY.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
