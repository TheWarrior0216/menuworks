<script setup>
import { Order } from '../models/Order.js';



const props = defineProps({
  orderProp: { type: Order, required: true}
})
</script>


<template>

<div class="card">
  <div class="card-body">
    <h6 class="card-title">{{ props.orderProp.restaurant }}</h6>
    <p class="name-on-order fs-3">{{ props.orderProp.profile }}</p>
    <!-- v-for through orderItems in order -->
    <ul class="card-subtitle mb-2 text-muted">Order Item x quantity</ul>

    <div>
        <button class="btn btn-dark px-3 mt-5">Mark As Complete</button>
        <button class="btn btn-dark px-3 my-2">Cancel Order</button>
    </div>
   
  </div>
</div>

</template>


<style lang="scss" scoped>

</style>