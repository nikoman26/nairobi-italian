import { TrendingUp, Banknote, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  {
    customer: 'Olivia Martin',
    email: 'olivia.m@email.com',
    status: 'Ready',
    statusClass: 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20',
    method: 'M-Pesa',
    amount: 'KES 1,999'
  },
  {
    customer: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    status: 'Preparing',
    statusClass: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    method: 'Card',
    amount: 'KES 3,900'
  },
  {
    customer: 'Isabella Nguyen',
    email: 'isa.nguyen@email.com',
    status: 'Preparing',
    statusClass: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    method: 'M-Pesa',
    amount: 'KES 850'
  },
  {
    customer: 'William Kim',
    email: 'will@email.com',
    status: 'Delivered',
    statusClass: 'bg-white/10 text-slate-300 border border-white/5 hover:bg-white/20',
    method: 'Glovo',
    amount: 'KES 990'
  }
];

export function AdminDashboard() {
  return (
    <div className="max-w-full space-y-6 overflow-hidden sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening at your stores today.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Button variant="outline" className="w-full border-white/10 text-white bg-white/5 hover:bg-white/10 sm:w-auto" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold sm:w-auto" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="min-w-0 bg-[#161618] border-white/5 shadow-none rounded-xl sm:rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Total Revenue</CardTitle>
            <Banknote className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="break-words text-2xl font-bold text-white sm:text-3xl">KES 45,231.89</div>
            <p className="text-[10px] text-green-400 uppercase tracking-wider flex items-center mt-2">
              <TrendingUp className="h-3 w-3 mr-1" /> +20.1% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="min-w-0 bg-[#161618] border-white/5 shadow-none rounded-xl sm:rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-slate-400"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white sm:text-3xl">+235</div>
            <p className="text-[10px] text-[#FF6B35] uppercase tracking-wider mt-2">
              +180.1% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="min-w-0 bg-[#161618] border-white/5 shadow-none rounded-xl sm:rounded-2xl sm:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Active Rewards Customers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-slate-400"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white sm:text-3xl">+12,234</div>
            <p className="text-[10px] text-blue-400 uppercase tracking-wider mt-2">
              +19 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-6">
        <Card className="col-span-1 min-w-0 lg:col-span-4 bg-[#161618] border-white/5 shadow-none text-white rounded-xl sm:rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Recent Orders</CardTitle>
            <CardDescription className="text-slate-500">
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 sm:px-4">
            <div className="space-y-3 px-4 sm:hidden">
              {recentOrders.map(order => (
                <article key={`${order.customer}-${order.amount}`} className="rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
                  <div className="flex flex-col items-start gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{order.customer}</p>
                      <p className="truncate text-xs text-slate-500">{order.email}</p>
                    </div>
                    <Badge className={`${order.statusClass} w-fit shrink-0 shadow-none uppercase text-[10px] tracking-wider font-semibold`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-1 border-t border-white/10 pt-3 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-500">{order.method}</span>
                    <strong className="font-mono text-white">{order.amount}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden w-full max-w-full overflow-x-auto sm:block">
            <Table className="min-w-[620px]">
              <TableHeader className="border-b border-white/10">
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-slate-400">Customer</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Method</TableHead>
                  <TableHead className="text-right text-slate-400">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={`${order.customer}-${order.amount}`} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="font-medium text-white">{order.customer}</div>
                      <div className="text-xs text-slate-500">{order.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${order.statusClass} shadow-none uppercase text-[10px] tracking-wider font-semibold`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="text-sm text-slate-400">{order.method}</span></TableCell>
                    <TableCell className="text-right font-mono text-white">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 min-w-0 lg:col-span-3 bg-[#161618] border-white/5 shadow-none text-white rounded-xl sm:rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Popular Items</CardTitle>
            <CardDescription className="text-slate-500">Items moving fastest today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#FF6B35] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-black">1</span>
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-medium leading-none text-white">Strawberry Mango Ice</p>
                  <p className="text-sm text-slate-500">42 Orders</p>
                </div>
                <div className="shrink-0 text-right font-mono text-sm text-white">KES 14,700</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-medium leading-none text-white">Madagascar Vanilla Gelato</p>
                  <p className="text-sm text-slate-500">28 Orders</p>
                </div>
                <div className="shrink-0 text-right font-mono text-sm text-white">KES 12,600</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
