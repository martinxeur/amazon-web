const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Item = require('./models/Item');
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

app.post('/add-item', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send({ success: true });
});

app.post('/place-order', async (req, res) => {
  const { user, item } = req.body;
  const order = new Order({
    user,
    item,
    status: 'en cours',
    deliveryTime: user.role === 'prime' ? '24h' : '72h'
  });
  await order.save();
  res.send({ success: true });
});

app.post('/update-order', async (req, res) => {
  const { id, status } = req.body;
  await Order.findByIdAndUpdate(id, { status });
  res.send({ success: true });
});

app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));
