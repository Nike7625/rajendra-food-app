import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Shield, ChevronRight, Phone, MessageCircle, Plus, Minus, ShoppingBag, X, Check } from 'lucide-react';

// Enhanced menu data with fallback images and descriptions
const MENU_DATA = [
  { 
    id: 1, 
    name: "Chole Bhature", 
    fullPrice: 110, 
    halfPrice: 60, 
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Bestseller",
    description: "Fluffy deep-fried bhature served with spicy chole masala",
    prepTime: "15 min",
    spiceLevel: "Medium",
    bestSeller: true
  },
  { 
    id: 2, 
    name: "Chole Kulche", 
    fullPrice: 80, 
    halfPrice: 45, 
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Hot Seller",
    description: "Soft kulcha bread with flavorful chole gravy",
    prepTime: "10 min",
    spiceLevel: "Mild",
    bestSeller: true
  },
  { 
    id: 3, 
    name: "Chole Chawal", 
    fullPrice: 110, 
    halfPrice: 60, 
    img: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Must Try",
    description: "Aromatic basmati rice with authentic chole curry",
    prepTime: "12 min",
    spiceLevel: "Medium",
    bestSeller: false
  },
  { 
    id: 4, 
    name: "Chole Samosa", 
    fullPrice: 70, 
    halfPrice: 40, 
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Crunchy",
    description: "Crispy samosas filled with spicy chole mixture",
    prepTime: "8 min",
    spiceLevel: "Mild",
    bestSeller: false
  },
  { 
    id: 5, 
    name: "Samosa (Chutney)", 
    fullPrice: 34, 
    halfPrice: 17, 
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Quick Snack",
    description: "Golden fried samosas with mint and tamarind chutney",
    prepTime: "5 min",
    spiceLevel: "Low",
    bestSeller: true
  },
  { 
    id: 6, 
    name: "Gulab Jamun", 
    fullPrice: 50, 
    halfPrice: 25, 
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Sweet",
    description: "Soft milk dumplings soaked in rose-scented sugar syrup",
    prepTime: "3 min",
    spiceLevel: "None",
    bestSeller: true
  },
  { 
    id: 7, 
    name: "Kulhad Lassi", 
    fullPrice: 60, 
    halfPrice: null, 
    img: "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    tag: "Refreshing",
    description: "Traditional yogurt drink served in clay cup",
    prepTime: "4 min",
    spiceLevel: "None",
    bestSeller: true
  }
];

// Fallback images in case Unsplash fails
const FALLBACK_IMAGES = [
  "https://cdn.pixabay.com/photo/2017/12/09/08/18/chole-bhature-3007541_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/30/20/53/indian-food-2459568_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/10/13/57/chole-2132833_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/20/20/28/samosa-732512_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/31/18/39/samosa-2192561_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/02/14/41/gulab-jamun-918824_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/16/15/03/lassi-2647793_1280.jpg"
];

