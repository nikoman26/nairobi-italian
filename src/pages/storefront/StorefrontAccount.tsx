import { motion } from "motion/react";
import { Copy, Gift, Users, Camera, Check, Upload, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER, MOCK_REFERRALS, MOCK_PHOTOS } from "../../data";
import { useState } from "react";

export function StorefrontAccount() {
  const [copied, setCopied] = useState(false);
  const myPhotos = MOCK_PHOTOS.filter(p => p.userId === MOCK_USER.id);

  const copyCode = () => {
    navigator.clipboard.writeText(MOCK_USER.referralCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-12">
          <div className="h-16 w-16 rounded-full border border-[#FF6B35] flex items-center justify-center bg-[#161618]">
            <span className="text-[#FF6B35] font-bold text-xl uppercase">DM</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{MOCK_USER.name}</h1>
            <p className="text-slate-500">{MOCK_USER.email} • {MOCK_USER.points} Points</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Referral Program Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[#161618] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Gift className="w-32 h-32 text-[#FF6B35]" />
              </div>
              <div className="relative z-10">
                <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 mb-4 uppercase tracking-wider text-[10px]">
                  Nairobi Rewards
                </Badge>
                <h2 className="text-xl font-bold text-white mb-2">Refer a friend, get 500 points.</h2>
                <p className="text-sm text-slate-400 mb-6 max-w-md">
                  Share the sweet taste of Nairobi. When your friend makes their first order using your code, you both receive 500 loyalty points (KES 500 value).
                </p>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="font-mono text-white tracking-widest">{MOCK_USER.referralCode}</span>
                    <Button variant="ghost" size="sm" className="text-[#FF6B35] hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] shrink-0" onClick={copyCode}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 shrink-0 h-12">
                    Share Link
                  </Button>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Your Invites</h3>
                    <span className="text-xs text-slate-500">{MOCK_USER.referralsCount} Successful</span>
                  </div>
                  <div className="space-y-3">
                    {MOCK_REFERRALS.map(ref => (
                      <div key={ref.id} className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-300">{ref.referredEmail}</span>
                        </div>
                        {ref.status === 'completed' ? (
                          <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] uppercase">Earned 500 pts</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500 border-white/10 text-[10px] uppercase">Pending</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#161618] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-[280px]"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#FF6B35]">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Share your moment</h3>
              <p className="text-xs text-slate-400 mb-6 max-w-[200px]">
                Upload photos of your favorite custom blends. Get featured in our gallery!
              </p>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                <Upload className="w-4 h-4 mr-2" /> Upload Photo
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#161618] border border-white/5 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Your Uploads</h3>
              <div className="grid grid-cols-2 gap-3">
                {myPhotos.map(photo => (
                  <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden bg-[#0A0A0B] border border-white/5 group">
                    <img src={photo.photoUrl} alt="Upload" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                       {photo.status === 'approved' && <Badge className="bg-green-500/20 text-green-400 border-none text-[8px] uppercase px-1.5 py-0">Approved</Badge>}
                       {photo.status === 'pending' && <Badge className="bg-orange-500/20 text-orange-400 border-none text-[8px] uppercase px-1.5 py-0">Pending</Badge>}
                       {photo.status === 'rejected' && <Badge className="bg-red-500/20 text-red-400 border-none text-[8px] uppercase px-1.5 py-0">Rejected</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
