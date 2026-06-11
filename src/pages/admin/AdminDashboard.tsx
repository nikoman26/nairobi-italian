import { motion } from "motion/react";
import { TrendingUp, Banknote, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening at your stores today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Total Revenue</CardTitle>
            <Banknote className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">KES 45,231.89</div>
            <p className="text-[10px] text-green-400 uppercase tracking-wider flex items-center mt-2">
              <TrendingUp className="h-3 w-3 mr-1" /> +20.1% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-2xl">
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
            <div className="text-3xl font-bold text-white">+235</div>
            <p className="text-[10px] text-[#FF6B35] uppercase tracking-wider mt-2">
              +180.1% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-2xl">
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
            <div className="text-3xl font-bold text-white">+12,234</div>
            <p className="text-[10px] text-blue-400 uppercase tracking-wider mt-2">
              +19 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="col-span-1 lg:col-span-4 bg-[#161618] border-white/5 shadow-none text-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Recent Orders</CardTitle>
            <CardDescription className="text-slate-500">
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="border-b border-white/10">
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-slate-400">Customer</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Method</TableHead>
                  <TableHead className="text-right text-slate-400">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">Olivia Martin</div>
                    <div className="text-xs text-slate-500">olivia.m@email.com</div>
                  </TableCell>
                  <TableCell><Badge className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 shadow-none uppercase text-[10px] tracking-wider font-semibold">Ready</Badge></TableCell>
                  <TableCell><span className="text-sm text-slate-400">M-Pesa</span></TableCell>
                  <TableCell className="text-right font-mono text-white">KES 1,999</TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">Jackson Lee</div>
                    <div className="text-xs text-slate-500">jackson.lee@email.com</div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-orange-400 border-orange-500/30 bg-orange-500/10 uppercase text-[10px] tracking-wider font-semibold">Preparing</Badge></TableCell>
                  <TableCell><span className="text-sm text-slate-400">Card</span></TableCell>
                  <TableCell className="text-right font-mono text-white">KES 3,900</TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">Isabella Nguyen</div>
                    <div className="text-xs text-slate-500">isa.nguyen@email.com</div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-orange-400 border-orange-500/30 bg-orange-500/10 uppercase text-[10px] tracking-wider font-semibold">Preparing</Badge></TableCell>
                  <TableCell><span className="text-sm text-slate-400">M-Pesa</span></TableCell>
                  <TableCell className="text-right font-mono text-white">KES 850</TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">William Kim</div>
                    <div className="text-xs text-slate-500">will@email.com</div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="bg-white/10 text-slate-300 border border-white/5 uppercase text-[10px] tracking-wider font-semibold hover:bg-white/20">Delivered</Badge></TableCell>
                  <TableCell><span className="text-sm text-slate-400">Glovo</span></TableCell>
                  <TableCell className="text-right font-mono text-white">KES 990</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3 bg-[#161618] border-white/5 shadow-none text-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Popular Items</CardTitle>
            <CardDescription className="text-slate-500">Items moving fastest today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-xl bg-[#FF6B35] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-black">1</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Strawberry Mango Ice</p>
                  <p className="text-sm text-slate-500">42 Orders</p>
                </div>
                <div className="ml-auto font-mono text-sm text-white">KES 14,700</div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Madagascar Vanilla Gelato</p>
                  <p className="text-sm text-slate-500">28 Orders</p>
                </div>
                <div className="ml-auto font-mono text-sm text-white">KES 12,600</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
