import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { RestaurantSchema } from '../models/Restaurant.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Restaurant = mongoose.model('Restaurant', RestaurantSchema)
}

export const dbContext = new DbContext()
