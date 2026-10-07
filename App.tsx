import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { HeaderNav } from './components/HeaderNav';
import { HeroAndOffers } from './components/HeroAndOffers';
import { RestaurantCardHeader } from './components/RestaurantCardHeader';
import { FoodKartMenu } from './components/FoodKartMenu';
import { OtherTabs } from './components/OtherTabs';
import { FoodKartCartDrawer } from './components/FoodKartCartDrawer';
import { FoodKartOrderModal } from './components/FoodKartOrderModal';
import { GalleryModal } from './components/GalleryModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('order');
  const [selectedCategory, setSelectedCategory] = useState('bestsellers');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fffaf6] text-[#1c1c1e] flex flex-col font-sans selection:bg-[#d92632]/20 selection:text-[#d92632]">
        
        {/* FoodKart Topbar Header with Instant Live Search Dropdown */}
        <HeaderNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenOrderTracker={() => setIsOrderModalOpen(true)}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setActiveTab('order');
          }}
        />

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'order' ? (
            <>
              {/* 1. Hero & Coupon Strip & Category Circle Avatars */}
              <HeroAndOffers
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  const el = document.getElementById('menu-area');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />

              {/* 2. Restaurant Hero Banner & Floating Profile Card */}
              <RestaurantCardHeader
                onOpenGallery={() => setIsGalleryOpen(true)}
              />

              {/* 3. Crisp Menu Section with Top Instant Search Results & Category Switcher */}
              <div id="menu-area">
                <FoodKartMenu
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </>
          ) : (
            <OtherTabs
              activeTab={activeTab}
              onSwitchToOrder={() => setActiveTab('order')}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <FoodKartCartDrawer
          onOrderSuccess={() => setIsOrderModalOpen(true)}
        />

        {/* Order Placed Confirmation Modal */}
        <FoodKartOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />

        {/* Photo Gallery Modal */}
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />

        {/* Toast alerts */}
        <Toast />

      </div>
    </CartProvider>
  );
}
