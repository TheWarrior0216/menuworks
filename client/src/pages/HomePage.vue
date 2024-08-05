<script setup>
import { computed, onMounted } from 'vue';
import { restaurantsService } from '../services/RestaurantsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import Restaurants from '../components/RestaurantCard.vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import SpotlightRestaurantCard from '../components/SpotlightRestaurantCard.vue';
import { RouterLink } from 'vue-router';

const spotlightRestaurant = computed(() => AppState.spotlightRestaurant)
const restaurants = computed(() => AppState.restaurants)

onMounted(() => {
  getAllRestaurants()
})


async function getAllRestaurants() {
  try {
    await restaurantsService.getAllRestaurants()
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <!-- Landing Section -->
  <section class="container-fluid landing-card rounded">
    <div class="row py-4 ">
      <div class="col-12 d-flex justify-content-start ">
        <div class="text-center">
          <h1 class="landing-title">
            <div class="d-flex flex-column align-items-center">
              <img alt="logo" src="/img/MenuWorks.png" />
            </div>
          </h1>
          <h2 class="landing-subtitle text-info">Mobile Ordering Made Easy</h2>
          <!-- FIXME fix the params to actually match the restaurant's id -->
          <RouterLink :to="{ name: 'Restaurant Management', params: { restaurantId: '66aa9cdcdf28b714b9f1a18d' } }">
            <button class="btn btn-dark landing-button">Manage Restaurant</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Spotlight Restaurant Restaurant Section -->
  <section class="container-fluid spotlightRestaurant">
    <div class="row">
      <div class="col-12">
        <div>
          <h2 class="spotlight-restaurant text-start pt-3 ps-4 fs-1">Restaurant of the Week</h2>
        </div>
        <div class="row" v-if="spotlightRestaurant">
          <SpotlightRestaurantCard />
        </div>
      </div>
    </div>
  </section>

  <!-- All Restaurants -->
  <section class="container-fluid allRestaurants">
    <div class="row">
      <div class="col-12">
        <div class=" py-3">
          <h2 class="all-restaurant text-center">All Local Restaurants</h2>
        </div>
      </div>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-4 col-12 ">
        <RestaurantCard :restaurant="restaurant" />
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
.landing-card {
  height: 50dvh;
  padding-top: 5em;
  padding-bottom: 5em;
  margin-left: 0;
  margin-right: 0;
  background-image: url(https://wallpapertag.com/wallpaper/full/4/d/7/317105-gorgerous-food-background-2990x1918-for-mobile-hd.jpg);
  background-size: cover;
  background-position: center;
}

.landing-title {
  margin-top: 1em;
  padding-right: 2em;
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

.spotlightRestaurant {
  background: rgb(213,231,230);
background: linear-gradient(0deg, rgba(213,231,230,1) 0%, rgba(228,228,228,1) 100%);
}
.allRestaurants{
  background-color: #d5e7e6;
}
</style>
