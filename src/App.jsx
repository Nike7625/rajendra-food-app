import React, { useState } from 'react';
import { ShoppingCart, Star, MapPin, Phone, Clock, CheckCircle, MessageCircle, ChevronRight, Award } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: "Special Chole Bhature", price: 110, desc: "2 Fluffy Bhature + Signature Black Chole + Salad & Pickle", tag: "Bestseller", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400" },
  { id: 2, name: "Chole Kulche Plate", price: 80, desc: "Butter Toasted Kulcha served with Spicy Delhi Style Chole", tag: "Hot Seller", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
  { id: 3, name: "Chole Samosa (1 Plate)", price: 70, desc: "2 Crispy Samosas crushed and topped with Chole & Chutney", tag: "Must Try", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
  { id: 4, name: "Samosa with Chutney", price: 34, desc: "Classic Potato Samosa served with Tangy Chutneys", tag: "Quick Snack", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
  { id: 5, name: "Gulab Jamun (1 Plate)", price: 50, desc: "2 Soft Hot Khoya Gulab Jamun dipped in Sugar Syrup", tag: "Sweet", img: "https://images.unsplash.com/photo-1596450637824-3ea33989eb25?w=400" },
  { id: 6, name: "Special Kulhad Lassi", price: 60, desc: "Thick Creamy Sweet Lassi served in traditional Kulhad", tag: "Refreshing", img: "https://images.unsplash.com/photo-1543353071-087f9d5f27fb?w=400" }
];

export default function RajendraFoodApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...item, qty: 1}];
    });
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendWhatsApp = () => {
    let message = `*Order from Rajendra Website*%0A--------------------------%0A`;
    cart.forEach(item => {
      message += `• ${item.name} (x${item.qty}) - ₹${item.price * item.qty}%0A`;
    });
    message += `--------------------------%0A*Grand Total: ₹${total}*%0A%0A_Please confirm my order ASAP!_`;
    // Tumhara Number Update Kar Diya Hai:
    window.open(`https://wa.me/919311293607?text=${message}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen max-w-md mx-auto shadow-2xl font-sans pb-32">
      {/* Premium Header */}
      <div className="relative h-64 shadow-lg">
        <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800" className="w-full h-full object-cover" alt="Food Header" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1 mb-1">
            <Award size={12} className="text-orange-400" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Best in Karampura</span>
          </div>
          <h1 className="text-2xl font-black">Rajendra Chole Bhature</h1>
          <p className="text-xs opacity-80 flex items-center mt-1"><MapPin size={12} className="mr-1"/> New Delhi, 110015</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex bg-white py-3 border-b shadow-sm">
        <div className="flex-1 text-center border-r border-gray-100">
           <p className="text-orange-600 font-bold text-sm">4.8★</p>
           <p className="text-[9px] text-gray-400 uppercase">Rating</p>
        </div>
        <div className="flex-1 text-center border-r border-gray-100">
           <p className="text-orange-600 font-bold text-sm">100%</p>
           <p className="text-[9px] text-gray-400 uppercase">Pure Veg</p>
        </div>
        <div className="flex-1 text-center">
           <p className="text-orange-600 font-bold text-sm">₹80</p>
           <p className="text-[9px] text-gray-400 uppercase">Avg Cost</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-black text-gray-800 italic uppercase">Main Menu</h2>
        {MENU_ITEMS.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-2xl flex gap-3 border border-gray-100 shadow-sm relative">
            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
               <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                 <div className="w-2.5 h-2.5 border border-green-600 flex items-center justify-center"><div className="w-1 bg-green-600 h-1 rounded-full"></div></div>
                 <span className="text-[8px] font-bold text-orange-500 uppercase">{item.tag}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-black text-gray-900">₹{item.price}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-orange-500 text-white px-5 py-1.5 rounded-lg text-[11px] font-black shadow hover:scale-95 transition"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4">
          <button 
            onClick={sendWhatsApp}
            className="w-full bg-green-600 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center animate-bounce-in"
          >
            <div>
              <p className="text-[10px] font-bold text-green-100 uppercase">{cart.length} ITEMS SELECTED</p>
              <p className="text-lg font-black">₹{total} + Taxes</p>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
              ORDER ON WHATSAPP <MessageCircle size={20} fill="white" className="text-green-600" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

