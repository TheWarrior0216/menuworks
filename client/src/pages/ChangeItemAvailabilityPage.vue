<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import ToggleAvailabilityCard from '../components/ToggleAvailabilityCard.vue';




const restaurant = computed(() => AppState.activeRestaurant)
const items = computed(() => AppState.items)

</script>


<template>

    <div class="container">
        <div class="row">
            <div v-for="item in items" :key="item.id" class="col-4 my-1">
                <ToggleAvailabilityCard :restaurantProp="restaurant" :itemProp="item" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>