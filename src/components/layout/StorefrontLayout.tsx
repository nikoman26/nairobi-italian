import { Link, Outlet, useLocation } from 'react-router-dom';
import { MapPin, Menu as MenuIcon, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/src/components/cart/CartProvider';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Webstore' },
  { href: '/builder', label: 'Builder' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/catering', label: 'Catering' },
  { href: '/loyalty', label: 'Loyalty' }
];

export function StorefrontLayout() {
  const location = useLocation();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-slate-300 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-400 hover:text-white hover:bg-white/5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>

            <Link to="/" className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white leading-none uppercase">Nairobi Italian</span>
              <span className="text-[10px] font-semibold tracking-widest text-[#FF6B35] uppercase leading-tight mt-0.5">Ice & Eats</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href ? 'text-[#FF6B35]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 mr-4 text-xs font-medium text-slate-500">
              <MapPin className="h-3 w-3" />
              <span>Westlands branch open until 10pm</span>
            </div>
            <Link
              to="/cart"
              aria-label={`Cart with ${itemCount} items`}
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center bg-[#FF6B35] text-black font-bold text-[10px]">
                {itemCount}
              </Badge>
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-black/70 md:hidden">
            <div className="h-full w-80 max-w-[85vw] border-r border-white/10 bg-[#161618] p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase">Nairobi Italian</p>
                  <p className="text-xs uppercase tracking-widest text-[#FF6B35]">Ice & Eats</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {[
                  ...navItems,
                  { href: '/gift-cards', label: 'Gift Cards' },
                  { href: '/admin', label: 'Staff Portal' }
                ].map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-slate-300 transition-colors hover:text-[#FF6B35]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#161618] border-t border-white/5 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-bold text-xl tracking-tight text-white leading-none uppercase">Nairobi Italian</span>
              <span className="text-[10px] font-semibold tracking-widest text-[#FF6B35] uppercase leading-tight mt-0.5">Ice & Eats</span>
            </div>
            <p className="text-sm text-slate-500">Premium dessert commerce, loyalty, catering, POS, and operations in one digital system.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-white transition-colors">Webstore</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">Build Dessert</Link></li>
              <li><Link to="/catering" className="hover:text-white transition-colors">Corporate Catering</Link></li>
              <li><Link to="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link to="/loyalty" className="hover:text-white transition-colors">Nairobi Rewards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Customer</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/account" className="hover:text-white transition-colors">Account</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">System Demo</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
              <li><Link to="/pos" className="hover:text-white transition-colors">Point of Sale</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
