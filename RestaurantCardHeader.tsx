import React from 'react';
import { Star, MapPin, Clock, Phone, Navigation, Share2, Image } from 'lucide-react';
import { BUSINESS_FACTS } from '../data/cafeData';

interface RestaurantCardHeaderProps {
  onOpenGallery: () => void;
}

export const RestaurantCardHeader: React.FC<RestaurantCardHeaderProps> = ({ onOpenGallery }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bunker Cafe — Sector 76, Noida',
        text: 'Order Biryani, Kebabs, Chinese & Fast Food from Bunker Cafe!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Restaurant Hero Image with dark gradient */}
      <div className="relative h-[180px] sm:h-[260px] md:h-[320px] w-full overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80"
          alt="Bunker Cafe Ambiance"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* View photos button floating */}
        <button
          type="button"
          onClick={onOpenGallery}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 hover:bg-white text-[#1c1c1e] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Image className="w-3.5 h-3.5 text-[#d92632]" />
          <span>Photos (6)</span>
        </button>
      </div>

      {/* Floating Info Card (Clean responsive padding & offsets) */}
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 relative z-10 -mt-10 sm:-mt-16 md:-mt-20">
        <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-6 md:p-7 shadow-[0_6px_24px_rgba(20,10,10,0.08)] border border-[#f0e9e2]">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            
            {/* Title & Info */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1c1c1e] tracking-tight leading-tight">
                  {BUSINESS_FACTS.name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Open Now
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#6b7280] font-medium leading-relaxed">
                Biryani · Kebabs &amp; Tandoor · Chinese · Burgers · Pizza &amp; Pasta · Momos · Shakes
              </p>

              <div className="text-xs text-[#6b7280] flex items-start gap-1.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#d92632] shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-relaxed">{BUSINESS_FACTS.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6b7280] pt-1 font-semibold">
                <span className="flex items-center gap-1 text-[#1c1c1e]">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>11:30 AM – 12 Midnight</span>
                </span>
                <span>•</span>
                <span className="text-emerald-700">25-35 mins delivery</span>
                <span>•</span>
                <span>₹450 for two</span>
              </div>
            </div>

            {/* Ratings Box */}
            <div className="flex items-center md:items-end justify-between md:justify-start border-t md:border-t-0 pt-2.5 md:pt-0 border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#2e7d32] text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-lg shadow-xs">
                  <span>★ {BUSINESS_FACTS.googleRating}</span>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-[#6b7280] block font-semibold leading-tight">
                    {BUSINESS_FACTS.googleReviewCount} Google ratings
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">
                    JustDial 4.4 ★
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Offer Pill & Action Buttons (Mobile-first responsive row) */}
          <div className="mt-3.5 pt-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 bg-[#e3f2fd] text-[#1565c0] font-bold text-xs rounded-xl px-3 py-2 text-center sm:text-left">
              <span>⚡ Free delivery on orders above ₹199 in Sector 76</span>
            </div>

            {/* Action buttons with grid on mobile for perfect 3-column spacing */}
            <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${BUSINESS_FACTS.phoneRaw}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d92632] hover:bg-[#b31e28] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Call</span>
              </a>

              <a
                href={BUSINESS_FACTS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#f5f1ec] hover:bg-[#eae4dc] text-[#1c1c1e] text-xs font-bold rounded-xl transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#d92632] shrink-0" />
                <span>Directions</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#f5f1ec] hover:bg-[#eae4dc] text-[#1c1c1e] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span>Share</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
