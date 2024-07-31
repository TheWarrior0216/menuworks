<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { AppState } from '../AppState.js';


const restaurant = computed(() => AppState.activeRestaurant)

const route = useRoute()

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
    <h1>restaurant details page 😎</h1>
    <div class="container-fluid">
        <div class="row">

            <div class="col-12">
                <img class="img-fluid cover-img" :src="restaurant?.primaryPictureURL" alt="picture">
                <div>
                    <img class="logo" :src="restaurant?.logoURL" alt="logo">
                </div>
            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
.logo {
    // position: absolute;
    border-radius: 50%;
    height: 10vh;
    // top: 10%;
    // aspect-ratio: 1/1;
}

.cover-img {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>