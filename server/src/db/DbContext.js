import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RestaurantSchema } from '../models/Restaurant.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Restaurant = mongoose.model('Restaurant', RestaurantSchema)
}

export const dbContext = new DbContext()
