<script setup>
import { Item } from '../models/Item.js';
import { Restaurant } from '../models/Restaurant.js';
import { itemsService } from '../services/ItemsService.js';


const props = defineProps({
    restaurantProp: { type: Restaurant, required: true },
    itemProp: { type: Item, required: true }
})

async function toggleAvailability(){
    const flip = {...props.itemProp, isAvailable: !props.itemProp.isAvailable}
    await itemsService.setActiveItem(flip)
    await itemsService.editItem(flip)

}

</script>

    <template>
        <div v-if="itemProp" class="card text-center mt-3 pb-1 shadow rounded borderFix">
                <p v-if="itemProp.isAvailable" class="fs-3">Available</p>
                <p v-else class="fs-3">Unavailable</p>
                <img :src="itemProp.picture" class="card-img-top" alt="...">
                <div class="card-body pb-0">
                    <p class="fs-4 card-title">{{ itemProp.name }}</p>
                </div>
                <button @click="toggleAvailability()" class="btn btn-dark mt-4 mb-1">Toggle Item Availability</button>
        </div>
    </template>



<style lang="scss" scoped>
.card-img-top {
    height: 25vh;
    object-fit: cover;
    object-position: center;
}</style>