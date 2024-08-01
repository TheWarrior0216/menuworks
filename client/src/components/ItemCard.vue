<script setup>
import { Item } from '../models/Item.js';


const props = defineProps({
    itemProp: { type: Item, required: true }
})


</script>


<template>
    <div v-if="itemProp" class="card text-center"  style="width: 18rem;">
        <img :src="itemProp.picture" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ itemProp.name }}</h5>
            <p class="card-text">{{ itemProp.description }}</p>
            <p class="card-text">$ {{ itemProp.price }}</p>
            <button class="btn btn-primary">Add To Cart</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card-img-top{
    height: 30vh;
    object-fit: cover;
    object-position: center;
}
</style>