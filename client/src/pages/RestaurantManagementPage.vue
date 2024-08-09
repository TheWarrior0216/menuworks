<script setup>
import { useRoute, useRouter } from 'vue-router';
import OrdersReceivedCard from '../components/OrdersReceivedCard.vue';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { ordersService } from '../services/OrdersService.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { logger } from '../utils/Logger.js';


const route = useRoute()
const router = useRouter()

const orders = computed(() => AppState.orders)

const restaurant = computed(() => AppState.activeRestaurant)




async function getRestaurantOrders() {
    try {
        await ordersService.getRestaurantOrders(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getRestaurant() {
    try {
        await restaurantsService.getRestaurantById(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function toggleRestaurantOpen() {
    try {
        const data = { isOpen: !restaurant.value.isOpen }
        logger.log(data)
        await restaurantsService.toggleRestaurantOpen(route.params.restaurantId, data)
    }
    catch (error) {
        Pop.error(error);
    }
}

onMounted(() => {
    getRestaurantOrders()
    getRestaurant()
})
</script>


<template>

    <!-- Header Section -->
    <section class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h1>{{ restaurant?.name }}</h1>
                <h3 v-if="restaurant?.isOpen">Your Restaurant Is Currently Open <i
                        class="mdi mdi-circle text-success"></i></h3>
                <h3 v-else>Your Restaurant Is Currently Closed <i class="mdi mdi-circle text-danger"></i></h3>
            </div>
        </div>
    </section>

    <section class="container-fluid">
        <div class="row">
            <div v-if="restaurant" class="col-md-2 d-flex flex-column justify-content-around options">

                <RouterLink :to="{ name: 'manage orders', params: { restaurantId: restaurant.id } }">
                    <button class="btn btn-dark w-100">Manage Orders</button>
                </RouterLink>

                <RouterLink :to="{ name: 'item availability', params: { restaurantId: restaurant.id } }">
                    <button class="btn btn-dark w-100">Change Item Availability</button>
                </RouterLink>

                <RouterLink :to="{ name: 'history', params: { restaurantId: restaurant.id } }">
                    <button class="btn btn-dark w-100">Order History</button>
                </RouterLink>

                <RouterLink :to="{ name: 'update info', params: { restaurantId: restaurant.id } }">
                    <button class="btn btn-dark w-100">Update Restaurant Info</button>
                </RouterLink>

                <button @click="toggleRestaurantOpen()" class="btn btn-dark w-100">Stop Accepting Orders</button>

                <RouterLink :to="{ name: 'edit menu', params: { restaurantId: restaurant.id } }">
                    <button class="btn btn-dark w-100">Edit Menu</button>
                </RouterLink>

            </div>
            <div class="col-md-10 active-view">
                <div class="row">
                    <router-view />
                    <!-- <div class="col-4" v-for="order in orders" :key="order.id"> -->
                    <!-- Insert OrdersReceivedCard Component Here -->
                    <!-- <OrdersReceivedCard :order="order"/> -->
                    <!-- {{ order }}
                    </div> -->
                </div>
            </div>
        </div>
    </section>

</template>


<style lang="scss" scoped>
.options {
    height: var(--main-height);
}

.active-view {
    background-color: #ececec;
}
</style>