<script setup>
import { RouterLink } from 'vue-router';
import { Restaurant } from '../models/Restaurant.js';
import { AppState } from '../AppState.js';
import { computed } from 'vue';



const restaurant = computed(() => AppState.spotlightRestaurant)
</script>


<template>
     <RouterLink :to="{ name: 'Restaurant Details', params: { restaurantId: restaurant.id } }">
        <div class="spotlight-restaurant-card col-12">
            <img :src="restaurant.primaryPictureURL" class="card-img-top img-fluid" :alt="restaurant.name">
            <div class="card-body d-flex justify-content-start p-2">
                <h3 class="card-title">{{ restaurant.name }}</h3>
                <p class="card-text mb-2 fs-5 px-3">{{ restaurant.location }}</p>
                <div v-for="hours in restaurant.hours" :key="hours.day" >
                    <p v-if="hours.day == AppState.currentDay" class="m-0 p-0 fs-5 px-3" >{{ hours.open }} - {{ hours.close }}</p>
                </div>
                <p class="fs-5 px-3">{{ restaurant.type }}</p>
            </div>
        </div>
    </RouterLink>

</template>


<style lang="scss" scoped>

.spotlight-restaurant-card {
    background-color: white;
    padding: 1em;
}

.card-img-top {
    height: 35vh;
    object-fit: cover;
    object-position: center;
}

.card-body {
    color: black;
}

</style>