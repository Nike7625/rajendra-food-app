import React, { useState } from 'react';
import { MapPin, MessageCircle, Award, Plus, Minus, Phone } from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: "Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://i.imgur.com/8QxQ9Wn.jpeg", tag: "Bestseller" },
  { id: 2, name: "Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://i.imgur.com/GzG7F0L.jpeg", tag: "Hot Seller" },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://i.imgur.com/mOa8DkG.jpeg", tag: "Must Try" },
  { id: 4, name: "Chole Samosa", fullPrice: 70, halfPrice: 40, img: "https://i.imgur.com/YqUoV8i.jpeg", tag: "Crunchy" },
  { id: 5, name: "Samosa (Chutney)", fullPrice: 34, halfPrice: 17, img: "https://i.imgur.com/uX8HOfI.jpeg", tag: "Quick Snack" },
  { id: 6, name: "Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://i.imgur.com/X4zWf9n.jpeg", tag: "Sweet" },
  { id: 7, name: "Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://i.imgur.com/8Yl6PAn.jpeg", tag: "Refreshing" }
];

export default function RajendraFinalApp() {
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
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
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
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto shadow-2xl pb-40 font-sans relative overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-60">
        <img src="https://i.imgur.com/8QxQ9Wn.jpeg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-5 text-white">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Rajendra Chole Bhature</h1>
          <div className="flex items-center gap-2 mt-1 opacity-90">
            <MapPin size={14} className="text-orange-500" />
            <p className="text-xs font-bold">Karampura, New Delhi - 110015</p>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="flex bg-white py-3 border-b text-center mb-4">
        <div className="flex-1 border-r border-gray-100">
          <p className="text-orange-600 font-black text-sm">4.8 ★</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Rating</p>
        </div>
        <div className="flex-1 border-r border-gray-100">
          <p className="text-orange-600 font-black text-sm">Veg</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">100% Pure</p>
        </div>
        <div className="flex-1">
          <p className="text-orange-600 font-black text-sm">Fast</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Delivery</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-6">
        <h2 className="text-xl font-black text-gray-800 italic uppercase flex items-center gap-2">
           Our Menu <div className="h-1 flex-1 bg-orange-100 rounded-full"></div>
        </h2>
        
        {MENU_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div className="flex gap-4 mb-4">
              <div className="relative">
                <img src={item.img} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt={item.name} />
                <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">
                  {item.tag}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 leading-tight">{item.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Fresh & Hot</p>
                <div className="flex gap-2 mt-4">
                  {item.halfPrice && (
                    <button onClick={() => addToCart(item.name, item.halfPrice, "Half", item.img)} className="flex-1 bg-gray-50 border border-gray-200 py-1.5 rounded-lg text-center active:scale-95 transition">
                      <p className="text-[8px] font-bold text-gray-400">HALF</p>
                      <p className="text-xs font-black text-gray-800">₹{item.halfPrice}</p>
                    </button>
                  )}
                  <button onClick={() => addToCart(item.name, item.fullPrice, "Full", item.img)} className="flex-1 bg-orange-500 text-white py-1.5 rounded-lg text-center shadow-lg shadow-orange-200 active:scale-95 transition">
                    <p className="text-[8px] font-bold opacity-80">FULL</p>
                    <p className="text-xs font-black">₹{item.fullPrice}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 p-4 shadow-2xl z-50 rounded-t-[32px]">
          <div className="flex items-center justify-between mb-4 px-2">
            <p className="font-black text-gray-800 uppercase tracking-tighter">Your Order Summary</p>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
              {cart.length} Items
            </span>
          </div>
          
          <div className="max-h-32 overflow-y-auto mb-4 space-y-3 px-2">
            {cart.map(item => (
              <div key={item.cartId} className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={item.img} className="w-8 h-8 rounded-md object-cover" />
                  <p className="font-bold text-xs text-gray-700">{item.name}</p>
                </div>
                <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                  <button onClick={() => updateCartQuantity(item.cartId, -1)} className="text-red-500"><Minus size={14}/></button>
                  <span className="text-xs font-black">{item.qty}</span>
                  <button onClick={() => updateCartQuantity(item.cartId, 1)} className="text-green-500"><Plus size={14}/></button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={sendWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-between px-6 shadow-xl shadow-green-100 active:scale-95 transition">
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-80">PAYABLE TOTAL</p>
              <p className="text-xl font-black tracking-tighter">₹{total}</p>
            </div>
            <div className="flex items-center gap-2 font-black italic">
              SEND ORDER <MessageCircle size={22} fill="white" className="text-[#25D366]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
      }
