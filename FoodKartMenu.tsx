import React, { useState, useMemo } from 'react';
import { ALL_MENU_ITEMS, MenuItem } from '../data/cafeData';
import { useCart } from '../context/CartContext';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FoodKartMenuProps {
  searchQuery: string;
  setSearchQuery?: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const FoodKartMenu: React.FC<FoodKartMenuProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory
}) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  
  // Accordion state when 'all' is selected
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategoryCollapse = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const getItemQuantity = (itemId: string) => {
    const found = cart.find((ci) => ci.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  // Search Results (Shown at the very top when search is active)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_MENU_ITEMS.filter((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      
      if (!match) return false;
      if (vegFilter === 'veg' && item.isVeg !== true) return false;
      if (vegFilter === 'non-veg' && item.isVeg !== false) return false;
      return true;
    });
  }, [searchQuery, vegFilter]);

  // Filtered items for category browsing
  const categoryItems = useMemo(() => {
    let items = ALL_MENU_ITEMS;

    // Filter by category
    if (selectedCategory === 'bestsellers') {
      items = items.filter((i) => i.bestseller);
    } else if (selectedCategory !== 'all') {
      items = items.filter((i) => i.category === selectedCategory);
    }

    // Filter by veg
    if (vegFilter === 'veg') items = items.filter((i) => i.isVeg === true);
    if (vegFilter === 'non-veg') items = items.filter((i) => i.isVeg === false);

    return items;
  }, [selectedCategory, vegFilter]);

  // Category mapping with icons
  const categoryPills = [
    { id: 'bestsellers', name: '🔥 Bestsellers', count: 9 },
    { id: 'biryani', name: '🍛 Biryani', count: 4 },
    { id: 'kebabs', name: '🍢 Kebabs & Tandoor', count: 4 },
    { id: 'chinese', name: '🍜 Chinese', count: 4 },
    { id: 'burgers', name: '🍔 Burgers & Sandwiches', count: 4 },
    { id: 'pizza-pasta', name: '🍕 Pizza & Pasta', count: 4 },
    { id: 'momos', name: '🥟 Momos', count: 3 },
    { id: 'beverages', name: '🥤 Beverages', count: 6 },
    { id: 'desserts', name: '🍨 Desserts', count: 3 },
    { id: 'all', name: '📋 View All Accordions', count: ALL_MENU_ITEMS.length }
  ];

  // Render a responsive food item card (clean mobile 2-column layout)
  const renderItemCard = (item: MenuItem) => {
    const qty = getItemQuantity(item.id);

    return (
      <div
        key={item.id}
        className="bg-white border border-[#f0e9e2] hover:border-[#e0d6cb] rounded-2xl p-3.5 sm:p-4.5 flex items-start justify-between gap-3 shadow-xs hover:shadow-sm transition-all"
      >
        {/* Left Column: Dish Info */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            {item.isVeg === true && <span className="vegmark shrink-0" title="Veg" />}
            {item.isVeg === false && <span className="vegmark nonveg shrink-0" title="Non-Veg" />}
            {item.isVeg === null && (
              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-bold shrink-0">
                Veg/Chicken
              </span>
            )}
            {item.bestseller && (
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded shrink-0">
                ★ Bestseller
              </span>
            )}
          </div>

          <h4 className="font-bold text-sm sm:text-base text-[#1c1c1e] leading-snug break-words">
            {item.name}
          </h4>

          <div className="flex items-center gap-2 mt-1 mb-1.5">
            <span className="font-extrabold text-sm sm:text-base text-[#1c1c1e] font-mono">
              ₹{item.price}
            </span>
            {item.priceDisplay.includes('onwards') && (
              <span className="text-[10px] sm:text-xs text-[#6b7280] font-normal">
                onwards
              </span>
            )}
            {item.rating && (
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded ml-auto sm:ml-0">
                ★ {item.rating}
              </span>
            )}
          </div>

          <p className="text-xs text-[#6b7280] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Right Column: Square Image + Stacked ADD/Qty Button (Zomato/Swiggy mobile standard) */}
        <div className="shrink-0 flex flex-col items-center w-22 sm:w-26">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* ADD / QTY Pill right underneath image */}
          <div className="mt-2 w-full flex justify-center">
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="w-full py-1.5 sm:py-2 bg-white hover:bg-rose-50 text-[#d92632] border border-[#d92632] rounded-xl text-xs font-extrabold tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center uppercase"
              >
                ADD
              </button>
            ) : (
              <div className="w-full py-1 bg-[#d92632] text-white rounded-xl text-xs font-extrabold flex items-center justify-between px-2 shadow-xs">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 hover:opacity-75 cursor-pointer"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="font-mono text-xs">{qty}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 hover:opacity-75 cursor-pointer"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6">
      
      {/* 1. INSTANT TOP SEARCH RESULTS */}
      {searchQuery.trim().length > 0 && (
        <div className="mb-8 bg-white rounded-2xl p-4 sm:p-6 border-2 border-[#d92632]/30 shadow-md">
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#f0e9e2] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">🔍</span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1c1c1e] leading-tight">
                  Search Results for &ldquo;{searchQuery}&rdquo;
                </h3>
                <span className="text-xs text-[#6b7280]">
                  Found {searchResults.length} matching {searchResults.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>
            </div>

            {setSearchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#6b7280] hover:text-[#d92632] bg-[#f5f1ec] px-2.5 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-6 text-xs sm:text-sm text-[#6b7280]">
              No dishes found matching &quot;{searchQuery}&quot;.<br />
              Try searching for <em>pizza, biryani, burger, momos</em>.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {searchResults.map((item) => renderItemCard(item))}
            </div>
          )}
        </div>
      )}

      {/* 2. CATEGORY SELECTION TABS & VEG FILTERS (Responsive layout) */}
      <div className="space-y-3 sm:space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-[#1c1c1e] tracking-tight">
              Select Category
            </h2>
            <p className="text-xs text-[#6b7280]">
              Tap any category to instantly view its dishes
            </p>
          </div>

          {/* Veg / Non-Veg Switcher */}
          <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-[#f0e9e2] text-xs font-bold self-start sm:self-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setVegFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                vegFilter === 'all' ? 'bg-[#1c1c1e] text-white' : 'text-[#6b7280] hover:text-[#1c1c1e]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setVegFilter('veg')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                vegFilter === 'veg' ? 'bg-[#2e7d32] text-white' : 'text-[#2e7d32] hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Veg
            </button>
            <button
              type="button"
              onClick={() => setVegFilter('non-veg')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                vegFilter === 'non-veg' ? 'bg-[#a33] text-white' : 'text-[#a33] hover:bg-rose-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Crisp Category Pills (smooth touch horizontal scrolling) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {categoryPills.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all shadow-xs cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#d92632] text-white ring-2 ring-[#d92632]/20'
                    : 'bg-white text-[#1c1c1e] hover:bg-[#faf6f1] border border-[#f0e9e2]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#f5f1ec] text-[#6b7280]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MENU DISPLAY: Clean Crisp View for Selected Category OR Accordions for 'All' */}
      {selectedCategory !== 'all' ? (
        /* SINGLE FOCUSED CATEGORY VIEW */
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f0e9e2] shadow-xs">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100 gap-2">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-[#1c1c1e] capitalize flex items-center gap-2">
                  <span>
                    {categoryPills.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                  </span>
                </h3>
                <span className="text-xs text-[#6b7280]">
                  {categoryItems.length} dishes in this category
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className="text-xs font-bold text-[#d92632] hover:underline cursor-pointer shrink-0"
              >
                View all categories →
              </button>
            </div>

            {categoryItems.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#6b7280]">
                No dishes match the veg/non-veg filter in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {categoryItems.map((item) => renderItemCard(item))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ACCORDIONS FOR ALL CATEGORIES */
        <div className="space-y-3.5 sm:space-y-4">
          {[
            { id: 'biryani', name: '🍛 Biryani' },
            { id: 'kebabs', name: '🍢 Kebabs & Tandoor' },
            { id: 'chinese', name: '🍜 Chinese' },
            { id: 'burgers', name: '🍔 Burgers & Sandwiches' },
            { id: 'pizza-pasta', name: '🍕 Pizza & Pasta' },
            { id: 'momos', name: '🥟 Momos' },
            { id: 'beverages', name: '🥤 Beverages' },
            { id: 'desserts', name: '🍨 Desserts' }
          ].map((cat) => {
            const items = ALL_MENU_ITEMS.filter((i) => {
              if (i.category !== cat.id) return false;
              if (vegFilter === 'veg' && i.isVeg !== true) return false;
              if (vegFilter === 'non-veg' && i.isVeg !== false) return false;
              return true;
            });

            if (items.length === 0) return null;
            const isCollapsed = collapsedCategories[cat.id];

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#f0e9e2] overflow-hidden shadow-xs transition-all"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleCategoryCollapse(cat.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#faf6f1] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-black text-[#1c1c1e]">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] bg-[#f5f1ec] text-[#6b7280] font-bold px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f5f1ec] flex items-center justify-center text-[#1c1c1e]">
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                {!isCollapsed && (
                  <div className="p-3.5 sm:p-5 pt-0 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                    {items.map((item) => renderItemCard(item))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Indicative prices note */}
      <div className="mt-8 p-3 rounded-xl bg-white border border-[#f0e9e2] text-[11px] sm:text-xs text-[#6b7280] text-center">
        Prices indicative — please confirm with Bunker Cafe when ordering. All dishes prepared fresh in Sector 76, Noida.
      </div>

    </div>
  );
};
