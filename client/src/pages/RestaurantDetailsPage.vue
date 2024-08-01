<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { AppState } from '../AppState.js';
import { itemsService } from '../services/ItemsService.js';


const restaurant = computed(() => AppState.activeRestaurant)
const items = computed(() => AppState.items)

const route = useRoute()

const timevalue = ref({ timeValue: 0 })

onMounted(() => {
    getRestaurant()
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
                                }}
                            </p>
                        </div>
                    </div>
                    <h5 class="text-md-start text-center">{{ restaurant.location }}</h5>
                    <p class="text-md-start text-center">{{ restaurant.description }}</p>

                </div>
                <div v-for="item in items" :key="item.id" class="col-md-4 col-12 d-flex justify-content-center mb-2">
                    <ItemCard :itemProp="item" />
                </div>

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
</style>