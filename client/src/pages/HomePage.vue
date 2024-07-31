<script setup>
import { computed, onMounted } from 'vue';
import { restaurantsService } from '../services/RestaurantsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import Restaurants from '../components/Restaurants.vue';


const restaurants = computed(() => AppState.restaurants)

onMounted(() => {
  getAllRestaurants()
})


async function getAllRestaurants(){
  try {
    await restaurantsService.getAllRestaurants()
  }
  catch (error){
    Pop.error(error);
  }
}
</script>

<template>
  <!-- Landing Section -->
  <section class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center landing-card">
        <div class="text-center">
          <h1 class="landing-title">MenuWorks</h1>
          <h2 class="landing-subtitle">Mobile Ordering Made Easy</h2>
          <button class="btn btn-dark landing-button">Register</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Restaurant Section -->
  <section class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="spotlightRestaurant">
          <h2 class="spotlight-restaurant">Spotlight Restaurant</h2>
        </div>
        <div>
          <!-- Insert ActiveRestaurantCard component here -->
        </div>
      </div>
    </div>
  </section>

  <!-- All Restaurants -->
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="allRestaurant">
          <h2 class="all-restaurant text-center">All Local Restaurants</h2>
        </div>
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-4 ">
          <Restaurants :restaurant="restaurant"/>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">

.landing-card {
  padding-top: 5em;
  padding-bottom: 5em;
}

.landing-title {
  font-size: 56px;
  font-weight: 600;
}

.landing-subtitle {
  color: gray;
  font-size: 28px;
}

.landing-button {
  padding-left: 6em;
  padding-right: 6em;
  margin-top: 1em;
}

.featured-restaurant {
  font-size: 36px;
}

</style>
