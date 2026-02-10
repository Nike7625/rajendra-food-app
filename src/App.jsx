import React, { useState } from 'react';
import { ShoppingCart, MapPin, MessageCircle, Award, Flame, Plus, Minus } from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: "Chole Bhature", fullPrice: 110, halfPrice: 60, fullDesc: "2 Fluffy Bhature + Signature Chole + Salad & Pickle", halfDesc: "1 Fluffy Bhatura + Signature Chole + Salad & Pickle", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_b0544a0e-a615-4654-a740-109ce1532431%2Fimage_b0544a0e-a615-4654-a740-109ce1532431.jpeg", tag: "Bestseller" },
  { id: 2, name: "Chole Kulche", fullPrice: 80, halfPrice: 45, fullDesc: "2 Butter Kulche + Spicy Delhi Style Chole + Salad", halfDesc: "1 Butter Kulcha + Spicy Delhi Style Chole + Salad", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_0375f102-140a-4876-9d3c-62b141e6ed7b%2Fimage_0375f102-140a-4876-9d3c-62b141e6ed7b.jpeg", tag: "Hot Seller" },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, fullDesc: "Full Plate Basmati Rice with Rich Punjabi Chole + Pickle", halfDesc: "Half Plate Basmati Rice with Rich Punjabi Chole + Pickle", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_8c724778-831e-4518-86d9-95e28a474026%2Fimage_8c724778-831e-4518-86d9-95e28a474026.jpeg", tag: "Comfort Food" },
  { id: 4, name: "Chole Samosa", fullPrice: 70, halfPrice: 40, fullDesc: "2 Samosas Crushed with Spicy Chole + Chutney & Onions", halfDesc: "1 Samosa Crushed with Spicy Chole + Chutney & Onions", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_e631ee73-df33-4f96-85c1-9e794931a29f%2Fimage_e631ee73-df33-4f96-85c1-9e794931a29f.jpeg", tag: "Street Special" },
  { id: 5, name: "Samosa (with Chutney)", fullPrice: 34, halfPrice: 17, fullDesc: "2 Crispy Potato Samosas with Mint & Tamarind Chutney", halfDesc: "1 Crispy Potato Samosa with Mint & Tamarind Chutney", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_5295c32d-20d4-42b7-8984-7a195b098198%2Fimage_5295c32d-20d4-42b7-8984-7a195b098198.jpeg", tag: "Quick Bite" },
  { id: 6, name: "Gulab Jamun", fullPrice: 50, halfPrice: 25, fullDesc: "2 Hot Khoya Gulab Jamun in Sweet Syrup", halfDesc: "1 Hot Khoya Gulab Jamun in Sweet Syrup", img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_503f56ce-74ff-4202-b2d9-e9327e573e04%2Fimage_503f56ce-74ff-4202-b2d9-e9327e573e04.jpeg", tag: "Sweet Treat" },
  { id: 7, name: "Kulhad Lassi", fullPrice: 60, halfPrice: null, fullDesc: "Creamy Sweet Punjabi Lassi served in traditional Kulhad", halfDesc: null, img: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision/generateContent?key=AIzaSyA88_8zS3-2mH4e91kE2z2m_2m_2m_2m_2m&alt=media&mime_type=image/jpeg&url=https%3A%2F%2Fstorage.googleapis.com%2Fgenerative-ai-production-cloud-storage%2Fvision%2Fimage_6b6771d9-813c-4469-8e50-2f9540b6e4e0%2Fimage_6b6771d9-813c-4469-8e50-2f9540b6e4e0.jpeg", tag: "Refreshing" }
];

export default function RajendraProfessionalApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (name, price, type, img) => {
    const cartId = `${name}-${type}`;
    setCart(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      if (exists) return prev.map(i => i.cartId === cartId ? {...i, qty: i.qty + 1} : i);
      return [...prev, { cartId, name: `${name} (${type})`, price, qty: 1, img }];
    });
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean); // Remove items with qty 0
    });
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendWhatsApp = () => {
    let message = `*Naya Order - Rajendra Chole Bhature*%0A--------------------------%0A`;
    cart.forEach(item => {
      message += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;
    });
    message += `--------------------------%0A*Grand Total: ₹${total}*%0A%0A_Please confirm my order!_`;
    window.open(`https://wa.me/919311293607?text=${message}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen max-w-md mx-auto shadow-2xl pb-32 font-sans relative">
      {/* Header */}
      <div className="relative h-56 shadow-xl">
        <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-5 text-white">
          <h1 className="text-3xl font-black italic">Rajendra Chole Bhature</h1>
          <p className="text-xs flex items-center gap-1 opacity-90"><MapPin size={12} /> Karampura, New Delhi</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-6">
        {MENU_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
            <div className="flex gap-4 mb-4 items-center">
              <img src={item.img} className="w-20 h-20 rounded-2xl object-cover" alt={item.name} />
              <div>
                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                <p className="text-[10px] text-slate-400">Pure Veg • Fresh Daily</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {item.halfPrice && (
                <div className="flex flex-col items-center p-2 rounded-xl border border-orange-100 bg-orange-50/30">
                  <span className="text-[10px] font-bold text-orange-600 uppercase">Half Plate</span>
                  <span className="font-black text-slate-900 mb-2">₹{item.halfPrice}</span>
                  <button onClick={() => addToCart(item.name, item.halfPrice, "Half", item.img)} className="bg-orange-500 text-white px-5 py-1.5 rounded-lg text-[11px] font-black shadow hover:scale-95 transition">
                    ADD
                  </button>
                </div>
              )}
              {item.fullPrice && (
                <div className="flex flex-col items-center p-2 rounded-xl border border-green-100 bg-green-50/30">
                  <span className="text-[10px] font-bold text-green-600 uppercase">Full Plate</span>
                  <span className="font-black text-slate-900 mb-2">₹{item.fullPrice}</span>
                  <button onClick={() => addToCart(item.name, item.fullPrice, "Full", item.img)} className="bg-green-600 text-white px-5 py-1.5 rounded-lg text-[11px] font-black shadow hover:scale-95 transition">
                    ADD
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Summary (When items are in cart) */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg p-4 z-50">
          <h3 className="font-bold text-slate-800 mb-3 text-lg">Your Order:</h3>
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
            {cart.map(item => (
              <div key={item.cartId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.img} className="w-10 h-10 rounded-lg object-cover" alt={item.name} />
                  <div>
                    <p className="font-bold text-sm text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">₹{item.price} per item</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border border-slate-200 rounded-md px-2 py-1">
                  <button onClick={() => updateCartQuantity(item.cartId, -1)} className="text-slate-600 hover:text-red-500"><Minus size={16} /></button>
                  <span className="font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateCartQuantity(item.cartId, 1)} className="text-slate-600 hover:text-green-500"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={sendWhatsApp}
            className="w-full bg-[#25D366] text-white p-4 rounded-xl shadow-lg flex justify-between items-center group relative overflow-hidden text-lg font-black"
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest">{cart.length} Items</p>
              <p className="text-2xl font-black">Total: ₹{total}</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 font-black text-base tracking-tighter">
              ORDER ON WHATSAPP <MessageCircle size={24} fill="white" className="text-[#25D366]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
