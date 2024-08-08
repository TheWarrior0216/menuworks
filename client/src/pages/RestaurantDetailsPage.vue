<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { AppState } from '../AppState.js';
import { itemsService } from '../services/ItemsService.js';
import { ordersService } from '../services/OrdersService.js';
import { orderItemsService } from '../services/OrderItemsService.js';
import OrderItemCard from '../components/OrderItemCard.vue';
import axios from 'axios';
import { maps } from '../services/AxiosService.js';
import { logger } from '../utils/Logger.js';
import { mapsService } from '../services/MapsService.js';


const restaurant = computed(() => AppState.activeRestaurant)

const currentRestaurantHour = computed(() => {
    if (!AppState.activeRestaurant) return null

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const foundHour = AppState.activeRestaurant.hours.find(hour => hour.day == weekdays[new Date().getDay()])

    return foundHour
})

const items = computed(() => AppState.items)
const activeItem = computed(() => AppState.activeItem)
const quantity = computed(() => AppState.quantity)
const account = computed(() => AppState.account)
const orderItems = computed(() => AppState.orderItems)
const order = computed(() => AppState.activeOrder)
const total = computed(() => {
    let calcPrice = 0
    orderItems.value.forEach((orderItem) => {
        calcPrice += (orderItem.item.price * orderItem.quantity)
    })
    return calcPrice
})
const center = computed(() => AppState.center)

watch(account, () => ordersService.createOrder(route.params.restaurantId))

watch(restaurant, () => { if (account.value) { ordersService.createOrder(route.params.restaurantId); orderItemsService.clear() } })


const specialInstructions = ref('')
const route = useRoute()
const options = { disableDefaultUI: true }



onMounted(() => {
    getRestaurant()
    if (account.value) {
        ordersService.createOrder(route.params.restaurantId)
        clearOrderItems()
    }

})

function clearOrderItems() {
    orderItemsService.clear()
}

async function getRestaurant() {
    try {
        const id = await route.params.restaurantId
        await restaurantsService.getRestaurantById(id)
        await itemsService.getItemsByRestaurantId(id)
        getCoordinates(restaurant.value.location)
    }
    catch (error) {
        Pop.error(error);
    }
}

function quantityIncrease() {
    itemsService.increase()
}

async function getCoordinates(location) {
    try {
        await mapsService.getCoordinates(location)
    }
    catch (error) {
        Pop.error(error);
    }
}

function quantityDecrease() {
    itemsService.decrease()
}

function createOrderItem() {
    const newItem = orderItemsService.createOrderItem(quantity.value, AppState.activeItem.id, specialInstructions.value, AppState.activeItem)
    specialInstructions.value = ''
}

