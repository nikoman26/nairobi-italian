import { KeyRound, PlugZap, ShieldCheck, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BRANCHES } from "../../data";

const integrations = [
  ['M-Pesa STK Push', 'Required for launch', 'configured'],
  ['Card Payments', 'Visa, Mastercard, Apple Pay, Google Pay', 'sandbox'],
  ['Glovo / Uber Eats / Bolt Food', 'Marketplace order intake', 'planned'],
  ['WhatsApp Business API', 'Campaigns and order updates', 'credentials needed'],
  ['Accounting', 'Invoice and ledger export', 'planned']
];

export function AdminSettings() {
  const branch = BRANCHES[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Branch controls, security posture, roles, and external integration readiness.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Branch</CardTitle>
            <CardDescription className="text-slate-500">V1 operates one branch while preserving multi-branch data shape.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#FF6B35]/10 text-[#FF6B35]">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold">{branch.name}</h2>
                <p className="text-sm text-slate-500">{branch.address}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Area</span>
                <strong className="mt-1 block">{branch.area}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Open until</span>
                <strong className="mt-1 block">{branch.openUntil}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Security</CardTitle>
            <CardDescription className="text-slate-500">JWT, RBAC, audit logs, rate limiting, backups, and PCI posture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              [ShieldCheck, 'Role-based access control', 'Owner, manager, cashier, kitchen, driver'],
              [KeyRound, 'Staff PIN login', 'POS and sensitive actions'],
              [PlugZap, 'Webhook signatures', 'Payment and marketplace endpoints']
            ].map(([Icon, label, copy]) => {
              const SettingIcon = Icon as typeof ShieldCheck;
              return (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <SettingIcon className="h-5 w-5 text-[#FF6B35]" />
                  <div>
                    <p className="font-medium">{String(label)}</p>
                    <p className="text-xs text-slate-500">{String(copy)}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">Integration Layer</CardTitle>
          <CardDescription className="text-slate-500">Payment, delivery, messaging, marketplace, and accounting connectors.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {integrations.map(([name, description, status]) => (
            <div key={name} className="flex items-start justify-between gap-4 rounded-lg bg-white/5 p-4">
              <div>
                <h2 className="font-medium">{name}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
              <Badge className="border border-white/10 bg-white/5 text-slate-300 uppercase text-[10px] tracking-wider">
                {status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
