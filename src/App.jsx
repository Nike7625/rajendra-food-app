import React, { useState } from 'react';
import { MapPin, MessageCircle, Star, Plus, Minus, ShoppingBag, Clock, ShieldCheck, Award, X, CreditCard } from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: "Special Chole Bhature", fullPrice: 110, halfPrice: 60, img: "https://lh3.googleusercontent.com/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_", tag: "Bestseller", desc: "Our legendary signature fluffy bhature with black chole." },
  { id: 2, name: "Amritsari Chole Kulche", fullPrice: 80, halfPrice: 45, img: "https://lh3.googleusercontent.com/d/1PfpPHH3N3t6_nMjl4KtK_93IH_r71DdQ", tag: "Hot Seller", desc: "Authentic Amritsari kulcha with butter & spicy chole." },
  { id: 3, name: "Chole Chawal", fullPrice: 110, halfPrice: 60, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500", tag: "Comfort", desc: "Long-grain Basmati rice served with special gravy." },
  { id: 4, name: "Chole Samosa Chaat", fullPrice: 70, halfPrice: 40, img: "https://lh3.googleusercontent.com/d/1b0DznOaRLtpdl7vGIxEnZ2eVx3726CoF", tag: "Must Try", desc: "Crispy samosas crushed & mixed with tangy chole." },
  { id: 5, name: "Crispy Samosa (Plain)", fullPrice: 34, halfPrice: 17, img: "https://lh3.googleusercontent.com/d/1uR4krs77HauohZteHAdGcaDOEGV_YZZ_", tag: "Quick Bite", desc: "Classic aloo samosa served with red & green chutney." },
  { id: 6, name: "Hot Gulab Jamun", fullPrice: 50, halfPrice: 25, img: "https://lh3.googleusercontent.com/d/1RjniB7WJezoO3X8vR0ugl--N__Y1zvk5", tag: "Sweet", desc: "Hot, soft khoya gulab jamuns dipped in syrup." },
  { id: 7, name: "Special Kulhad Lassi", fullPrice: 60, halfPrice: null, img: "https://lh3.googleusercontent.com/d/1dsHD3BnPZQqGyH8PadqoUbekeAqo1pdz", tag: "Refreshing", desc: "Thick creamy malai lassi served in traditional kulhad." }
];

