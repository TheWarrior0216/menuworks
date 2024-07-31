import { Schema } from "mongoose";

export const ObjectSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  restaurantId: { type: Schema.ObjectId, required: true, ref: 'Restaurant' },
  placed: { type: Boolean, required: true, default: false },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, }
},
  { timestamps: true, toJSON: { virtuals: true } })
ObjectSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
ObjectSchema.virtual('restaurant', {
  localField: 'restaurantId',
  foreignField: '_id',
  justOne: true,
  ref: 'Restaurant'
})
ObjectSchema.virtual('items', {
  localField: '_id',
  foreignField: 'itemId',
  ref: 'Item'
})