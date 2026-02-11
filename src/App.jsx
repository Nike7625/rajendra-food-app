import React, { useState } from 'react';
import { MapPin, MessageCircle, Star, Plus, Minus, ShoppingBag, Clock, ShieldCheck, Award } from 'lucide-react';

// Sabhi links ko Direct Image format mein update kar diya gaya hai
const MENU_DATA = [
  { id: 1, name: "Special Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://lh3.googleusercontent.com/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_", tag: "Bestseller", desc: "Our legendary signature fluffy bhature with black chole." },
  { id: 2, name: "Amritsari Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://lh3.googleusercontent.com/d/1PfpPHH3N3t6_nMjl4KtK_93IH_r71DdQ", tag: "Hot Seller", desc: "Authentic Amritsari kulcha with butter & spicy chole." },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500", tag: "Comfort", desc: "Long-grain Basmati rice served with special gravy." },
  { id: 4, name: "Chole Samosa Chaat", fullPrice: 70, halfPrice: 40, img: "https://lh3.googleusercontent.com/d/1EK1VIBqAC2PfRxZLC4UlLPGx2eEiFp04", tag: "Must Try", desc: "Crispy samosas crushed & mixed with tangy chole." },
  { id: 5, name: "Crispy Samosa (Plain)", fullPrice: 34, halfPrice: 17, img: "https://lh3.googleusercontent.com/d/1uR4krs77HauohZteHAdGcaDOEGV_YZZ_", tag: "Quick Bite", desc: "Classic aloo samosa served with red & green chutney." },
  { id: 6, name: "Hot Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://lh3.googleusercontent.com/d/1RjniB7WJezoO3X8vR0ugl--N__Y1zvk5", tag: "Sweet", desc: "Hot, soft khoya gulab jamuns dipped in syrup." },
  { id: 7, name: "Special Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://lh3.googleusercontent.com/d/1dsHD3BnPZQqGyH8PadqoUbekeAqo1pdz", tag: "Refreshing", desc: "Thick creamy malai lassi served in traditional kulhad." }
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
    msg += `--------------------------%0A*Total: ₹${total}*%0A%0A_Confirm My Order!_`;
    window.open(`https://wa.me/919311293607?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen font-sans w-full">
      {/* FULL SCREEN BANNER - Tumhari Photo Ke Saath */}
      <div className="relative h-72 md:h-[500px] w-full bg-black">
        <img 
          src="https://lh3.googleusercontent.com/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_" 
          className="w-full h-full object-cover opacity-70" 
          alt="Main Banner" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-6 md:left-20 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-500 text-xs md:text-sm font-bold px-3 py-1 rounded-full uppercase flex items-center gap-2">
              <Award size={16} /> Best in Karampura since 1995
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Rajendra <br/> Chole Bhature</h1>
          <p className="text-gray-300 text-lg md:text-2xl flex items-center gap-2 mt-4"><MapPin size={24} className="text-orange-400" /> New Delhi - 110015</p>
        </div>
      </div>

      {/* FULL WIDTH MENU CONTAINER */}
      <div className="w-full px-4 py-12 md:px-20 bg-slate-50">
        <h2 className="text-2xl md:text-5xl font-black text-gray-800 italic uppercase flex items-center gap-4 mb-12">
          Signature Menu <div className="h-1 flex-1 bg-gray-200"></div>
        </h2>

        {/* GRID LAYOUT: Mobile 1, Tablet 2, Laptop 3-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-40">
          {MENU_DATA.map((item) => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col transition-transform hover:scale-[1.02]">
              <div className="relative h-56 w-full">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover" 
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Rajendra+Special"; }} 
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">100% Veg</div>
                {item.tag && <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">{item.tag}</div>}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{item.desc}</p>
                
                <div className="flex gap-3">
                  {item.halfPrice && (
                    <button onClick={() => addToCart(item, 'half')} className="flex-1 bg-gray-50 hover:bg-orange-50 text-orange-600 border border-gray-200 py-3 rounded-2xl text-center transition-colors">
                      <p className="text-[10px] font-bold opacity-60">HALF</p>
                      <p className="text-lg font-black">₹{item.halfPrice}</p>
                    </button>
                  )}
                  <button onClick={() => addToCart(item, 'full')} className="flex-[1.5] bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl text-center shadow-lg shadow-orange-100 transition-all active:scale-95">
                    <p className="text-[10px] font-bold opacity-80 uppercase">Full Plate</p>
                    <p className="text-lg font-black">₹{item.fullPrice}</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN STICKY CART BAR */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 z-50 flex justify-center">
          <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingBag className="text-orange-500" size={32} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">{cart.length}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</p>
                <p className="text-3xl font-black italic text-gray-900">₹{total}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="px-6 py-4 font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase text-sm">
                {isCartOpen ? 'Hide Items' : 'View Order'}
              </button>
              <button onClick={sendOrder} className="flex-1 md:flex-none bg-[#25D366] text-white px-10 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-green-100 hover:scale-105 transition-transform active:scale-95">
                <span className="font-black italic text-lg uppercase">Send Order via WhatsApp</span>
                <MessageCircle size={28} fill="white" className="text-[#25D366]" />
              </button>
            </div>
          </div>

          {/* Expanded Cart View */}
          {isCartOpen && (
            <div className="absolute bottom-[100%] left-0 right-0 bg-white border-t p-6 max-h-60 overflow-y-auto shadow-2xl px-6 md:px-20">
              <div className="max-w-6xl mx-auto space-y-4">
                {cart.map(i => (
                  <div key={i.cartId} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <p className="font-bold text-gray-700">{i.name}</p>
                    <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-1">
                      <button onClick={() => updateQty(i.cartId, -1)} className="text-red-500 font-bold"><Minus size={16}/></button>
                      <span className="font-black w-8 text-center">{i.qty}</span>
                      <button onClick={() => updateQty(i.cartId, 1)} className="text-green-500 font-bold"><Plus size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
