import { Schema } from "mongoose";

export const OrderSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  restaurantId: { type: Schema.ObjectId, required: true, ref: 'Restaurant' },
  placed: { type: Boolean, required: true, default: false },
  completed: { type: Boolean, required: true, default: false },
  isCancelled: { type: Boolean, required: true, default: false },
},
  { timestamps: true, toJSON: { virtuals: true } })
OrderSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
OrderSchema.virtual('restaurant', {
  localField: 'restaurantId',
  foreignField: '_id',
  justOne: true,
  ref: 'Restaurant'
})
OrderSchema.virtual('orderItem', {
  localField: '_id',
  foreignField: 'orderId',
  ref: 'OrderItem'
})