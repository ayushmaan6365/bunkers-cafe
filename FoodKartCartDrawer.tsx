import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_COUPONS, BUSINESS_FACTS } from '../data/cafeData';
import { MapPin, Phone, User, ShoppingBag, Trash2 } from 'lucide-react';

interface FoodKartCartDrawerProps {
  onOrderSuccess: () => void;
}

export const FoodKartCartDrawer: React.FC<FoodKartCartDrawerProps> = ({ onOrderSuccess }) => {
  const {
    cart,
    updateQuantity,
    clearCart,
    totalItemCount,
    itemTotal,
    deliveryFee,
    tax,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    placeOrder
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Customer delivery details
  const [customerName, setCustomerName] = useState('Ayushmaan Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerAddress, setCustomerAddress] = useState('Flat 804, Tower B, Sector 76, Noida');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (code: string) => {
    setCouponError('');
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    if (!customerAddress.trim()) {
      alert('Please enter your delivery address in Sector 76, Noida.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName,
        customerPhone,
        customerAddress,
        cookingNotes: notes,
        paymentMethod: 'cod'
      });
      setIsSubmitting(false);
      onOrderSuccess();
    }, 400);
  };

  return (
    <>
      {/* Floating cart button matching reference site .cartbtn */}
      {totalItemCount > 0 && !isCartDrawerOpen && (
        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 bg-[#d92632] hover:bg-[#b31e28] text-white font-extrabold text-xs sm:text-base py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl sm:rounded-full shadow-[0_10px_30px_rgba(217,38,50,0.4)] flex items-center justify-between sm:justify-center gap-2 cursor-pointer transition-transform hover:scale-102 active:scale-98"
        >
          <span>🛒 View cart • {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} • ₹{grandTotal}</span>
          <span className="sm:hidden text-[11px] bg-white/20 px-2 py-0.5 rounded-lg font-bold">
            Checkout →
          </span>
        </button>
      )}

      {/* Slide-out drawer (.drawer & .overlay) */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsCartDrawerOpen(false)}
          />

          <aside className="fixed top-0 right-0 w-full sm:w-[420px] max-w-full sm:max-w-[94vw] h-screen bg-white z-50 flex flex-col justify-between drawer-content animate-in slide-in-from-right duration-250">
            
            {/* Header */}
            <header className="p-5 border-b border-[#f0e9e2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#d92632]" />
                <h3 className="text-lg font-black text-[#1c1c1e]">
                  Your cart
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="text-xl text-[#6b7280] hover:text-[#1c1c1e] w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f1ec] cursor-pointer"
              >
                ✕
              </button>
            </header>

            {/* Cart Items (.items) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-[#6b7280]">
                  <p className="text-sm">
                    Your cart is empty.<br />Add something delicious 🍜
                  </p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-dashed divide-[#f0e9e2]">
                    {cart.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="py-3 flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0 flex-1">
                          <b className="block text-[#1c1c1e] text-sm truncate">
                            {item.menuItem.name}
                          </b>
                          <div className="text-xs text-[#6b7280] font-mono mt-0.5">
                            ₹{item.menuItem.price} × {item.quantity}
                          </div>
                        </div>

                        {/* Quantity pill */}
                        <div className="qty-pill shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.menuItem.id, -1)}
                          >
                            −
                          </button>
                          <span className="font-mono text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.menuItem.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Details Form */}
                  <div className="pt-4 border-t border-[#f0e9e2] space-y-3">
                    <span className="text-xs font-bold text-[#1c1c1e] uppercase tracking-wider block">
                      Delivery Details (Sector 76 Noida)
                    </span>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#f5f1ec] border border-transparent rounded-xl focus:bg-white focus:border-[#d92632] outline-none"
                      />

                      <input
                        type="text"
                        placeholder="Phone Number (+91...)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#f5f1ec] border border-transparent rounded-xl focus:bg-white focus:border-[#d92632] outline-none font-mono"
                      />

                      <textarea
                        rows={2}
                        placeholder="Flat / Tower / Society name in Sector 76, Noida"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#f5f1ec] border border-transparent rounded-xl focus:bg-white focus:border-[#d92632] outline-none resize-none"
                      />

                      <input
                        type="text"
                        placeholder="Cooking note (e.g. less spicy, extra chutney)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#f5f1ec] border border-transparent rounded-xl focus:bg-white focus:border-[#d92632] outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bill & Place order (footer) */}
            {cart.length > 0 && (
              <footer className="p-5 border-t border-[#f0e9e2] bg-[#fffaf6] space-y-3">
                
                {/* Coupon input or applied code */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs font-bold text-[#2e7d32]">
                    <span>
                      🎟️ {appliedCoupon.code}{' '}
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-[#6b7280] font-normal underline ml-1 cursor-pointer"
                      >
                        remove
                      </button>
                    </span>
                    <span className="font-mono">−₹{discount}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (try BUNKER50)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 border border-[#e7e2da] rounded-xl px-3 py-2 text-xs font-mono uppercase bg-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleApply(couponInput)}
                        className="bg-[#1c1c1e] hover:bg-black text-white font-extrabold rounded-xl px-4 py-2 text-xs cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div className="text-[#d92632] text-[11px] font-semibold mt-1">
                        {couponError}
                      </div>
                    )}
                  </div>
                )}

                {/* Bill Rows */}
                <div className="space-y-1.5 text-xs text-[#6b7280] pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-[#1c1c1e]">₹{itemTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery {deliveryFee === 0 && itemTotal > 0 ? '(FREE)' : ''}</span>
                    <span className="font-mono font-bold text-[#1c1c1e]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-mono font-bold text-[#1c1c1e]">₹{tax}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-[#1c1c1e] pt-2 border-t border-[#f0e9e2]">
                    <span>To pay</span>
                    <span className="font-mono text-[#d92632]">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Pay / Place Order Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full bg-[#d92632] hover:bg-[#b31e28] text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Placing order...' : `Place order • ₹${grandTotal}`}
                </button>

              </footer>
            )}

          </aside>
        </div>
      )}
    </>
  );
};
