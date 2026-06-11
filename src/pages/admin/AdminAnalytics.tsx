import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DASHBOARD_METRICS, INVENTORY_ITEMS, MOCK_ORDERS, MOCK_PRODUCTS } from "../../data";
import { formatKes } from "@/src/lib/commerce";

export function AdminAnalytics() {
  const revenue = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const lowStock = INVENTORY_ITEMS.filter(item => item.onHand <= item.reorderPoint).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Business Intelligence</h1>
        <p className="text-sm text-slate-500 mt-1">Executive KPIs, sales analytics, customer analytics, inventory signals, and demand planning foundations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {DASHBOARD_METRICS.map(metric => (
          <Card key={metric.label} className="bg-[#161618] border-white/5 shadow-none rounded-xl">
            <CardContent className="p-5">
              <span className="text-xs uppercase tracking-wider text-slate-500">{metric.label}</span>
              <strong className="mt-2 block text-2xl text-white">{metric.value}</strong>
              <p className="mt-2 text-xs text-green-400">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Sales Forecast</CardTitle>
            <CardDescription className="text-slate-500">Phase 3 AI forecasting will use weather, time, product, and branch patterns.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-3 rounded-lg bg-[#0A0A0B] p-5">
              {[35, 58, 42, 76, 63, 88, 71].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#FF6B35]" style={{ height: `${height}%` }} />
                  <span className="text-xs text-slate-500">D{index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Readiness Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              [TrendingUp, 'Revenue sample', formatKes(revenue)],
              [PieChart, 'Catalog SKUs', `${MOCK_PRODUCTS.length} products`],
              [LineChart, 'Inventory alerts', `${lowStock} low-stock items`],
              [BarChart3, 'AOV baseline', formatKes(Math.round(revenue / MOCK_ORDERS.length))]
            ].map(([Icon, label, value]) => {
              const SignalIcon = Icon as typeof TrendingUp;
              return (
                <div key={String(label)} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <SignalIcon className="h-5 w-5 text-[#FF6B35]" />
                    <span className="text-sm text-slate-400">{String(label)}</span>
                  </div>
                  <strong className="font-mono text-white">{String(value)}</strong>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
