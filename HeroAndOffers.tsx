import React from 'react';
import { AVAILABLE_COUPONS, CATEGORIES_LIST, BUSINESS_FACTS } from '../data/cafeData';
import { useCart } from '../context/CartContext';
import { Check, Sparkles } from 'lucide-react';

interface HeroAndOffersProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const HeroAndOffers: React.FC<HeroAndOffersProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { applyCoupon, appliedCoupon } = useCart();

  return (
    <div className="bg-[#fffaf6]">
      {/* 1. Hero Section matching FoodKart */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-3">
        <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-black tracking-tight text-[#1c1c1e] leading-[1.12]">
          Craving something? <em className="not-italic text-[#d92632]">Get it in minutes.</em>
        </h1>
        <p className="text-[#6b7280] text-xs sm:text-base mt-2 max-w-2xl leading-relaxed">
          {BUSINESS_FACTS.name} · {BUSINESS_FACTS.locality} — Live kitchen prep, authentic taste, and 25-35 min doorstep delivery.
        </p>
      </section>

      {/* 2. Circular Category Strip (.cats from reference site) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 overflow-x-auto scrollbar-none">
        <div className="flex gap-3 sm:gap-6 min-w-max pb-2">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none shrink-0"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 transition-all shadow-xs ${
                    isSelected
                      ? 'ring-3 ring-[#d92632] scale-105'
                      : 'border-2 border-transparent group-hover:scale-105 group-hover:shadow-md'
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-semibold mt-2 transition-colors ${
                    isSelected ? 'text-[#d92632] font-bold' : 'text-[#1c1c1e] group-hover:text-[#d92632]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Coupon Strip (#coupons from reference site) */}
      <div id="coupons" className="pt-2 pb-5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg">🎟️</span>
            <h3 className="text-sm sm:text-lg font-extrabold text-[#1c1c1e]">
              Coupons for you
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-[#6b7280]">
            Tap APPLY to add directly to your cart
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-3 sm:gap-4 min-w-max pb-2">
            {AVAILABLE_COUPONS.map((cp) => {
              const isApplied = appliedCoupon?.code === cp.code;

              return (
                <div
                  key={cp.code}
                  className="coupon-card w-[260px] sm:w-[300px] p-3.5 sm:p-4 text-white flex flex-col justify-between shadow-md shrink-0"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black tracking-widest text-sm sm:text-lg text-[#fbbf24]">
                        {cp.code}
                      </span>
                      <span className="text-[10px] sm:text-[11px] bg-white/10 px-2 py-0.5 rounded font-medium text-amber-200">
                        Min ₹{cp.minOrder}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs opacity-90 my-2 leading-relaxed text-gray-200">
                      {cp.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] text-gray-300">
                      Sector 76 exclusive
                    </span>

                    <button
                      type="button"
                      onClick={() => applyCoupon(cp.code)}
                      className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#fbbf24] text-[#1c1c22] hover:bg-amber-300'
                      }`}
                    >
                      {isApplied ? '✓ APPLIED' : 'APPLY'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
