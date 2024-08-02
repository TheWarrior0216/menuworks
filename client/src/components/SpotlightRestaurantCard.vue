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
            <div class="card-body d-block d-md-flex justify-content-center p-2">
                <h3 class="card-title">{{ restaurant.name }}</h3>
                <p class="card-text fs-5 px-md-3">{{ restaurant.location }}</p>
                <div v-for="hours in restaurant.hours" :key="hours.day" >
                    <p v-if="hours.day == AppState.currentDay" class="card-text m-0 p-0 fs-5 px-md-3" >{{ hours.open }} - {{ hours.close }}</p>
                </div>
                <p class="card-text fs-5 px-md-3 text-info fw-bold">{{ restaurant.type }}</p>
            </div>
        </div>
    </RouterLink>

</template>


<style lang="scss" scoped>

.spotlight-restaurant-card {
    background-color: white;
    padding-top: 1em;
    padding-left: 1em;
    padding-right: 1em;
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