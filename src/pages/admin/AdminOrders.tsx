import { Clock, PackageCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_ORDERS } from "../../data";
import { formatKes } from "@/src/lib/commerce";

const statusClass = {
  pending: "bg-slate-500/10 text-slate-300 border-white/10",
  paid: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  preparing: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ready: "bg-green-500/10 text-green-400 border-green-500/20",
  "out-for-delivery": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-white/10 text-slate-300 border-white/10",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20"
};

export function AdminOrders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Order Management</h1>
          <p className="text-sm text-slate-500 mt-1">Webstore, POS, corporate, catering, and marketplace orders in one branch-aware queue.</p>
        </div>
        <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">Create manual order</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          [Clock, "Preparing", "6 active kitchen tickets"],
          [PackageCheck, "Ready", "4 awaiting pickup"],
          [Truck, "Delivery", "8 rider assignments"]
        ].map(([Icon, label, copy]) => {
          const StatIcon = Icon as typeof Clock;
          return (
            <Card key={String(label)} className="bg-[#161618] border-white/5 shadow-none rounded-xl">
              <CardContent className="p-5">
                <StatIcon className="h-6 w-6 text-[#FF6B35]" />
                <h2 className="mt-4 text-xl font-bold text-white">{String(label)}</h2>
                <p className="mt-1 text-sm text-slate-500">{String(copy)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">Live Queue</CardTitle>
          <CardDescription className="text-slate-500">Status updates feed POS, kitchen display, tracking, and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b border-white/10">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-slate-400">Order</TableHead>
                <TableHead className="text-slate-400">Customer</TableHead>
                <TableHead className="text-slate-400">Channel</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-right text-slate-400">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ORDERS.map(order => (
                <TableRow key={order.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">{order.id}</div>
                    <div className="text-xs text-slate-500">{order.fulfillment} · ETA {order.etaMinutes ?? 0}m</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">{order.customerName}</div>
                    <div className="text-xs text-slate-500">{order.customerEmail}</div>
                  </TableCell>
                  <TableCell className="capitalize text-slate-400">{order.channel}</TableCell>
                  <TableCell>
                    <Badge className={`${statusClass[order.status]} border uppercase text-[10px] tracking-wider`}>
                      {order.status.replaceAll('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-white">{formatKes(order.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
