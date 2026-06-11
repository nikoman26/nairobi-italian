import { motion } from "motion/react";
import { Camera, Heart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_PHOTOS } from "../../data";

export function StorefrontGallery() {
  const approvedPhotos = MOCK_PHOTOS.filter(p => p.status === 'approved');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 mb-4 uppercase tracking-wider text-[10px]">
            Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Nairobi Moments</h1>
          <p className="text-slate-400">
            A curated collection of your favorite custom blends and dessert experiences. Share your photos to be featured.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {approvedPhotos.map((photo, i) => (
            <motion.div 
              key={photo.id}
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-[#161618] border border-white/5"
            >
              <img 
                src={photo.photoUrl} 
                alt={`Photo by ${photo.userName}`} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                     <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{photo.userName}</p>
                    {photo.productId === 'p1' && <p className="text-[#FF6B35] text-[10px] uppercase tracking-wider">Strawberry Mango Ice</p>}
                    {photo.productId === 'p2' && <p className="text-[#FF6B35] text-[10px] uppercase tracking-wider">Vanilla Gelato</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Add some dummy content to make the gallery look full for the prototype */}
           <motion.div className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-[#161618] border border-white/5 aspect-[3/4]">
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2664&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
           </motion.div>
           <motion.div className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-[#161618] border border-white/5 aspect-square">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2024&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
           </motion.div>
           <motion.div className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-[#161618] border border-white/5 aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2787&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
           </motion.div>
        </div>

      </div>
    </div>
  );
}
