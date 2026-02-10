import React, { useState } from 'react';
import { MapPin, MessageCircle, Star, Plus, Minus, ShoppingBag, Clock, ShieldCheck, Award } from 'lucide-react';

// Sabhi products aur unke sahi rates
const MENU_DATA = [
  { id: 1, name: "Special Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500", tag: "Bestseller", desc: "Premium fluffy bhature with signature black chole." },
  { id: 2, name: "Amritsari Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500", tag: "Hot Seller", desc: "Butter toasted kulche served with spicy chole." },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500", tag: "Comfort Food", desc: "Long grain Basmati rice with rich Punjabi gravy." },
  { id: 4, name: "Chole Samosa Chaat", fullPrice: 70, halfPrice: 40, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500", tag: "Must Try", desc: "Crispy samosas crushed and topped with spicy chole." },
  { id: 5, name: "Crispy Samosa (Plain)", fullPrice: 34, halfPrice: 17, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400", tag: "Quick Bite", desc: "Classic potato samosa with green & red chutney." },
  { id: 6, name: "Hot Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500", tag: "Sweet", desc: "Pure Desi Ghee khoya gulab jamun (2 pcs full)." },
  { id: 7, name: "Special Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://images.unsplash.com/photo-1543353071-087f9d5f27fb?w=500", tag: "Refreshing", desc: "Thick creamy sweet lassi served in mitti kulhad." }
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
    <div className="bg-slate-50 min-h-screen max-w-md mx-auto shadow-2xl pb-32 font-sans overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative h-64 bg-orange-600">
        <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800" className="w-full h-full object-cover opacity-80" alt="Main Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
              <Award size={10} /> Best in Karampura
            </span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Rajendra Chole Bhature</h1>
          <p className="text-gray-300 text-xs flex items-center gap-1 mt-1"><MapPin size={14} className="text-orange-400" /> Karampura, New Delhi - 110015</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-6">
        <h2 className="text-xl font-black text-gray-800 italic uppercase flex items-center gap-2">
          Signature Menu <div className="h-0.5 flex-1 bg-gray-200"></div>
        </h2>

        {MENU_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 transition-transform active:scale-[0.98]">
            <div className="relative w-24 h-24 flex-shrink-0">
              <img src={item.img} className="w-full h-full object-cover rounded-2xl shadow-md" alt={item.name} />
              <div className="absolute -top-2 -left-2 bg-green-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">100% Veg</div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                {item.tag && <span className="text-[8px] font-bold text-orange-600 uppercase tracking-widest">{item.tag}</span>}
              </div>
              <p className="text-[10px] text-gray-400 mt-1 mb-3 line-clamp-1">{item.desc}</p>
              
              <div className="flex gap-2 mt-auto">
                {item.halfPrice && (
                  <button onClick={() => addToCart(item, 'half')} className="flex-1 bg-orange-50 text-orange-600 border border-orange-100 py-1.5 rounded-lg text-center active:bg-orange-100">
                    <p className="text-[8px] font-bold">HALF</p>
                    <p className="text-xs font-black">₹{item.halfPrice}</p>
                  </button>
                )}
                <button onClick={() => addToCart(item, 'full')} className="flex-1 bg-orange-500 text-white py-1.5 rounded-lg text-center shadow-md active:bg-orange-600">
                  <p className="text-[8px] font-bold opacity-80">FULL</p>
                  <p className="text-xs font-black">₹{item.fullPrice}</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 z-50 rounded-t-[30px]">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2" onClick={() => setIsCartOpen(!isCartOpen)}>
               <ShoppingBag className="text-orange-500" size={20} />
               <span className="font-black text-gray-800 uppercase text-sm tracking-tighter">Your Bag ({cart.length})</span>
            </div>
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="text-orange-500 text-xs font-bold underline">
              {isCartOpen ? 'Close' : 'View Items'}
            </button>
          </div>

          {isCartOpen && (
            <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
              {cart.map(i => (
                <div key={i.cartId} className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
                  <p className="text-xs font-bold text-gray-700">{i.name}</p>
                  <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                    <button onClick={() => updateQty(i.cartId, -1)} className="text-red-500"><Minus size={14}/></button>
                    <span className="text-xs font-black">{i.qty}</span>
                    <button onClick={() => updateQty(i.cartId, 1)} className="text-green-500"><Plus size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={sendOrder} className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-between px-6 shadow-xl shadow-green-100 transition-transform active:scale-95">
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-80">SUBTOTAL</p>
              <p className="text-2xl font-black italic tracking-tighter">₹{total}</p>
            </div>
            <div className="flex items-center gap-2 font-black italic text-sm">
              SEND ORDER <MessageCircle size={24} fill="white" className="text-[#25D366]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