export default function RajendraFinalApp() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [showCart, setShowCart] = useState(false);

  // Handle image loading errors
  const handleImageError = (itemId, index) => {
    setImagesLoaded(prev => ({ ...prev, [itemId]: false }));
  };

  const addToCart = (item, type) => {
    const price = type === 'half' ? item.halfPrice : item.fullPrice;
    const cartId = `${item.id}-${type}`;
    const name = `${item.name} (${type === 'half' ? 'Half' : 'Full'})`;
    
    setCart(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      if (exists) return prev.map(i => i.cartId === cartId ? {...i, qty: i.qty + 1} : i);
      return [...prev, { 
        cartId, 
        name, 
        price, 
        qty: 1, 
        img: item.img,
        itemName: item.name,
        type
      }];
    });
    
    setNotification({
      type: 'success',
      message: `${item.name} added to cart!`
    });
    
    setTimeout(() => setNotification(null), 3000);
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

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    setNotification({
      type: 'info',
      message: 'Item removed from cart'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const clearCart = () => {
    setCart([]);
    setNotification({
      type: 'info',
      message: 'Cart cleared successfully'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendWhatsApp = () => {
    let message = `*Order Details - Rajendra Chole Bhature*%0A%0A`;
    message += `Customer Details:%0A`;
    message += `Name: ________%0A`;
    message += `Address: ________%0A`;
    message += `Phone: ________%0A%0A`;
    message += `*Order Items:*%0A`;
    cart.forEach(item => {
      message += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;
    });
    message += `%0A*Subtotal: ₹${total}*%0A`;
    message += `*Delivery: Free*%0A`;
    message += `*Grand Total: ₹${total}*%0A%0A`;
    message += `_Please prepare my order!_`;
    window.open(`https://wa.me/919311293607?text=${encodeURIComponent(message)}`, '_blank');
  };

  const callRestaurant = () => {
    window.open('tel:+919311293607', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white font-sans">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
          <Check size={20} />
          <span className="font-bold">{notification.message}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white italic tracking-tight">Rajendra Chole Bhature</h1>
                <p className="text-amber-100 mt-2 text-lg">Since 1995 • Authentic Delhi Street Food</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400" size={20} />
                    <span className="text-white font-bold text-xl">4.8</span>
                  </div>
                  <p className="text-amber-100 text-xs">2,500+ Reviews</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <MapPin className="text-white" size={24} />
                  <div>
                    <h3 className="text-white font-bold">Location</h3>
                    <p className="text-amber-100 text-sm">Karampura, New Delhi - 110015</p>
                    <p className="text-amber-200 text-xs">Near Metro Station, Main Market</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <Clock className="text-white" size={24} />
                  <div>
                    <h3 className="text-white font-bold">Open Hours</h3>
                    <p className="text-amber-100 text-sm">7:00 AM - 11:00 PM</p>
                    <p className="text-amber-200 text-xs">7 days a week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <Shield className="text-white" size={24} />
                  <div>
                    <h3 className="text-white font-bold">Safety & Quality</h3>
                    <p className="text-amber-100 text-sm">100% Vegetarian • Hygienic</p>
                    <p className="text-amber-200 text-xs">FSSAI Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Special Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience the authentic taste of Delhi's legendary street food. Each dish is prepared with traditional recipes and finest ingredients.</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold">🔥 Hot & Fresh</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">🥡 Quick Delivery</span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold">🌶️ Authentic Spices</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_DATA.map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={imagesLoaded[item.id] === false ? FALLBACK_IMAGES[index] || item.img : item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(item.id, index)}
                    loading="lazy"
                  />
                </div>
                {item.bestSeller && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ BESTSELLER
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-gray-800 font-bold text-sm">{item.tag}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">₹{item.fullPrice}</p>
                    {item.halfPrice && (
                      <p className="text-sm text-gray-500">Half: ₹{item.halfPrice}</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">🌶️</span>
                    <span>{item.spiceLevel} Spice</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {item.halfPrice && (
                    <button 
                      onClick={() => addToCart(item, 'half')}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-3 rounded-xl text-center transition-all active:scale-95"
                    >
                      <p className="text-xs font-bold text-gray-600 mb-1">HALF PORTION</p>
                      <p className="text-base font-bold text-gray-800">₹{item.halfPrice}</p>
                    </button>
                  )}
                  <button 
                    onClick={() => addToCart(item, 'full')}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl text-center shadow-lg shadow-orange-200 transition-all active:scale-95"
                  >
                    <p className="text-xs font-bold mb-1 opacity-90">FULL PORTION</p>
                    <p className="text-base font-bold">₹{item.fullPrice}</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary - Always Visible if items in cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transform transition-transform duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag size={24} className="text-orange-600" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Your Order</h3>
                  <p className="text-sm text-gray-600">{cart.length} items • ₹{total}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCart(!showCart)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-bold flex items-center gap-2"
                >
                  {showCart ? 'Hide Details' : 'Show Details'}
                  <ChevronRight size={16} className={`transform transition-transform ${showCart ? 'rotate-90' : ''}`} />
                </button>
                <button 
                  onClick={sendWhatsApp}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle size={20} />
                  Order Now
                </button>
              </div>
            </div>

            {/* Expanded Cart Details */}
            {showCart && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">Order Summary</h4>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-16 h-16 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-bold text-gray-800">{item.itemName}</p>
                          <p className="text-sm text-gray-600">{item.type === 'half' ? 'Half' : 'Full'} Portion</p>
                          <p className="text-orange-600 font-bold mt-1">₹{item.price} each</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-white border rounded-xl px-3 py-2">
                          <button 
                            onClick={() => updateCartQuantity(item.cartId, -1)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="font-bold text-gray-800 w-6 text-center">{item.qty}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.cartId, 1)}
                            className="text-gray-500 hover:text-green-500 transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <p className="font-bold text-gray-800 w-20 text-right">₹{item.price * item.qty}</p>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
          
