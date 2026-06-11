import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  Store,
  LayoutDashboard,
  UtensilsCrossed,
  Bell,
  Search,
  Camera,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MOCK_USER } from '../../data';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Order Management', icon: UtensilsCrossed },
  { href: '/admin/photos', label: 'Gallery Moderation', icon: Camera },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/crm', label: 'CRM & Loyalty', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0B] text-slate-300 font-sans">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-40 bg-[#0A0A0B] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[86vw] flex-col border-r border-white/10 bg-[#161618] shadow-2xl shadow-black/40 transition-transform duration-200 lg:w-64 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between gap-3 px-5 lg:px-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 hover:text-white transition-colors">
            <Store className="h-5 w-5 text-[#FF6B35]" />
            <span className="font-semibold text-white tracking-tight uppercase">Nairobi Italian</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400 hover:text-white hover:bg-white/5"
            onClick={() => setMobileOpen(false)}
            aria-label="Close admin navigation"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {ADMIN_LINKS.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== '/admin' && location.pathname.startsWith(link.href));
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.href} 
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive ? 'bg-white/5 text-white border-l-2 border-[#FF6B35]' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#FF6B35]' : 'opacity-50'}`} />
                <span className="text-sm">{link.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link
            to="/pos"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full bg-[#0A0A0B] border border-white/10 hover:bg-white/10 text-white py-2 rounded-md transition-colors text-sm font-medium gap-2"
          >
            <Store className="h-4 w-4" />
            Open POS
          </Link>
        </div>
      </aside>

      <main className="flex min-h-screen min-w-0 max-w-full flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex min-h-16 w-full max-w-full items-center justify-between gap-3 border-b border-white/10 bg-[#0A0A0B] px-4 shadow-lg shadow-black/20 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0 text-slate-400 hover:text-white hover:bg-white/5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open admin navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0 lg:hidden">
              <p className="truncate text-sm font-bold uppercase tracking-tight text-white">Owner Dashboard</p>
              <p className="text-xs text-slate-500">Nairobi Italian</p>
            </div>
          </div>

          <div className="hidden md:flex items-center md:w-72 xl:w-96 relative">
            <Search className="h-4 w-4 absolute left-3 text-slate-500" />
            <Input 
              type="text" 
              placeholder="Search orders, customers, inventory..." 
              className="pl-9 bg-[#161618] border-white/5 text-slate-300 focus-visible:ring-1 focus-visible:ring-[#FF6B35] rounded-xl"
            />
          </div>
          
          <div className="hidden shrink-0 items-center gap-2 sm:flex sm:gap-4">
            <Button variant="ghost" size="icon" className="relative hidden text-slate-400 hover:text-white hover:bg-white/5 sm:inline-flex">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF6B35]"></span>
            </Button>
            <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white leading-none">{MOCK_USER.name}</p>
                <p className="text-xs text-slate-500 mt-1">System Admin</p>
              </div>
              <Avatar className="h-8 w-8 border border-[#FF6B35]">
                <AvatarFallback className="bg-[#161618] text-[#FF6B35] font-bold text-xs uppercase">DM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="max-w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
