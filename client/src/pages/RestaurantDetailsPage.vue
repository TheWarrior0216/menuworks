<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { AppState } from '../AppState.js';


const restaurant = computed(() => AppState.activeRestaurant)

const route = useRoute()

const timevalue = ref({ timeValue: 0 })

onMounted(() => {
    getRestaurant()
})

async function getRestaurant() {
    try {
        const id = await route.params.restaurantId
        restaurantsService.getRestaurantsById(id)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="container-fluid">
        <div v-if="restaurant" class="row">
            <div class="col-12 p-0">
                <img class="img-fluid cover-img" :src="restaurant.primaryPictureURL" alt="picture">
                <div>
                    <img class="logo" :src="restaurant.logoURL" alt="logo">
                </div>

            </div>
            <div class="col-12">
                <h1 class="fw-bolder font-size">{{ restaurant?.name }}</h1>
                <h5>{{ restaurant.description }}</h5>
                <div v-for="hours in restaurant.hours" :key="hours.day">
                    <p v-if="hours.day == AppState.currentDay" class="m-0 p-0">{{ hours.open }} - {{ hours.close }}</p>
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
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.font-size {
    font-size: 4.2em;
}
</style>