<script setup>
import { computed, onMounted } from 'vue';
import { ordersService } from '../services/OrdersService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { itemsService } from '../services/ItemsService.js';
import PendingOrdersCard from '../components/PendingOrdersCard.vue';

const route = useRoute()

// TODO Consider using a query instead
const orders = computed(() => AppState.orders.filter(order => order.completed == false))
const items = computed(()=> AppState.items)

onMounted(() => {
    getItems()
    getPendingRestaurantOrders()
})

async function getPendingRestaurantOrders() {
    try {
        await ordersService.getRestaurantOrders(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }

}

async function getItems() {
    try {
        await itemsService.getAllItemsByRestaurantId(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }

}

</script>


<template>
    <section class="container">
        <div class="row">
            <div class="col-4" v-for="order in orders" :key="order.id">
                <PendingOrdersCard :orderProp="order" :itemsProp="items"/>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>