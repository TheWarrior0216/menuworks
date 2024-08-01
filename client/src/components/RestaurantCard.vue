<script setup>
import { RouterLink } from 'vue-router';
import { Restaurant } from '../models/Restaurant.js';
import { AppState } from '../AppState.js';




defineProps({ restaurant: Restaurant })
</script>


<template>
    <RouterLink :to="{ name: 'Restaurant Details', params: { restaurantId: restaurant.id } }">
        <div class="restaurant-card mb-4">
            <img :src="restaurant.primaryPictureURL" class="card-img-top" :alt="restaurant.name">
            <div class="card-body p-1">
                <h5 class="card-title">{{ restaurant.name }}</h5>
                <p class="card-text mb-2">{{ restaurant.location }}</p>
                <div v-for="hours in restaurant.hours" :key="hours.day" >
                    <p v-if="hours.day == AppState.currentDay" class="m-0 p-0" >{{ hours.open }} - {{ hours.close }}</p>
                </div>
                <p>{{ restaurant.type }}</p>
            </div>
        </div>
    </RouterLink>
</template>


<style lang="scss" scoped>

.restaurant-card {
    background-color: #ffffff;
    color: black;
}

.card-img-top {
    height: 25vh;
    object-fit: cover;
    object-position: center;
}
</style>