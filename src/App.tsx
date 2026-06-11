/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/cart/CartProvider';
import { StorefrontLayout } from './components/layout/StorefrontLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { PitchModeNav } from './components/layout/PitchModeNav';
import { StorefrontHome } from './pages/storefront/StorefrontHome';
import { StorefrontMenu } from './pages/storefront/StorefrontMenu';
import { StorefrontAccount } from './pages/storefront/StorefrontAccount';
import { StorefrontGallery } from './pages/storefront/StorefrontGallery';
import { StorefrontBuilder } from './pages/storefront/StorefrontBuilder';
import { StorefrontCart } from './pages/storefront/StorefrontCart';
import { StorefrontCatering } from './pages/storefront/StorefrontCatering';
import { StorefrontCheckout } from './pages/storefront/StorefrontCheckout';
import { StorefrontGiftCards } from './pages/storefront/StorefrontGiftCards';
import { StorefrontLoyalty } from './pages/storefront/StorefrontLoyalty';
import { StorefrontTrack } from './pages/storefront/StorefrontTrack';
import { StorefrontPitch } from './pages/storefront/StorefrontPitch';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminCRM } from './pages/admin/AdminCRM';
import { AdminPhotos } from './pages/admin/AdminPhotos';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminSettings } from './pages/admin/AdminSettings';
import { POSHome } from './pages/pos/POSHome';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <PitchModeNav />
        <Routes>
          <Route path="/" element={<StorefrontLayout />}>
            <Route index element={<StorefrontHome />} />
            <Route path="menu" element={<StorefrontMenu />} />
            <Route path="builder" element={<StorefrontBuilder />} />
            <Route path="cart" element={<StorefrontCart />} />
            <Route path="checkout" element={<StorefrontCheckout />} />
            <Route path="account" element={<StorefrontAccount />} />
            <Route path="gallery" element={<StorefrontGallery />} />
            <Route path="catering" element={<StorefrontCatering />} />
            <Route path="gift-cards" element={<StorefrontGiftCards />} />
            <Route path="loyalty" element={<StorefrontLoyalty />} />
            <Route path="track" element={<StorefrontTrack />} />
            <Route path="pitch" element={<StorefrontPitch />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="photos" element={<AdminPhotos />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="crm" element={<AdminCRM />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/pos" element={<POSHome />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
