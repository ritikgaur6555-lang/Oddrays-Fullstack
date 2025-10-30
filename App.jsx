import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X, Heart } from 'lucide-react';

const themePink = '#C2185B';

export default function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error('Failed to load products, using fallback', err);
        setProducts([
          { id:1, title:'Aurora Headphones', price:2499, rating:4.6, img:'https://via.placeholder.com/360x240?text=Aurora' },
          { id:2, title:'Luxe Running Shoes', price:3499, rating:4.4, img:'https://via.placeholder.com/360x240?text=Shoes' }
        ]);
      });
  }, []);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty:1 }];
    });
  }

  function changeQty(id, delta) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/60 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" style={{ color: themePink }}>
              <div className="w-10 h-10 rounded-full shadow flex items-center justify-center text-white" style={{ background: themePink, fontWeight:700 }}>O</div>
              <div>
                <div className="font-bold text-lg">Oddrays</div>
                <div className="text-xs text-gray-600">Trend • Mart • Market</div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4">
            <div className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><Search size={16} /></div>
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search products, brands and more..."
                className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={()=>setShowCart(true)} className="relative px-3 py-2 rounded-full hover:bg-gray-100 flex items-center gap-2" aria-label="Open cart" title="Cart">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cart.length>0 && <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full" style={{ background: themePink, color:'#fff' }}>{cart.length}</span>}
            </button>
            <button className="px-3 py-2 rounded-full hover:bg-gray-100"><Heart size={18} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6" style={{ background: `linear-gradient(90deg, ${themePink} 0%, #FF4081 100%)` }}>
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold">Oddrays — shopping made delightful</h1>
            <p className="mt-2 opacity-90">Trendy picks, curated for you. Fast shipping • Easy returns • Secure payments</p>
            <div className="mt-4 flex gap-3">
              <button className="rounded-full bg-white px-4 py-2 font-semibold" style={{ color: themePink }}>Shop Trending</button>
              <button className="rounded-full border border-white/60 text-white px-4 py-2">View Collections</button>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-xl bg-white p-4 shadow-lg">
              <img src="https://via.placeholder.com/520x320?text=Oddrays+Featured" alt="featured" className="w-full rounded-md" />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Popular products</h2>
            <div className="text-sm text-gray-600">{filtered.length} results</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(product => (
              <motion.div key={product.id} layout whileHover={{ scale: 1.02 }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative">
                  <img src={product.img} alt="product" className="w-full h-44 object-cover" />
                  <div className="absolute top-3 right-3 backdrop-blur bg-white/30 rounded-full p-2">
                    <button className="p-1 rounded-full" aria-label="wishlist"><Heart size={16} /></button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm leading-tight">{product.title}</h3>
                    <div className="text-sm font-bold">₹{product.price}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Rating: {product.rating} ⭐</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={()=>setSelected(product)} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm">Details</button>
                    <button onClick={()=>addToCart(product)} className="flex-1 rounded-lg py-2 text-sm font-semibold" style={{ background: themePink, color:'#fff' }}>Add</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showCart && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-40">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: themePink }}>C</div>
                <div>
                  <div className="font-bold">Your Cart</div>
                  <div className="text-sm text-gray-500">{cart.length} item(s)</div>
                </div>
              </div>
              <div>
                <button onClick={()=>setShowCart(false)} className="p-2 rounded-full hover:bg-gray-100"><X size={18} /></button>
              </div>
            </div>

            <div className="p-4 h-[calc(100%-160px)] overflow-auto">
              {cart.length===0 ? (
                <div className="text-center text-gray-500 mt-12">Your cart is empty. Start adding awesome stuff!</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 mb-4">
                    <img src={item.img} alt="cart" className="w-16 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">₹{item.price}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={()=>changeQty(item.id, -1)} className="px-2 py-1 border rounded">-</button>
                        <div className="px-3 py-1 border rounded">{item.qty}</div>
                        <button onClick={()=>changeQty(item.id, 1)} className="px-2 py-1 border rounded">+</button>
                        <button onClick={()=>removeFromCart(item.id)} className="ml-3 text-sm text-red-600">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="font-bold">₹{total}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>alert('Proceed to checkout (demo)')} className="flex-1 rounded-lg py-2 font-semibold" style={{ background: themePink, color:'#fff' }}>Checkout</button>
                <button onClick={()=>setCart([])} className="rounded-lg py-2 px-3 border">Clear</button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale:0.95 }} animate={{ scale:1 }} exit={{ scale:0.95 }} className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex justify-between p-4 border-b">
                <div className="font-bold">{selected.title}</div>
                <button onClick={()=>setSelected(null)} className="p-2 rounded-full hover:bg-gray-100"><X size={18} /></button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={selected.img} alt="detail" className="w-full rounded-lg object-cover" />
                <div>
                  <div className="text-2xl font-bold">₹{selected.price}</div>
                  <div className="text-sm text-gray-500 mt-1">Rating: {selected.rating} ⭐</div>
                  <p className="mt-4 text-gray-700">This is a demo product card for Oddrays. Replace with real product details from your API. Use this modal to show variants, sizes, and customer reviews.</p>
                  <div className="mt-6 flex gap-3">
                    <button onClick={()=>{ addToCart(selected); setSelected(null); }} className="px-4 py-2 rounded-lg font-semibold" style={{ background: themePink, color:'#fff' }}>Add to cart</button>
                    <button onClick={()=>alert('Buy now (demo)')} className="px-4 py-2 rounded-lg border">Buy now</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Oddrays — built with ❤️ for trends. Dark pink & white theme.</div>
      </footer>
    </div>
  );
}
