<script setup>
import { Item } from '../models/Item.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';

const props = defineProps({
    orderProp: { type: Order, required: true },
    itemsProp: { type: [], required: true }
})

</script>


<template>
    <div class="bg-light mb-2 p-3">
        <h5>Order #{{ orderProp.id }}</h5>
        <h3>{{ orderProp.profile.name }}</h3>
        <div v-for="orderItem in orderProp.items" :key="orderItem.id">
            {{ orderItem.quantity }}x {{ itemsProp.find((item) => item.id == orderItem.itemId).name }}
        </div>
        <!-- FIXME figure out why canceled doesn't show on these dang nonButtons -->
        <p v-if="orderProp.isCancelled" class="bg-danger rounded border-primary text-center p-2 text-white mt-3 mb-0 ">Canceled</p>
        <p v-else-if="orderProp.placed" class="bg-primary rounded border-primary text-center p-2 text-white mt-3 mb-0 ">in Progress</p>
        <p v-else class="bg-success rounded border-primary text-center p-2 text-white mt-3 mb-0 ">Completed</p>
    </div>
</template>


<style lang="scss" scoped></style>