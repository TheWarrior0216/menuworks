<script setup>
import { Item } from '../models/Item.js';
import { Order } from '../models/Order.js';
import { ordersService } from '../services/OrdersService.js';
import Pop from '../utils/Pop.js';

const props = defineProps({
    orderProp: { type: Order, required: true },
    itemsProp: { type: [], required: true}
})

async function completedOrder(orderId){
    try {
      await ordersService.completedOrder(orderId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function cancelOrder(orderId) {
    try {
      const wantsToCancel = await Pop.confirm('Are you sure you want to cancel this order?')
      if (!wantsToCancel) return
      await ordersService.cancelOrder(orderId)
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <div class="bg-light mb-2 p-3 mt-3">
        <h6>Order #{{ orderProp.id }}</h6>
        <p class="fs-2 fw-bold">{{ orderProp.profile.name }}</p>
        <div v-for="orderItem in orderProp.items" :key="orderItem.id">
<!-- FIXME show to quantity of an item instead of listing out the same item multiple times -->
            <li class="order-items">
                {{orderItem.quantity}}x {{ itemsProp.find((item)=> item.id == orderItem.itemId )?.name }}
            </li>
        </div>
        <div class="mt-4 text-center">
            <button @click="completedOrder(orderProp.id)" class="btn btn-success pending-order-buttons">Complete Order</button>
        </div>
        <div class="mt-3 text-center">
            <button @click="cancelOrder(orderProp.id)" class="btn btn-danger pending-order-buttons">Cancel Order</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

.order-items {
    color: #737373;
    font-size: small;
}

.pending-order-buttons {
    width: 15em;
}
</style>