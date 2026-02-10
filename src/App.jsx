import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, MapPin, Phone, Clock, CheckCircle, MessageCircle, ChevronRight, Share2, Award } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: "Special Paneer Chole Bhature", price: 110, desc: "2 Fluffy Bhature + Signature Black Chole + Paneer Stuffing", tag: "Bestseller" },
  { id: 2, name: "Amritsari Chole Kulche", price: 80, desc: "Butter Toasted Kulcha with Spicy Tangy Chole", tag: "Trending" },
  { id: 3, name: "Samosa Chole Chaat", price: 70, desc: "Crushed Samosas with Chole, Curd & Chutneys", tag: "Must Try" },
  { id: 4, name: "Hot Gulab Jamun", price: 50, desc: "Pure Desi Ghee Khoya Gulab Jamun (2 Pcs)", tag: "Sweet Tooth" },
  { id: 5, name: "Crispy Samosa (with Chutney)", price: 34, desc: "The Classic Indian Snack with Green & Red Chutney", tag: "Quick Bite" }
];

export default function GlobalStandardFoodApp() {
  const [cart, setCart] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...item, qty: 1}];
    });
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendWhatsApp = () => {
    let message = `*New Order from Website*%0A--------------------------%0A`;
    cart.forEach(item => {
      message += `• ${item.name} (x${item.qty}) - ₹${item.price * item.qty}%0A`;
    });
    message += `--------------------------%0A*Total: ₹${total}*%0A%0A_Please confirm my order!_`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, '_blank'); // Replace with Client's Number
  };

  return (
    <div className="bg-slate-50 min-h-screen max-w-md mx-auto shadow-2xl font-sans pb-32 overflow-x-hidden">
      {/* Premium Header */}
      <div className="relative h-72">
        <img src="https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800" className="w-full h-full object-cover" alt="Chole Bhature" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award size={10} /> TOP RATED IN DELHI
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Rajendra Chole Bhature</h1>
          <p className="text-gray-300 text-sm flex items-center mt-1"><MapPin size={14} className="mr-1 text-orange-400"/> Karampura, New Delhi - 110015</p>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="grid grid-cols-3 bg-white py-4 shadow-sm border-b">
        <div className="text-center border-r border-gray-100">
          <p className="text-orange-600 font-bold text-lg">4.8★</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Reviews</p>
        </div>
        <div className="text-center border-r border-gray-100">
          <p className="text-orange-600 font-bold text-lg">100%</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Veg</p>
        </div>
        <div className="text-center">
          <p className="text-orange-600 font-bold text-lg">25m</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Delivery</p>
        </div>
      </div>

      {/* Dynamic Menu */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight italic">Signature Menu</h2>
          <div className="h-1 flex-1 bg-orange-100 ml-4 rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="relative group bg-white p-4 rounded-2xl shadow-sm border border-gray-50 transition hover:shadow-md">
              <div className="flex justify-between">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 border-2 border-green-600 p-[1px] flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div></span>
                      {item.tag && <span className="text-[9px] font-black text-orange-600 uppercase tracking-tighter">{item.tag}</span>}
                   </div>
                   <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                   <p className="text-xs text-gray-400 mt-1 mb-3 pr-4">{item.desc}</p>
                   <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.2)}</span>
                   </div>
                </div>
                <div className="relative">
                   <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                      <img src={`https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200`} alt="food" className="w-full h-full object-cover" />
                   </div>
                   <button 
                    onClick={() => addToCart(item)}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-green-600 font-black px-6 py-1.5 rounded-lg border border-gray-200 shadow-lg hover:bg-green-50 active:scale-90 transition text-sm"
                   >
                    ADD
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 left-4 right-4 animate-bounce-in">
          <button 
            onClick={sendWhatsApp}
            className="w-full bg-green-600 text-white p-5 rounded-2xl shadow-2xl flex justify-between items-center group overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col items-start">
              <span className="text-[10px] font-bold text-green-100 uppercase tracking-widest">{cart.length} Items Selected</span>
              <span className="text-xl font-black italic">₹{total} + Taxes</span>
            </div>
            <div className="relative z-10 flex items-center gap-2 font-black uppercase text-sm tracking-tighter">
              Order on WhatsApp <MessageCircle size={22} fill="white" className="text-green-600" />
            </div>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
        </div>
      )}
    </div>
  );
}
