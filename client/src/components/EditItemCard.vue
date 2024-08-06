<script setup>
import { Item } from '../models/Item.js';
import { Restaurant } from '../models/Restaurant.js';
import { itemsService } from '../services/ItemsService.js';


const props = defineProps({
    restaurantProp: { type: Restaurant, required: true },
    itemProp: { type: Item, required: true }
})

async function deleteItem(){
    await itemsService.deleteItem(props.itemProp.id)
}

function setActiveItem(){
    itemsService.setActiveItem(props.itemProp)
}

</script>

    <template>
        <div v-if="itemProp" class="card text-center mt-3 pb-1 shadow rounded borderFix">
            <div type='button' data-bs-toggle="modal" data-bs-target="#itemDetailsModal">
                <img :src="itemProp.picture" class="card-img-top" alt="...">
                <div class="card-body pb-0 ">
                    <h5 class="card-title">{{ itemProp.name }}</h5>
                    <p class="card-text">{{ itemProp.description }}</p>
                    <p class="card-text">$ {{ itemProp.price }}</p>
                </div>
                <button data-bs-toggle="modal" data-bs-target="#EditItemModal" @click="setActiveItem()" class="btn btn-dark w-75 my-3">Edit Item</button>
                <button @click="deleteItem()" class="btn btn-danger w-75">Delete Item</button>
            </div>
        </div>
    </template>



<style lang="scss" scoped>
.card-img-top {
    height: 30vh;
    object-fit: cover;
    object-position: center;
}</style>