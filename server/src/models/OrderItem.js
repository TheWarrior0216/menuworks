import { Schema } from "mongoose";

export const OrderItemsSchema = new Schema({
    orderId: { type: Schema.ObjectId, required: true },
    itemId: { type: Schema.ObjectId, required: true },
    quantity: { type: Number, required: true, default: 1, min: 1, max: 99 },
    specialInstructions: { type: String, maxLength: 250 }
}, { toJSON: { virtuals: true } })

OrderItemsSchema.virtual('item', {
    foreignField: '_id',
    ref: 'Item',
    localField: 'itemId',
    justOne: true
})