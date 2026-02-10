import React, { useState } from 'react';
import { MapPin, Star, Clock, Shield, ChevronRight, Phone, MessageCircle, Plus, Minus, ShoppingBag, X, Check, Award } from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: "Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://i.imgur.com/8QxQ9Wn.jpeg", tag: "Bestseller", description: "Fluffy deep-fried bhature served with spicy chole masala" },
  { id: 2, name: "Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://i.imgur.com/GzG7F0L.jpeg", tag: "Hot Seller", description: "Soft makkhan kulcha bread with flavorful delhi chole" },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://i.imgur.com/mOa8DkG.jpeg", tag: "Must Try", description: "Aromatic basmati rice with authentic chole curry" },
  { id: 4, name: "Chole Samosa", fullPrice: 70, halfPrice: 40, img: "https://i.imgur.com/YqUoV8i.jpeg", tag: "Crunchy", description: "Crispy samosas crushed with spicy chole mixture" },
  { id: 5, name: "Samosa (Chutney)", fullPrice: 34, halfPrice: 17, img: "https://i.imgur.com/uX8HOfI.jpeg", tag: "Quick Snack", description: "Golden fried samosas with mint and tamarind chutney" },
  { id: 6, name: "Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://i.imgur.com/X4zWf9n.jpeg", tag: "Sweet", description: "Soft milk dumplings soaked in rose sugar syrup" },
  { id: 7, name: "Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://i.imgur.com/8Yl6PAn.jpeg", tag: "Refreshing", description: "Traditional sweet yogurt drink served in clay cup" }
];

export default function RajendraFinalApp() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item, type) => {
    const price = type === 'half' ? item.halfPrice : item.fullPrice;
    const cartId = `${item.id}-${type}`;
    const name = `${item.name} (${type === 'half' ? 'Half' : 'Full'})`;
    
    setCart(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      if (exists) return prev.map(i => i.cartId === cartId ? {...i, qty: i.qty + 1} : i);
      return [...prev, { cartId, name, price, qty: 1, img: item.img }];
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
    message += `--------------------------%0A*Total Bill: ₹${total}*%0A%0A_Please confirm order!_`;
    window.open(`https://wa.me/919311293607?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-40">
      {/* Header */}
      <div className="bg-orange-600 text-white p-6 rounded-b-[40px] shadow-lg">
        <h1 className="text-3xl font-black italic tracking-tighter">Rajendra Chole Bhature</h1>
        <p className="text-orange-100 text-xs flex items-center gap-1 mt-1"><MapPin size={12}/> Karampura, New Delhi</p>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-6 mt-4">
        {MENU_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <img src={item.img} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt={item.name} />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{item.tag}</span>
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-[10px] text-gray-400 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-3">
                  {item.halfPrice && (
                    <button onClick={() => addToCart(item, 'half')} className="flex-1 bg-gray-50 border py-2 rounded-xl text-xs font-bold text-gray-600 active:scale-95 transition">Half ₹{item.halfPrice}</button>
                  )}
                  <button onClick={() => addToCart(item, 'full')} className="flex-1 bg-orange-500 text-white py-2 rounded-xl text-xs font-bold active:scale-95 transition shadow-md shadow-orange-100">Full ₹{item.fullPrice}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Logic */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 z-50 rounded-t-[32px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <p className="font-black text-gray-800">YOUR ORDER ({cart.length})</p>
            <button onClick={() => setShowCart(!showCart)} className="text-orange-500 text-xs font-bold underline">{showCart ? 'Hide' : 'View Details'}</button>
          </div>

          {showCart && (
            <div className="max-h-40 overflow-y-auto mb-4 space-y-3 px-2">
              {cart.map(item => (
                <div key={item.cartId} className="flex justify-between items-center">
                  <p className="text-xs font-bold text-gray-600">{item.name} x{item.qty}</p>
                  <div className="flex gap-3">
                    <button onClick={() => updateCartQuantity(item.cartId, -1)} className="bg-gray-100 p-1 rounded"><Minus size={12}/></button>
                    <button onClick={() => updateCartQuantity(item.cartId, 1)} className="bg-gray-100 p-1 rounded"><Plus size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={sendWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex justify-between px-6 font-black items-center shadow-xl">
             <div className="text-left">
               <p className="text-[10px] opacity-80 uppercase">Payable Total</p>
               <p className="text-xl italic">₹{total}</p>
             </div>
             <div className="flex items-center gap-2">ORDER ON WHATSAPP <MessageCircle size={24} fill="white" className="text-[#25D366]"/></div>
          </button>
        </div>
      )}
    </div>
  );
}