export default function RajendraProfessionalWebsite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', address: '', landmark: '' });

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

  const finalOrderSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.address) return alert("Please fill your Name and Address!");

    let msg = `*New Order - Rajendra Chole Bhature*%0A`;
    msg += `--------------------------%0A`;
    msg += `*Customer Details:*%0A`;
    msg += `👤 Name: ${customerInfo.name}%0A`;
    msg += `📍 Address: ${customerInfo.address}%0A`;
    msg += `🏠 Landmark: ${customerInfo.landmark}%0A%0A`;
    msg += `*Order Items:*%0A`;
    cart.forEach(i => msg += `• ${i.name} x ${i.qty} = ₹${i.price * i.qty}%0A`);
    msg += `--------------------------%0A`;
    msg += `*Total Amount: ₹${total}*%0A%0A`;
    msg += `_Payment via QR Code / UPI._`;
    
    window.open(`https://wa.me/919311293607?text=${msg}`, '_blank');
    setIsAddressModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen font-sans w-full overflow-x-hidden">
      {/* BANNER SECTION */}
      <div className="relative h-72 md:h-[500px] w-full bg-black">
        <img src="https://lh3.googleusercontent.com/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_" className="w-full h-full object-cover opacity-70" alt="Main Banner" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-6 md:left-20 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-500 text-xs md:text-sm font-bold px-3 py-1 rounded-full uppercase flex items-center gap-2">
              <Award size={16} /> Best in Karampura since 1995
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Rajendra <br/> Chole Bhature</h1>
          <p className="text-gray-300 text-lg md:text-2xl flex items-center gap-2 mt-4"><MapPin size={24} className="text-orange-400" /> Karampura, New Delhi - 110015</p>
        </div>
      </div>

      {/* MENU SECTION */}
      <div className="w-full px-4 py-12 md:px-20 bg-slate-50">
        <h2 className="text-2xl md:text-5xl font-black text-gray-800 italic uppercase flex items-center gap-4 mb-12">
          Signature Menu <div className="h-1 flex-1 bg-gray-200"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {MENU_DATA.map((item) => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col transition-transform hover:scale-[1.02]">
              <div className="relative h-56 w-full">
                <img src={item.img} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Food"; }} />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">100% Veg</div>
                {item.tag && <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">{item.tag}</div>}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{item.desc}</p>
                <div className="flex gap-3 mt-auto">
                  {item.halfPrice && (
                    <button onClick={() => addToCart(item, 'half')} className="flex-1 bg-gray-50 hover:bg-orange-50 text-orange-600 border border-gray-200 py-3 rounded-2xl text-center">
                      <p className="text-[10px] font-bold opacity-60">HALF</p>
                      <p className="text-lg font-black">₹{item.halfPrice}</p>
                    </button>
                  )}
                  <button onClick={() => addToCart(item, 'full')} className="flex-[1.5] bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl text-center shadow-lg active:scale-95">
                    <p className="text-[10px] font-bold opacity-80 uppercase">Full Plate</p>
                    <p className="text-lg font-black">₹{item.fullPrice}</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAYMENT QR SECTION UPDATED */}
        <div className="max-w-xl mx-auto bg-white rounded-[40px] p-8 text-center shadow-2xl border border-orange-100 mb-40">
           <div className="flex items-center justify-center gap-2 mb-6 text-orange-600 font-black italic uppercase tracking-widest">
              <CreditCard size={24} /> Pay via QR Code
           </div>
           <div className="bg-gray-50 p-4 rounded-3xl inline-block mb-4 border-2 border-dashed border-gray-200">
              <img src="https://lh3.googleusercontent.com/d/1Mzn2s-4gkxYdbDWdKiMtbwZf-fKaZRly" className="w-48 h-48 md:w-64 md:h-64 object-contain" alt="Payment QR" referrerPolicy="no-referrer" />
           </div>
           <p className="text-gray-800 font-black text-xl mb-1 italic uppercase tracking-tighter">UPI ID: 8287957144@ptsbi</p>
           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Scan to Pay using any UPI App</p>
        </div>
      </div>

      {/* ADDRESS POPUP MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black italic uppercase text-gray-800 tracking-tighter">Delivery Details</h2>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24}/></button>
            </div>
            <form onSubmit={finalOrderSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                <input required type="text" placeholder="Enter Full Name" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500" 
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Delivery Address</label>
                <textarea required rows="3" placeholder="House No, Street, Area Name" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500" 
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Landmark (Optional)</label>
                <input type="text" placeholder="Near Hospital, School etc." className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500" 
                  onChange={(e) => setCustomerInfo({...customerInfo, landmark: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#25D366] text-white py-5 rounded-3xl font-black italic uppercase text-lg shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all">
                Complete Order on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CART BAR */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t p-6 z-50 flex justify-center">
          <div className="w-full max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-6 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
               <div className="relative">
                 <ShoppingBag className="text-orange-500" size={32} />
                 <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">{cart.length}</span>
               </div>
               <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</p>
                 <p className="text-3xl font-black italic text-gray-900 tracking-tighter">₹{total}</p>
               </div>
            </div>
            <button onClick={() => setIsAddressModalOpen(true)} className="bg-[#25D366] text-white px-10 py-5 rounded-3xl flex items-center gap-3 shadow-2xl shadow-green-100 hover:scale-105 active:scale-95 transition-all">
              <span className="font-black italic text-xl uppercase tracking-tighter">Check Out Now</span>
              <MessageCircle size={28} fill="white" className="text-[#25D366]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