function submitOrder() {
    try {
        ordersService.submitOrder()
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <div v-if="restaurant">
        <div class="container-fluid">
            <div class="row cont-height">
                <div class="col-12 p-0 m-0 cover-img">
                    <img class="img-fluid cover-img" :src="restaurant.primaryPictureURL" alt="picture">
                    <img class="logo" :src="restaurant.logoURL" alt="logo">
                </div>
            </div>
        </div>

        <div v-if="restaurant" class="container-fluid ">
            <div class="row detail-fix">
                <div class="col-12 bg-body mb-2 rounded mt-5 shadow">

                    <div class="d-md-flex align-items-center">
                        <h1 class="fw-bolder font-size text-md-start text-center ms-3">{{ restaurant?.name }}</h1>
                        <!-- REVIEW Might want to have a line of text saying that the restaurant is closed if open and close hours are not listed. -->
                        <div v-if="currentRestaurantHour?.open && currentRestaurantHour?.close"
                            class="px-2 pb-1 fs-3 text-md-start text-center">
                            <p class="m-0 p-0">{{ currentRestaurantHour?.open }} - {{ currentRestaurantHour?.closed }} •
                                {{ restaurant.type }}
                            </p>
                        </div>
                    </div>
                    <h5 class="text-md-start text-center ms-3">{{ restaurant.location }}</h5>
                    <p class="text-md-start text-center ms-3">{{ restaurant.description }}</p>
                    <GMapMap v-if="center" :center="center" :zoom="16" map-type-id="terrain"
                        style="width: 100%; height: 35vh" :options=options>
                    </GMapMap>
                </div>

                <div v-for="item in items" :key="item.id" class="col-md-4 col-12 d-flex justify-content-center mb-2">
                    <ItemCard :itemProp="item" :accountProp="account" :orderProp="order"
                        :restaurantColor="restaurant.primaryColor" />
                </div>

            </div>
        </div>
        <RouterLink :to="{ name: 'Restaurant Management', params: { restaurantId: restaurant.id } }">
            <button class="btn btn-dark landing-button">Manage Restaurant</button>
        </RouterLink>
    </div>

    <div class="modal fade" id="itemDetailsModal" tabindex="-1" aria-labelledby="itemDetailsModal" aria-hidden="true">
        <div class="modal-dialog">
            <div v-if="activeItem" class="modal-content">
                <div class="modal-header justify-content-center">
                    <h1 class="modal-title fs-2 text-center" id="exampleModalLabel">{{ activeItem.name }}</h1>
                </div>
                <div class="modal-body">
                    <img :src="activeItem.picture" alt="" class="modal-pic rounded mb-1">
                    <p class="text-center fs-5">{{ activeItem.description }}</p>
                    <textarea v-model="specialInstructions" class="form-control" id="exampleFormControlTextarea1"
                        rows="5" maxlength="80" placeholder="Special Instructions"></textarea>
                </div>
                <div v-if="account && order" class="modal-footer">
                    <button v-if="quantity == 1" type="button" @click="quantityDecrease()" class="btn btn-secondary"
                        disabled>-</button>
                    <button v-else type="button" @click="quantityDecrease()" class="btn btn-secondary">-</button>
                    <p class="fs-3">{{ quantity }}</p>
                    <button v-if="quantity == 50" type="button" @click="quantityIncrease()" class="btn btn-secondary"
                        disabled>+</button>
                    <button v-else type="button" @click="quantityIncrease()" class="btn btn-secondary">+</button>
                    <button @click="createOrderItem()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Add
                        to Cart <i class="mdi mdi-cart-plus"></i></button>
                </div>
                <div v-else class="modal-footer">
                    <button disabled data-bs-dismiss="modal" type="button" class="btn btn-primary">Add
                        to Cart <i class="mdi mdi-cart-plus"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="orderOffCanvas" aria-labelledby="orderOffCanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="orderOffCanvasLabel">Your Cart</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div v-for="orderItem in orderItems" :key="orderItem.id">
                <OrderItemCard :orderItemProp="orderItem" />
            </div>
            <div class="d-flex justify-content-between">
                <h4>Total: ${{ total }}</h4>
                <button @click="submitOrder()" class="btn btn-primary">Submit Order</button>
            </div>
        </div>
    </div>

    <div class="price-footer bg-dark pos-abso sticky-bottom px-4">
        <div class="d-flex justify-content-end text-light align-items-center py-2">
            <h4 class="me-2">Total: ${{ total.toFixed(2) }}</h4>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#orderOffCanvas"
                aria-controls="orderOffCanvas">
                View Order
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.logo {
    margin-top: -30vh;
    border-radius: 50%;
    height: 20vh;
    margin-left: 2%;
    aspect-ratio: 1/1;
}

.fixed-position {
    position: fixed;
    top: 10%;
    left: 85%;
    z-index: 99999;
    border-color: black;
}

.cover-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.font-size {
    font-size: 4.2em;
}

.cont-height {
    height: 55vh;
}

.modal-pic {
    max-height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.detail-fix {
    margin-left: 10em;
    margin-right: 10em;
}

@media (max-width: 576px) {
    .detail-fix {
        margin-left: 0em;
        margin-right: 0em;
    }
}
</style>