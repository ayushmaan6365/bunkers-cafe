import React from 'react';
import { useCart } from '../context/CartContext';
import { BUSINESS_FACTS } from '../data/cafeData';
import { Check, MessageCircle, Phone, Clock, MapPin, X } from 'lucide-react';

interface FoodKartOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodKartOrderModal: React.FC<FoodKartOrderModalProps> = ({ isOpen, onClose }) => {
  const { lastPlacedOrder } = useCart();

  if (!isOpen || !lastPlacedOrder) return null;

  const whatsappText = encodeURIComponent(
    `*NEW ORDER — BUNKER CAFE*\n` +
    `*Order ID:* #${lastPlacedOrder.orderId}\n` +
    `*Customer:* ${lastPlacedOrder.customerName} (${lastPlacedOrder.customerPhone})\n` +
    `*Address:* ${lastPlacedOrder.customerAddress}\n` +
    `--------------------------\n` +
    `*ITEMS:*\n` +
    lastPlacedOrder.items.map((i) => `• ${i.quantity}x ${i.menuItem.name} — ₹${i.menuItem.price * i.quantity}`).join('\n') +
    `\n--------------------------\n` +
    `*Total to Pay:* ₹${lastPlacedOrder.grandTotal}\n` +
    (lastPlacedOrder.cookingNotes ? `*Note:* ${lastPlacedOrder.cookingNotes}\n` : '') +
    `\nPlease confirm delivery. Thank you!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 bg-white rounded-[24px] p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-[#f0e9e2] animate-in zoom-in-95 duration-200">
        
        {/* Green Tick Circle */}
        <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-black text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#2e7d32]/20">
          ✓
        </div>

        <h2 className="text-2xl font-black text-[#1c1c1e] mb-1">
          Order placed!
        </h2>

        <p className="text-xs sm:text-sm text-[#6b7280] mb-4">
          Order <strong>#{lastPlacedOrder.orderId}</strong> is received.<br />
          Arriving in <strong>25-35 min</strong> from Bunker Cafe kitchen.
        </p>

        {/* Order Details Pill Box */}
        <div className="bg-[#fffaf6] rounded-2xl p-4 border border-[#f0e9e2] text-left text-xs space-y-2 mb-5">
          <div className="flex justify-between font-bold text-[#1c1c1e]">
            <span>{lastPlacedOrder.items.length} dishes</span>
            <span className="font-mono text-sm text-[#d92632]">₹{lastPlacedOrder.grandTotal}</span>
          </div>

          <div className="text-[#6b7280] space-y-1 pt-1 border-t border-[#f0e9e2]">
            <div className="flex items-center gap-1.5 text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-[#d92632] shrink-0" />
              <span className="truncate">{lastPlacedOrder.customerAddress}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Phone className="w-3.5 h-3.5 text-[#d92632] shrink-0" />
              <span>{lastPlacedOrder.customerPhone}</span>
            </div>
          </div>
        </div>

        {/* Actions: Send to WhatsApp & Call */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/918860982571?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] hover:bg-[#1faa53] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order on WhatsApp (+91 88609 82571)</span>
          </a>

          <a
            href={`tel:${BUSINESS_FACTS.phoneRaw}`}
            className="w-full py-2.5 bg-[#f5f1ec] hover:bg-[#eae4dc] text-[#1c1c1e] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#d92632]" />
            <span>Call Restaurant ({BUSINESS_FACTS.phone})</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#1c1c1e] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer mt-1"
          >
            Back to menu
          </button>
        </div>

      </div>
    </div>
  );
};
