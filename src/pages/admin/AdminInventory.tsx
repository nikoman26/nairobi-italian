import { AlertTriangle, Package, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { INVENTORY_ITEMS } from "../../data";
import { stockTone } from "@/src/lib/commerce";

export function AdminInventory() {
  const alerts = INVENTORY_ITEMS.filter(item => item.onHand <= item.reorderPoint).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Inventory Management</h1>
          <p className="text-sm text-slate-500 mt-1">Ingredients, packaging, expiry, suppliers, and reorder signals for Westlands.</p>
        </div>
        <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync stock count
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-xl">
          <CardContent className="p-5">
            <Package className="h-6 w-6 text-[#FF6B35]" />
            <h2 className="mt-4 text-xl font-bold text-white">{INVENTORY_ITEMS.length} SKUs</h2>
            <p className="mt-1 text-sm text-slate-500">Tracked in Phase 1 data model</p>
          </CardContent>
        </Card>
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-xl">
          <CardContent className="p-5">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <h2 className="mt-4 text-xl font-bold text-white">{alerts} reorder alerts</h2>
            <p className="mt-1 text-sm text-slate-500">Auto-reorder hooks planned for Phase 2</p>
          </CardContent>
        </Card>
        <Card className="bg-[#161618] border-white/5 shadow-none rounded-xl">
          <CardContent className="p-5">
            <RefreshCw className="h-6 w-6 text-green-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Real-time sync</h2>
            <p className="mt-1 text-sm text-slate-500">POS and order events reserve stock</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">Stock Ledger</CardTitle>
          <CardDescription className="text-slate-500">Par levels, reorder points, suppliers, and expiry tracking.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b border-white/10">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-slate-400">Item</TableHead>
                <TableHead className="text-slate-400">On Hand</TableHead>
                <TableHead className="text-slate-400">Par</TableHead>
                <TableHead className="text-slate-400">Supplier</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVENTORY_ITEMS.map(item => (
                <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.expiresAt ? `Expires ${item.expiresAt}` : 'Non-perishable'}</div>
                  </TableCell>
                  <TableCell className="font-mono text-white">{item.onHand} {item.unit}</TableCell>
                  <TableCell className="font-mono text-slate-400">{item.parLevel} {item.unit}</TableCell>
                  <TableCell className="text-slate-400">{item.supplier}</TableCell>
                  <TableCell>
                    <Badge className={`${stockTone(item.onHand, item.reorderPoint)} border uppercase text-[10px] tracking-wider`}>
                      {item.onHand <= item.reorderPoint ? 'Reorder' : 'Healthy'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
