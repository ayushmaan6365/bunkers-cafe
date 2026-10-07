import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, ShoppingBag, Phone, Plus, Minus, ArrowRight } from 'lucide-react';
import { BUSINESS_FACTS, ALL_MENU_ITEMS, MenuItem } from '../data/cafeData';
import { useCart } from '../context/CartContext';

interface HeaderNavProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOrderTracker?: () => void;
  onSelectCategory?: (catId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenOrderTracker,
  onSelectCategory
}) => {
  const { cart, addToCart, updateQuantity, totalItemCount, grandTotal, setIsCartDrawerOpen, lastPlacedOrder } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? ALL_MENU_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const getItemQuantity = (itemId: string) => {
    const found = cart.find((ci) => ci.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleSelectDishFromSearch = (dish: MenuItem) => {
    setIsSearchOpen(false);
    if (onSelectCategory) {
      onSelectCategory(dish.category);
    }
    setActiveTab('order');
    // Scroll to menu
    setTimeout(() => {
      const el = document.getElementById('menu-area');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f0e9e2] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('order');
            if (onSelectCategory) onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-black text-2xl tracking-tight text-[#1c1c1e] shrink-0"
        >
          bunker<span className="text-[#d92632]">café</span>
        </a>

        {/* Location selector */}
        <div className="hidden sm:flex items-center gap-2 cursor-pointer text-left pl-3 border-l border-[#f0e9e2]">
          <div className="text-xs leading-tight">
            <b className="block text-[#1c1c1e] text-[13px] font-bold">
              📍 Sector 76, Noida
            </b>
            <span className="text-[#6b7280] text-[11px]">
              Delivering in 25-35m ▾
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14.5px] font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('order');
              if (onSelectCategory) onSelectCategory('all');
            }}
            className={`transition-colors cursor-pointer ${
              activeTab === 'order' ? 'text-[#d92632]' : 'text-[#6b7280] hover:text-[#d92632]'
            }`}
          >
            Menu
          </button>
          <a
            href="#coupons"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coupons')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#6b7280] hover:text-[#d92632] transition-colors cursor-pointer"
          >
            Offers
          </a>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'text-[#d92632]' : 'text-[#6b7280] hover:text-[#d92632]'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'text-[#d92632]' : 'text-[#6b7280] hover:text-[#d92632]'
            }`}
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'location' ? 'text-[#d92632]' : 'text-[#6b7280] hover:text-[#d92632]'
            }`}
          >
            Location
          </button>
        </nav>

        {/* Search bar with Instant Dropdown (Zomato / Swiggy style) */}
        <div ref={searchContainerRef} className="flex-1 max-w-md mx-1 sm:mx-2 relative min-w-0">
          <div className="flex items-center gap-2 bg-[#f5f1ec] rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 border border-transparent focus-within:border-[#d92632]/40 focus-within:bg-white transition-all shadow-xs">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6b7280] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
                if (activeTab !== 'order') setActiveTab('order');
              }}
              placeholder="Search dishes..."
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#1c1c1e] placeholder-[#6b7280]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer p-0.5 shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          {/* Instant Zomato-style Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full -left-12 sm:left-0 right-0 sm:right-auto w-[calc(100vw-40px)] sm:w-full max-w-md mt-2 bg-white rounded-2xl shadow-2xl border border-[#f0e9e2] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 bg-[#faf6f1] border-b border-[#f0e9e2] flex items-center justify-between text-xs text-[#6b7280]">
                <span className="truncate pr-2">
                  Matching &ldquo;<strong className="text-[#1c1c1e]">{searchQuery}</strong>&rdquo;
                </span>
                <span className="text-[11px] font-bold text-[#d92632] shrink-0">
                  {searchResults.length} results
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#6b7280]">
                  No dishes found matching &quot;{searchQuery}&quot;.<br />
                  Try searching for <em>pizza, biryani, or momos</em>.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-[280px] sm:max-h-[320px] overflow-y-auto">
                  {searchResults.map((dish) => {
                    const qty = getItemQuantity(dish.id);

                    return (
                      <div
                        key={dish.id}
                        className="p-2.5 sm:p-3 hover:bg-[#fffaf6] transition-colors flex items-center justify-between gap-2.5"
                      >
                        {/* Click to jump */}
                        <div
                          onClick={() => handleSelectDishFromSearch(dish)}
                          className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              {dish.isVeg === true && <span className="vegmark shrink-0" />}
                              {dish.isVeg === false && <span className="vegmark nonveg shrink-0" />}
                              <h4 className="text-xs sm:text-sm font-bold text-[#1c1c1e] truncate">
                                {dish.name}
                              </h4>
                            </div>
                            <span className="font-mono text-xs font-extrabold text-[#d92632] block mt-0.5">
                              ₹{dish.price}
                            </span>
                          </div>
                        </div>

                        {/* Instant Add Button in Dropdown */}
                        <div className="shrink-0">
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(dish);
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-[#d92632] text-[#d92632] hover:text-white border border-[#d92632] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              ADD +
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-[#d92632] text-white px-2 py-0.5 rounded-lg text-xs font-bold font-mono">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(dish.id, -1);
                                }}
                                className="hover:opacity-75 cursor-pointer px-0.5"
                              >
                                −
                              </button>
                              <span>{qty}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(dish.id, 1);
                                }}
                                className="hover:opacity-75 cursor-pointer px-0.5"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="p-2 bg-[#f5f1ec] text-center border-t border-[#f0e9e2]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      const el = document.getElementById('menu-area');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#d92632] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>View all matching dishes in menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions: Track order & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Active order badge */}
          {lastPlacedOrder && onOpenOrderTracker && (
            <button
              type="button"
              onClick={onOpenOrderTracker}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Track #{lastPlacedOrder.orderId}</span>
            </button>
          )}

          {/* Quick Call */}
          <a
            href={`tel:${BUSINESS_FACTS.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1c1c1e] hover:text-[#d92632] bg-[#f5f1ec] hover:bg-[#eae4dc] rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d92632]" />
            <span>Call</span>
          </a>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              totalItemCount > 0
                ? 'bg-[#d92632] text-white hover:bg-[#b31e28] shadow-xs'
                : 'bg-[#f5f1ec] text-[#1c1c1e] hover:bg-[#eae4dc]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {totalItemCount > 0 ? `${totalItemCount} • ₹${grandTotal}` : 'Cart'}
            </span>
            <span className="sm:hidden font-mono">
              {totalItemCount > 0 ? totalItemCount : 'Cart'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
