<script setup>
import { computed, onMounted } from 'vue';
import { ordersService } from '../services/OrdersService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { itemsService } from '../services/ItemsService.js';

const route = useRoute()

const orders = computed(() => AppState.orders)
const items = computed(()=> AppState.items)

onMounted(() => {
    getItems()
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

async function getItems() {
    try {
        await itemsService.getItemsByRestaurantId(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }

}

</script>


<template>
    <div class="container">
        <div class="row">
            <div class="col-4" v-for="order in orders" :key="order.id">
                <OrderHistoryCard :orderProp="order" :itemsProp="items"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>