<script setup>
import { RouterLink } from 'vue-router';
import { Restaurant } from '../models/Restaurant.js';
import { getTransitionRawChildren } from 'vue';



defineProps({restaurant: Restaurant})
</script>


<template>
<RouterLink :to="{name:'Restaurant Details', params: {restaurantId: restaurant.id}}">
<div class="restaurant-card">
<img :src="restaurant.primaryPicture" class="card-img-top" :alt="restaurant.name">
    <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text"></p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

</RouterLink>
</template>


<style lang="scss" scoped>

</style>