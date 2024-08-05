<script setup>
import { Account } from '../models/Account.js';
import { Item } from '../models/Item.js';
import { Order } from '../models/Order.js';
import { itemsService } from '../services/ItemsService.js';
import { orderItemsService } from '../services/OrderItemsService.js';



const props = defineProps({
    itemProp: { type: Item, required: true },
    accountProp: { type: Account, required: true },
    orderProp: { type: Order, required: true },
    restaurantColor: {required:true}
})

function setActiveItem() {
    itemsService.setActiveItem(props.itemProp)
}

function createOrderItem() {
    orderItemsService.createOrderItem(1, props.itemProp.id, '', props.itemProp)
}

</script>


<template>
    <div v-if="itemProp" class="card text-center pb-1 shadow rounded borderFix" :style="{borderColor: restaurantColor}">
        <div type='button' @click="setActiveItem()" data-bs-toggle="modal" data-bs-target="#itemDetailsModal">
            <img :src="itemProp.picture" class="card-img-top" alt="...">
            <div class="card-body pb-0">
                <h5 class="card-title">{{ itemProp.name }}</h5>
                <p class="card-text">{{ itemProp.description }}</p>
                <p class="card-text">$ {{ itemProp.price }}</p>
            </div>
        </div>
        <button v-if="accountProp && orderProp" @click="createOrderItem()" class="btn btn-primary m-3" :style="{backgroundColor: restaurantColor}">Add To Cart</button>
        <button v-else disabled @click="createOrderItem()" class="btn btn-primary m-3" :style="{backgroundColor: restaurantColor}">Add To Cart</button>
    </div>
</template>


<style lang="scss" scoped>
.card-img-top {
    height: 30vh;
    object-fit: cover;
    object-position: center;
}
.borderFix{
    border: 3px, dashed, blueviolet;
    width: 90%;
    margin-top: 2em ;
    object-position: center;
    object-fit: cover;

}
.buttonColor{
    color: restaurantColor;
}


</style>