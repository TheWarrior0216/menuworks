<script setup>
import { Item } from '../models/Item.js';
import { Order } from '../models/Order.js';

const props = defineProps({
    orderProp: { type: Order, required: true },
    itemsProp: { type: [], required: true}
})

</script>


<template>
    <div class="bg-light mb-2 p-3">
        <h5>Order #{{ orderProp.id }}</h5>
        <h3>{{ orderProp.profile.name }}</h3>
        <div v-for="orderItem in orderProp.items" :key="orderItem.id">
            {{orderItem.quantity}}x {{ itemsProp.find((item)=> item.id == orderItem.itemId ).name }}
        </div>
    </div>
</template>


<style lang="scss" scoped></style>