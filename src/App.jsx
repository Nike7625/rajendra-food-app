import React, { useState } from 'react';
import { MapPin, MessageCircle, Star, Plus, Minus, ShoppingBag, Clock, ShieldCheck, Award } from 'lucide-react';

// Maine tumhare Drive links ko Direct Image links mein convert kar diya hai
const MENU_DATA = [
  { id: 1, name: "Special Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://lh3.googleusercontent.com/u/0/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_=w1000", tag: "Bestseller", desc: "Fresh & fluffy bhature with our legendary spiced chole." },
  { id: 2, name: "Amritsari Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://lh3.googleusercontent.com/u/0/d/1PfpPHH3N3t6_nMjl4KtK_93IH_r71DdQ=w1000", tag: "Hot Seller", desc: "Butter-toasted kulche with Amritsari tangy chole." },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500", tag: "Classic", desc: "Premium Basmati rice served with rich, thick gravy." },
  { id: 4, name: "Chole Samosa Chaat", fullPrice: 70, halfPrice: 40, img: "https://lh3.googleusercontent.com/u/0/d/1EK1VIBqAC2PfRxZLC4UlLPGx2eEiFp04=w1000", tag: "Crunchy", desc: "Broken samosas topped with spicy chole and chutneys." },
  { id: 5, name: "Crispy Samosa (Plain)", fullPrice: 34, halfPrice: 17, img: "https://lh3.googleusercontent.com/u/0/d/1uR4krs77HauohZteHAdGcaDOEGV_YZZ_=w1000", tag: "Quick Bite", desc: "Our famous crispy potato samosas with tangy chutney." },
  { id: 6, name: "Hot Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://lh3.googleusercontent.com/u/0/d/1RjniB7WJezoO3X8vR0ugl--N__Y1zvk5=w1000", tag: "Sweet", desc: "Soft, melt-in-the-mouth khoya gulab jamuns in syrup." },
  { id: 7, name: "Special Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://lh3.googleusercontent.com/u/0/d/1dsHD3BnPZQqGyH8PadqoUbekeAqo1pdz=w1000", tag: "Refreshing", desc: "Creamy, thick malai lassi served in traditional kulhad." }
];

export default function RajendraProfessionalWebsite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item, type) => {
    const price = type === 'half' ? item.halfPrice : item.fullPrice;
    const cartId = `${item.id}-${type}`;
    const cartName = `${item.name} (${type === 'half' ? 'Half' : 'Full'})`;
    
    setCart(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      if (exists) return prev.map(i => i.cartId === cartId ? {...i, qty: i.qty + 1} : i);
      return [...prev, { cartId, name: cartName, price, qty: 1, img: item.img }];
    });
  };

  const updateQty = (cartId, delta) => {
    setCart(prev => prev.map(i => {
      if (i.cartId === cartId) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendOrder = () => {
    let msg = `*New Order - Rajendra Chole Bhature*%0A--------------------------%0A`;
    cart.forEach(i => msg += `• ${i.name} x ${i.qty} = ₹${i.price * i.qty}%0A`);
    msg += `--------------------------%0A*Total: ₹${total}*%0A%0A_Please confirm my order!_`;
    window.open(`https://wa.me/919311293607?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Wrapper for Desktop Centering */}
      <div className="max-w-4xl mx-auto shadow-2xl bg-white min-h-screen pb-40">
        
        {/* Responsive Header Banner */}
        <div className="relative h-64 md:h-80 bg-orange-600 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200" className="w-full h-full object-cover opacity-80" alt="Main Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white pr-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                <Award size={12} /> Best in Karampura
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Rajendra Chole Bhature</h1>
            <p className="text-gray-300 text-sm flex items-center gap-1 mt-1"><MapPin size={16} className="text-orange-400" /> Karampura, New Delhi - 110015</p>
          </div>
        </div>

        {/* Menu Section - Responsive Grid */}
        <div className="p-4 md:p-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-800 italic uppercase flex items-center gap-2 mb-8">
            Signature Menu <div className="h-0.5 flex-1 bg-gray-200"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MENU_DATA.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-100" 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Food"; }} 
                  />
                  <div className="absolute -top-2 -left-2 bg-green-600 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">100% Veg</div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-tight md:text-lg">{item.name}</h3>
                    {item.tag && <span className="text-[8px] md:text-[10px] font-bold text-orange-600 uppercase tracking-widest">{item.tag}</span>}
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 mb-4 line-clamp-2">{item.desc}</p>
                  
                  <div className="flex gap-2 mt-auto">
                    {item.halfPrice && (
                      <button onClick={() => addToCart(item, 'half')} className="flex-1 bg-orange-50 text-orange-600 border border-orange-100 py-2 rounded-xl text-center active:bg-orange-100">
                        <p className="text-[8px] font-bold">HALF</p>
                        <p className="text-xs font-black">₹{item.halfPrice}</p>
                      </button>
                    )}
                    <button onClick={() => addToCart(item, 'full')} className="flex-1 bg-orange-500 text-white py-2 rounded-xl text-center shadow-md active:bg-orange-600 transition-colors">
                      <p className="text-[8px] font-bold opacity-80">FULL</p>
                      <p className="text-xs font-black">₹{item.fullPrice}</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Checkout Bar */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 rounded-t-[30px] border-t border-gray-100">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                 <ShoppingBag className="text-orange-500" size={20} />
                 <span className="font-black text-gray-800 uppercase text-sm tracking-tighter">Your Bag ({cart.length} Items)</span>
              </div>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="text-orange-500 text-xs md:text-sm font-bold underline">
                {isCartOpen ? 'Close Order' : 'Review Items'}
              </button>
            </div>

            {isCartOpen && (
              <div className="max-h-48 overflow-y-auto mb-4 space-y-3 scrollbar-hide">
                {cart.map(i => (
                  <div key={i.cartId} className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
                    <p className="text-xs md:text-sm font-bold text-gray-700">{i.name}</p>
                    <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                      <button onClick={() => updateQty(i.cartId, -1)} className="text-red-500 p-1"><Minus size={14}/></button>
                      <span className="text-xs font-black">{i.qty}</span>
                      <button onClick={() => updateQty(i.cartId, 1)} className="text-green-500 p-1"><Plus size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={sendOrder} className="w-full bg-[#25D366] text-white py-4 md:py-5 rounded-2xl flex items-center justify-between px-6 shadow-xl transition-all active:scale-95 hover:bg-[#20bd5a]">
              <div className="text-left">
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-white">Final Total</p>
                <p className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">₹{total}</p>
              </div>
              <div className="flex items-center gap-2 font-black italic text-sm md:text-lg">
                WHATSAPP ORDER <MessageCircle size={28} fill="white" className="text-[#25D366]" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
