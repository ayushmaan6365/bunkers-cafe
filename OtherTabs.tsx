import React from 'react';
import { Star, MapPin, Clock, Phone, Navigation, Check, MessageSquare } from 'lucide-react';
import { BUSINESS_FACTS, REVIEWS_LIST, PHOTO_GALLERY } from '../data/cafeData';

interface OtherTabsProps {
  activeTab: string;
  onSwitchToOrder: () => void;
  onOpenGallery: () => void;
}

export const OtherTabs: React.FC<OtherTabsProps> = ({
  activeTab,
  onSwitchToOrder
}) => {
  if (activeTab === 'order') return null;

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* 1. Dining & Ambience Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <span className="text-xs uppercase font-extrabold text-[#d92632] tracking-wider">
                Sector 76&apos;s Favourite Adda
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1c1c1e] tracking-tight">
                Not just a cafe. A neighbourhood hangout.
              </h2>
              <p className="text-[#6b7280] leading-relaxed text-xs sm:text-sm">
                Located right in Sector 76&apos;s Commercial Complex, Bunker Cafe is the go-to spot 
                for late-night foodies, college students, and families looking for flavorful Indian, 
                Tandoori, and Indo-Chinese food at genuinely pocket-friendly rates.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                {[
                  'Pocket-Friendly (₹450 for two)',
                  'Separate Veg & Non-Veg prep',
                  'Cozy Indoor & Outdoor Seating',
                  'Open till 12:00 Midnight daily',
                  'Fresh Hygiene Certified Kitchen',
                  'Swift Takeaway & Home Delivery'
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#1c1c1e] bg-white p-2.5 rounded-xl border border-[#f0e9e2] shadow-2xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onSwitchToOrder}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#d92632] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer text-center"
                >
                  Order Food Online
                </button>
                <a
                  href={`tel:${BUSINESS_FACTS.phoneRaw}`}
                  className="w-full sm:w-auto text-xs sm:text-sm font-bold text-[#1c1c1e] hover:text-[#d92632] text-center py-2"
                >
                  Call Cafe: {BUSINESS_FACTS.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#f0e9e2]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                  alt="Cozy Adda Seating"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
          {/* Rating Summary Card */}
          <div className="bg-white p-4 sm:p-7 rounded-2xl border border-[#f0e9e2] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2e7d32] text-white flex flex-col items-center justify-center font-black shrink-0">
                <span className="text-2xl sm:text-3xl font-mono leading-none">4.6</span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-white" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1c1c1e]">
                  Overall Google Rating
                </h3>
                <p className="text-xs text-[#6b7280] mt-0.5">
                  Based on 102 verified customer reviews in Sector 76, Noida
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                    JustDial 4.4 ★
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    94% positive recommendations
                  </span>
                </div>
              </div>
            </div>

            <a
              href={BUSINESS_FACTS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-4 py-2.5 bg-[#f5f1ec] hover:bg-[#eae4dc] text-[#1c1c1e] text-xs font-bold rounded-xl border border-[#f0e9e2] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#d92632]" />
              <span>Write a Review on Google</span>
            </a>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS_LIST.map((rev) => (
              <div
                key={rev.author}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#f0e9e2] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-50 text-[#d92632] font-black text-xs flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1c1c1e]">{rev.author}</h4>
                        <span className="text-[10px] text-[#6b7280]">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-[#2e7d32] text-white px-2 py-0.5 rounded text-[11px] font-bold font-mono">
                      <span>5.0</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>

                  <p className="text-xs text-[#1c1c1e]/85 leading-relaxed italic mb-3">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="text-[10px] text-[#6b7280] pt-2.5 border-t border-[#f0e9e2] flex items-center justify-between">
                  <span>Verified Google Delivery Review</span>
                  <span>{rev.helpfulCount} helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Photos Tab */}
      {activeTab === 'photos' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1c1c1e]">
              All Photos ({PHOTO_GALLERY.length})
            </h2>
            <span className="text-xs text-[#6b7280]">
              Food dishes, kitchen prep, and dining ambiance in Sector 76
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {PHOTO_GALLERY.map((p, i) => (
              <div key={i} className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-2xs">
                <img
                  src={p.url}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <span className="text-white text-[11px] sm:text-xs font-semibold line-clamp-1">
                    {p.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Location & Map Tab */}
      {activeTab === 'location' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-[#241811] text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-extrabold text-[#D9A441] tracking-wider">
                Visit Us in Sector 76
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Bunker Cafe Location
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d92632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Address:</strong>
                    <span className="leading-relaxed">{BUSINESS_FACTS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Timing:</strong>
                    <span>{BUSINESS_FACTS.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#d92632] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Phone Number:</strong>
                    <a href={`tel:${BUSINESS_FACTS.phoneRaw}`} className="text-white hover:text-[#D9A441] font-semibold">
                      {BUSINESS_FACTS.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={BUSINESS_FACTS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#d92632] text-white font-bold text-xs sm:text-sm rounded-xl"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions (Google Maps)</span>
                </a>

                <a
                  href={`tel:${BUSINESS_FACTS.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Book a Table</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="w-full h-[240px] sm:h-[300px] rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 border border-white/20 shadow-inner">
                <iframe
                  title="Bunker Cafe location map"
                  src={BUSINESS_FACTS.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
