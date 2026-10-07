import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Heart, ShieldCheck } from 'lucide-react';
import { BUSINESS_FACTS } from '../data/cafeData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#18110b] text-gray-300 border-t border-gray-800 pt-12 pb-24 lg:pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-gray-800 text-xs sm:text-sm">
          
          {/* Col 1 */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-serif text-2xl font-black text-white tracking-tight">
              BUNKER <span className="text-[#C2410C]">CAFÉ</span>
            </span>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Official online ordering platform for Bunker Cafe, Sector 76, Noida. 
              Authentic Matka Biryani, Tandoori Kebabs, Indo-Chinese bowls, crisp burgers, and comfort beverages delivered hot &amp; fresh.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="bg-emerald-900/60 text-emerald-400 px-2.5 py-1 rounded-md font-semibold border border-emerald-700/50">
                Google 4.6 ★ (102 reviews)
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-400 font-medium">JustDial 4.4 ★</span>
            </div>
          </div>

          {/* Col 2: Cuisines */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Popular Cuisines
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>Hyderabadi Matka Biryani</li>
              <li>Charcoal Kebabs &amp; Tandoor</li>
              <li>Street Style Hakka Noodles</li>
              <li>Tandoori &amp; Steamed Momos</li>
              <li>Gourmet Burgers &amp; Sandwiches</li>
              <li>Chilled Shakes &amp; Kulhad Chai</li>
            </ul>
          </div>

          {/* Col 3: Business Details */}
          <div className="lg:col-span-4 space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">
              Restaurant Details
            </h4>
            
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>{BUSINESS_FACTS.address}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-[#C2410C] shrink-0" />
              <a href={`tel:${BUSINESS_FACTS.phoneRaw}`} className="text-white hover:text-[#D9A441] font-semibold">
                {BUSINESS_FACTS.phone}
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span>Open Daily: {BUSINESS_FACTS.hours}</span>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_FACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Support (+91 88609 82571)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            © {currentYear} Bunker Cafe · Sector 76, Noida. All orders dispatched directly from the restaurant kitchen.
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>Dine-in</span>
            <span>·</span>
            <span>Takeaway</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Doorstep Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
