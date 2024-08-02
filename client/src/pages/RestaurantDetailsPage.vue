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


const restaurant = computed(() => AppState.activeRestaurant)
const items = computed(() => AppState.items)
const activeItem = computed(() => AppState.activeItem)
const quantity = computed(() => AppState.quantity)
const account = computed(() => AppState.account)
const orderItems = computed(() => AppState.orderItems)

watch(account, () => ordersService.createOrder(route.params.restaurantId))

const specialInstructions = ref('')

const route = useRoute()

const timevalue = ref({ timeValue: 0 })

onMounted(() => {
    getRestaurant()
    if (account.value) {
        ordersService.createOrder(route.params.restaurantId)
    }
})

async function getRestaurant() {
    try {
        const id = await route.params.restaurantId
        await restaurantsService.getRestaurantsById(id)
        await itemsService.getItemsByRestaurantId(id)

    }
    catch (error) {
        Pop.error(error);
    }
}

function quantityIncrease() {
    itemsService.increase()
}

function quantityDecrease() {
    itemsService.decrease()
}

function createOrderItem() {
    orderItemsService.createOrderItem(quantity.value, AppState.activeItem.id, specialInstructions.value, AppState.activeItem)
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
        <div v-if="restaurant" class="container">
            <div class="row">
                <div class="col-12 bg-body mb-2">
                    <div class="d-md-flex align-items-center">
                        <h1 class="fw-bolder font-size text-md-start text-center">{{ restaurant?.name }}</h1>
                        <div v-for="hours in restaurant.hours" :key="hours.day"
                            class="px-2 pb-1 fs-3 text-md-start text-center">
                            <p v-if="hours.day == AppState.currentDay" class="m-0 p-0">{{ hours.open }} - {{ hours.close
                                }} • {{ restaurant.type }}
                            </p>
                        </div>
                    </div>
                    <h5 class="text-md-start text-center">{{ restaurant.location }}</h5>
                    <p class="text-md-start text-center">{{ restaurant.description }}</p>
                    <button @click="submitOrder()" class="btn btn-primary">Submit Order</button>
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#orderOffCanvas" aria-controls="orderOffCanvas">
                        View Order
                    </button>
                </div>
                <div v-for="item in items" :key="item.id" class="col-md-4 col-12 d-flex justify-content-center mb-2">
                    <ItemCard :itemProp="item" />
                </div>

            </div>
        </div>
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
                <div class="modal-footer">
                    <button v-if="quantity == 1" type="button" @click="quantityDecrease()" class="btn btn-secondary"
                        disabled>-</button>
                    <button v-else type="button" @click="quantityDecrease()" class="btn btn-secondary">-</button>
                    <p class="fs-3">{{ quantity }}</p>
                    <button v-if="quantity == 50" type="button" @click="quantityIncrease()" class="btn btn-secondary"
                        disabled>+</button>
                    <button v-else type="button" @click="quantityIncrease()" class="btn btn-secondary">+</button>
                    <button @click="createOrderItem()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Add to Cart <i
                            class="mdi mdi-cart-plus" ></i></button>
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
                <OrderItemCard :orderItemProp="orderItem"/>
            </div>
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
</style>