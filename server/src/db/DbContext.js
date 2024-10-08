import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RestaurantSchema } from '../models/Restaurant.js';
import { ItemSchema } from "../models/Item.js";
import { OrderSchema } from "../models/Order.js";
import { OrderItemsSchema } from "../models/OrderItem.js";


class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Restaurant = mongoose.model('Restaurant', RestaurantSchema);
  Items = mongoose.model('Item', ItemSchema);

  Orders = mongoose.model('Order', OrderSchema);
  OrderItems = mongoose.model('OrderItem', OrderItemsSchema)

}

export const dbContext = new DbContext()
