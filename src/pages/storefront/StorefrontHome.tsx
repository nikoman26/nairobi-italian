import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "../../data";

export function StorefrontHome() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isPopular).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#0A0A0B]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=2687&auto=format&fit=crop" 
            alt="Delicious Italian Ice" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              The sweet taste of <span className="text-[#FF6B35] italic">Nairobi.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg">
              Premium Italian Ice, artisanal Gelato, and modern desserts crafted daily right in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B35] px-8 text-base font-semibold text-black transition-colors hover:bg-[#FF6B35]/80">
                Order Now
              </Link>
              <Link to="/catering" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10">
                Corporate Catering
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Signatures</h2>
              <p className="text-slate-500 mt-2">Our most loved creations right now.</p>
            </div>
            <Link to="/menu" className="flex items-center text-sm font-medium text-[#FF6B35] hover:text-[#FF6B35]/80 transition-colors">
              View Full Menu <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#161618] border border-white/5 relative mb-4">
                  <span className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold px-3 py-1 rounded-full text-white shadow-sm">
                    {product.category}
                  </span>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-white leading-tight mb-1">{product.name}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
                  </div>
                  <span className="font-medium text-white whitespace-nowrap ml-4">KES {product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Social / Proof section */}
      <section className="py-24 bg-[#161618] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 text-[#FF6B35]">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white mb-8 max-w-2xl mx-auto leading-snug">
            "The strawberry mango italian ice is the best thing I've had all year. Period."
          </h2>
          <p className="text-slate-500 font-medium tracking-widest text-xs uppercase">— Sarah M., Verified Customer</p>
        </div>
      </section>
    </div>
  );
}
