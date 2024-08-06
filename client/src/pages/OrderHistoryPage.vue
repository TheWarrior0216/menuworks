<script setup>
import { computed, onMounted } from 'vue';
import { ordersService } from '../services/OrdersService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const route = useRoute()

const orders = computed(()=>AppState.orders)

onMounted(() => {
    getOrders()
})

async function getOrders() {
    try {
        await ordersService.getRestaurantOrders(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }

}

</script>


<template>

    <h1>This page will show all of the order history for the restaurant's online orders</h1>
    <h2>{{ orders }}</h2>

</template>


<style lang="scss" scoped></style>