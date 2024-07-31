<script setup>
import { RouterLink } from 'vue-router';
import { Restaurant } from '../models/Restaurant.js';




defineProps({restaurant: Restaurant})
</script>


<template>
<RouterLink :to="{name:'RestaurantDetails', params: {restaurantId: restaurant.id}}">
<div class="restaurant-card">
<img :src="restaurant.primaryPicture" class="card-img-top" :alt="restaurant.name">
    <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text">{{ restaurant.location }}</p>
        <p>{{ restaurant.hours }}</p>
    </div>
</div>
</RouterLink>
</template>


<style lang="scss" scoped>

</style>