import { Gift, Mail, MessageCircle, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_REFERRALS, MOCK_USER } from "../../data";
import { formatKes } from "@/src/lib/commerce";

export function AdminCRM() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">CRM & Loyalty</h1>
          <p className="text-sm text-slate-500 mt-1">Customer profiles, segments, rewards, referrals, and marketing automation foundations.</p>
        </div>
        <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90">Create campaign</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [Users, 'Customers', '12,234'],
          [Star, 'Repeat rate', '42%'],
          [Gift, 'Points issued', '1.8M'],
          [MessageCircle, 'WhatsApp opt-in', '68%']
        ].map(([Icon, label, value]) => {
          const StatIcon = Icon as typeof Users;
          return (
            <Card key={String(label)} className="bg-[#161618] border-white/5 shadow-none rounded-xl">
              <CardContent className="p-5">
                <StatIcon className="h-5 w-5 text-[#FF6B35]" />
                <span className="mt-4 block text-xs uppercase tracking-wider text-slate-500">{String(label)}</span>
                <strong className="mt-1 block text-2xl text-white">{String(value)}</strong>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">360 Customer View</CardTitle>
            <CardDescription className="text-slate-500">Purchase history, favorite products, loyalty, wallet, referrals, and saved addresses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35] font-bold">DM</div>
              <div>
                <h2 className="text-xl font-bold">{MOCK_USER.name}</h2>
                <p className="text-sm text-slate-500">{MOCK_USER.email} · {MOCK_USER.phone}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Tier</span>
                <strong className="mt-1 block text-white">{MOCK_USER.tier}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Points</span>
                <strong className="mt-1 block text-white">{MOCK_USER.points.toLocaleString()}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Spend</span>
                <strong className="mt-1 block text-white">{formatKes(MOCK_USER.lifetimeSpend)}</strong>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-xs uppercase tracking-wider text-slate-500">Referral</span>
                <strong className="mt-1 block text-white">{MOCK_USER.referralCode}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161618] border-white/5 shadow-none text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Automations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              [Mail, 'Abandoned cart email', 'Ready for provider'],
              [MessageCircle, 'Birthday WhatsApp', 'Requires Business API'],
              [Gift, 'Referral reward', `${MOCK_REFERRALS.filter(item => item.status === 'completed').length} completed`]
            ].map(([Icon, label, copy]) => {
              const AutoIcon = Icon as typeof Mail;
              return (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <AutoIcon className="h-5 w-5 text-[#FF6B35]" />
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
    </div>
  );
}
