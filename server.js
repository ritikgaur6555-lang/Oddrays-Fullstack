const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const PRODUCTS = [
  { id:1, title:'Aurora Headphones', price:2499, rating:4.6, img:'https://via.placeholder.com/360x240?text=Aurora' },
  { id:2, title:'Luxe Running Shoes', price:3499, rating:4.4, img:'https://via.placeholder.com/360x240?text=Shoes' },
  { id:3, title:'Everyday Backpack', price:1299, rating:4.2, img:'https://via.placeholder.com/360x240?text=Backpack' },
  { id:4, title:'Smart Watch Pro', price:5999, rating:4.7, img:'https://via.placeholder.com/360x240?text=Watch' },
  { id:5, title:'Studio Mic X', price:3999, rating:4.5, img:'https://via.placeholder.com/360x240?text=Mic' },
  { id:6, title:'Compact Drone', price:8999, rating:4.3, img:'https://via.placeholder.com/360x240?text=Drone' }
];

app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

// simple health
app.get('/api/health', (req, res) => res.json({ ok:true, time: new Date() }));

app.listen(PORT, () => console.log('Oddrays API running on', PORT));
