<script setup>
import { useRoute } from 'vue-router';
import OrdersReceivedCard from '../components/OrdersReceivedCard.vue';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { ordersService } from '../services/OrdersService.js';


const route = useRoute()

const orders = computed(() => AppState.orders)




async function getRestaurantOrders() {
    try {
        await ordersService.getRestaurantOrders(route.params.restaurantId)
    }
    catch (error) {
        Pop.error(error);
    }
}

onMounted(() => {
    getRestaurantOrders()
})
</script>


<template>

    <!-- Header Section -->
    <section class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h1>Restaurant Name Here</h1>
                <h3>Your Restaurant Is Currently Open/Closed</h3>
            </div>
        </div>
    </section>

    <section class="container-fluid">
        <div class="row">
            <div class="col-md-2 d-flex flex-column justify-content-around options">

                <RouterLink :to="{ name: 'manage orders', params: { restaurantId: '66aa9cdcdf28b714b9f1a18d' } }">
                    <button class="btn btn-dark w-100">Manage Orders</button>
                </RouterLink>

                <button class="btn btn-dark">Change Item Availability</button>

                <RouterLink :to="{ name: 'history', params: { restaurantId: '66aa9cdcdf28b714b9f1a18d' } }">
                    <button class="btn btn-dark w-100">Order History</button>
                </RouterLink>

                <button class="btn btn-dark">Update Restaurant Info</button>

                <button class="btn btn-dark w-100">Stop Accepting Orders</button>

                <RouterLink :to="{ name: 'update info', params: { restaurantId: '66aa9cdcdf28b714b9f1a18d' } }">
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