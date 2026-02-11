import React, { useState } from 'react';
import { MapPin, MessageCircle, ShoppingBag, Award, X, CreditCard, CheckCircle } from 'lucide-react';

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
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
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

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckOut = () => setIsAddressModalOpen(true);

  const goToPayment = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.address) return alert("Please fill Name and Address!");
    setIsAddressModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // --- YE HAI MAIN FUNCTION JO DATA SHEET AUR WHATSAPP PAR BHEJEGA ---
  const finalOrderSubmit = async () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxIpJxvgD0P9N3kfatqCHa7E_l0DFZyOXk1AJO9o5RVbsWsZr_RC1NOZiV85V6SBnZNTg/exec';

    const orderData = {
      name: customerInfo.name,
      address: customerInfo.address,
      landmark: customerInfo.landmark,
      items: cart.map(i => `${i.name} x ${i.qty}`).join(", "),
      total: total
    };

    // 1. Google Sheet mein entry bhej raha hai
    try {
      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.log("Sheet Error:", err);
    }

    // 2. WhatsApp Message taiyar kar raha hai
    let msg = `*New Order - Rajendra Chole Bhature*%0A`;
    msg += `--------------------------%0A`;
    msg += `👤 *Name:* ${customerInfo.name}%0A`;
    msg += `📍 *Address:* ${customerInfo.address}%0A`;
    msg += `🏠 *Landmark:* ${customerInfo.landmark}%0A%0A`;
    msg += `*Order Items:*%0A`;
    cart.forEach(i => msg += `• ${i.name} x ${i.qty}%0A`);
    msg += `--------------------------%0A`;
    msg += `*Total: ₹${total}*%0A%0A`;
    msg += `_Payment has been done via QR code._`;
    
    window.open(`https://wa.me/919311293607?text=${msg}`, '_blank');
    
    // Reset sab kuch
    setIsPaymentModalOpen(false);
    setCart([]);
    alert("Order Successful! Opening WhatsApp...");
  };

  return (
    <div className="bg-white min-h-screen font-sans w-full overflow-x-hidden">
      {/* BANNER */}
      <div className="relative h-72 md:h-[500px] w-full bg-black">
        <img src="https://lh3.googleusercontent.com/d/1ds2DFk6T4exJehYoJ-qGq5XGoWjRlCH_" className="w-full h-full object-cover opacity-70" alt="Main" referrerPolicy="no-referrer" />
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

      {/* MENU */}
      <div className="w-full px-4 py-12 md:px-20 bg-slate-50">
        <h2 className="text-2xl md:text-5xl font-black text-gray-800 italic uppercase flex items-center gap-4 mb-12">
          Signature Menu <div className="h-1 flex-1 bg-gray-200"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-40">
          {MENU_DATA.map((item) => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 flex flex-col transition-transform hover:scale-[1.02]">
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
                  <button onClick={() => addToCart(item, 'full')} className="flex-[1.5] bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl text-center shadow-lg active:scale-95 transition-all">
                    <p className="text-[10px] font-bold opacity-80 uppercase">Full Plate</p>
                    <p className="text-lg font-black">₹{item.fullPrice}</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black italic uppercase text-gray-800 tracking-tighter">Delivery Details</h2>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 hover:text-black"><X size={24}/></button>
            </div>
            <form onSubmit={goToPayment} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6" 
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
              <textarea required rows="3" placeholder="Full Address" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6" 
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
              <input type="text" placeholder="Landmark" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6" 
                onChange={(e) => setCustomerInfo({...customerInfo, landmark: e.target.value})} />
              <button type="submit" className="w-full bg-orange-500 text-white py-5 rounded-3xl font-black italic uppercase text-lg">
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl text-center">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-orange-600 font-black italic uppercase">
                <CreditCard size={20} /> Payment QR
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-black"><X size={24}/></button>
            </div>
            <div className="bg-slate-50 p-6 rounded-[30px] border-2 border-dashed border-gray-200 mb-6">
              <img src="https://lh3.googleusercontent.com/d/1Mzn2s-4gkxYdbDWdKiMtbwZf-fKaZRly" className="w-64 h-64 mx-auto object-contain" alt="QR" referrerPolicy="no-referrer" />
              <p className="mt-4 font-black text-xl italic text-gray-800">Total: ₹{total}</p>
              <p className="text-gray-500 text-xs font-bold uppercase mt-1">UPI: 8287957144@ptsbi</p>
            </div>
            <p className="text-sm text-gray-500 mb-8 font-medium">Scan karke payment karein, phir niche click karein.</p>
            <button onClick={finalOrderSubmit} className="w-full bg-[#25D366] text-white py-5 rounded-3xl font-black italic uppercase text-lg flex items-center justify-center gap-3">
               Order on WhatsApp <MessageCircle size={24} />
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM CART BAR */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t p-6 z-50 flex justify-center shadow-2xl">
          <div className="w-full max-w-6xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Amount</p>
              <p className="text-3xl font-black italic text-gray-900">₹{total}</p>
            </div>
            <button onClick={handleCheckOut} className="bg-[#25D366] text-white px-10 py-5 rounded-3xl flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
              <span className="font-black italic text-xl uppercase">Confirm Order</span>
              <CheckCircle size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }
