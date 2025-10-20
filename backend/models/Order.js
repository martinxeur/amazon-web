const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: Object,
  item: String,
  status: String,
  deliveryTime: String
});

module.exports = mongoose.model('Order', OrderSchema);
