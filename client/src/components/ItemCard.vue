<script setup>
import { Item } from '../models/Item.js';
import { itemsService } from '../services/ItemsService.js';
import { orderItemsService } from '../services/OrderItem.js';


const props = defineProps({
    itemProp: { type: Item, required: true }
})

function setActiveItem(){
    itemsService.setActiveItem(props.itemProp)
}

function createOrderItem(){
    orderItemsService.createOrderItem(1, props.itemProp.id)
}

</script>


<template>
    <div v-if="itemProp" class="card text-center" style="width: 18rem;">
        <div type='button' @click="setActiveItem()" data-bs-toggle="modal" data-bs-target="#itemDetailsModal">
            <img :src="itemProp.picture" class="card-img-top" alt="...">
            <div class="card-body pb-0">
                <h5 class="card-title">{{ itemProp.name }}</h5>
                <p class="card-text">{{ itemProp.description }}</p>
                <p class="card-text">$ {{ itemProp.price }}</p>
            </div>
        </div>
        <button @click="createOrderItem()" class="btn btn-primary m-3">Add To Cart</button>
    </div>
</template>


<style lang="scss" scoped>
.card-img-top {
    height: 30vh;
    object-fit: cover;
    object-position: center;
}
</style>