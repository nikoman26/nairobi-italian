import { motion } from "motion/react";
import { Check, X, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_PHOTOS } from "../../data";
import { useState } from "react";
import { UserPhoto } from "../../types";

export function AdminPhotos() {
  const [photos, setPhotos] = useState<UserPhoto[]>(MOCK_PHOTOS);

  const pendingPhotos = photos.filter(p => p.status === 'pending');
  const approvedPhotos = photos.filter(p => p.status === 'approved');

  const handleStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setPhotos(photos.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Community Gallery Moderation</h1>
        <p className="text-sm text-slate-500 mt-1">Review customer photo uploads before they appear in the public gallery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Review */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Needs Review ({pendingPhotos.length})</h2>
          
          {pendingPhotos.length === 0 && (
            <div className="bg-[#161618] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-500">
                <Check className="h-6 w-6" />
              </div>
              <p className="text-slate-400 font-medium">All caught up!</p>
              <p className="text-sm text-slate-500 mt-1">No new photos to review.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pendingPhotos.map(photo => (
              <Card key={photo.id} className="bg-[#161618] border-white/5 shadow-none overflow-hidden">
                <div className="aspect-[4/3] w-full bg-black relative">
                  <img src={photo.photoUrl} alt="Pending" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500/90 text-white uppercase text-[10px] shadow-sm">Pending</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-white">{photo.userName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Uploaded just now</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => handleStatus(photo.id, 'rejected')}
                    >
                      <X className="h-4 w-4 mr-2" /> Reject
                    </Button>
                    <Button 
                      className="bg-green-500 text-black hover:bg-green-600 font-medium"
                      onClick={() => handleStatus(photo.id, 'approved')}
                    >
                      <Check className="h-4 w-4 mr-2" /> Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Approved */}
        <div className="space-y-6">
           <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Recently Approved</h2>
           <Card className="bg-[#161618] border-white/5 shadow-none">
             <CardContent className="p-4 space-y-4">
                {approvedPhotos.slice(0, 4).map(photo => (
                  <div key={photo.id} className="flex gap-3 items-center group">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-[#0A0A0B] shrink-0 border border-white/5 group-hover:border-white/20 transition-colors">
                      <img src={photo.photoUrl} alt="Approved" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{photo.userName}</p>
                      <p className="text-[10px] text-green-400 uppercase tracking-wider mt-0.5">Live in Gallery</p>
                    </div>
                  </div>
                ))}
             </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
