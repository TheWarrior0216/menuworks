<script setup>
import { OrderItem } from '../models/OrderItem.js';

const props = defineProps({
    orderItemProp: { type: OrderItem, required: true }
})

</script>


<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="orderItemProp.item.picture" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex flex-column justify-content-around ps-md-2 text-md-start text-center">

                    <h5 class="card-title">{{ orderItemProp.item.name }} x{{ orderItemProp.quantity }}</h5>
                    <p v-if="orderItemProp.specialInstructions!=''" class="m-0 p-0">{{ orderItemProp.specialInstructions }}</p>
                    <p class="card-text">{{ `$${orderItemProp.item.price * orderItemProp.quantity}` }}</p>

            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>