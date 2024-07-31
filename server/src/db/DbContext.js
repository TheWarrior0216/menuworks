import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RestaurantSchema } from '../models/Restaurant.js';
import { ItemSchema } from "../models/Item.js";
import { OrderSchema } from "../models/Object.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Restaurant = mongoose.model('Restaurant', RestaurantSchema);
  Items = mongoose.model('Item', ItemSchema);
  Orders = mongoose.model('Order', OrderSchema)
}

export const dbContext = new DbContext()
