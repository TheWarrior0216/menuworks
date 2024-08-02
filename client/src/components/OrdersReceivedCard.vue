<script setup>
import { computed } from 'vue';
import { Order } from '../models/Order.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { ordersService } from '../services/OrdersService.js';

const orderItems = computed(() => AppState.orderItems)

const props = defineProps({
  orderProp: { type: Order, required: true}
})

async function completedOrder(orderId){
  try {
    await ordersService.completedOrder(orderId)
  }
  catch (error){
    Pop.error(error);
}
}

</script>


<template>

<div class="card">
  <div class="card-body">
    <h6 class="card-title">{{ orderProp.id }}</h6>
    <p class="name-on-order fs-3">{{ orderProp.profile }}</p>
    <!-- v-for through orderItems in order -->
    <ul v-for="orderItem in orderItems" :key="orderItem.id" class="card-subtitle mb-2 text-muted">{{ orderItem.item }} x {{ orderItem.quantity }}</ul>

    <div>
        <button @click="completedOrder(orderProp.id)" class="btn btn-dark px-3 mt-5">Mark As Complete</button>
        <button class="btn btn-dark px-3 my-2">Cancel Order</button>
    </div>
   
  </div>
</div>

</template>


<style lang="scss" scoped>

</style>