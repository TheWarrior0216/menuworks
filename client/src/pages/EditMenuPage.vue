<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import { itemsService } from '../services/ItemsService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';

const restaurant = computed(() => AppState.activeRestaurant)
const items = computed(() => AppState.items)
const item = computed(() => AppState.activeItem)
const route = useRoute()


watch(item, () => editItemData.value = {
    name: item.value.name,
    picture: item.value.picture,
    price: item.value.price,
    description: item.value.description,
    restaurantId: route.params.restaurantId
})


const newItemData = ref({
    name: '',
    picture: '',
    price: 1,
    description: '',
    restaurantId: route.params.restaurantId
})

const editItemData = ref({
    name: '',
    picture: '',
    price: 1,
    description: '',
    restaurantId: route.params.restaurantId
})

onMounted(() => {
    getItems()
})

function getItems() {
    itemsService.getItemsByRestaurantId(route.params.restaurantId)
}

async function createItem() {
    try {
        await itemsService.createItem(newItemData.value)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function editItem() {
    try {
        await itemsService.editItem(editItemData.value)
        Modal.getOrCreateInstance('#EditItemModal').hide()
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <button class="btn btn-primary w-100 p-3" data-bs-toggle="modal" data-bs-target="#AddItemModal">
                    Add new item
                </button>
            </div>
            <div v-for="item in items" :key="item.id" class="col-4">
                <EditItemCard :restaurantProp="restaurant" :itemProp="item" />
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="AddItemModal" tabindex="-1" aria-labelledby="AddItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddItemModalLabel">New Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createItem()">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input v-model="newItemData.price" type="Number" class="form-control" step="any"
                                name="price" id="price" min="0" max="5000000">
                        </div>
                        <div class="mb-3">
                            <label for="imgURL" class="form-label">Image URL</label>
                            <input v-model="newItemData.picture" type="url" class="form-control" name="imgURL"
                                id="imgURL">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">name</label>
                            <input v-model="newItemData.name" type="String" class="form-control" id="name" name="name"
                                min="0" max="10000">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="newItemData.description" class="form-control" id="description"
                                name="description" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="EditItemModal" tabindex="-1" aria-labelledby="AddItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddItemModalLabel">Edit Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editItem()">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input v-model="editItemData.price" type="Number" class="form-control" step="any"
                                name="price" id="price" min="0" max="5000000">
                        </div>
                        <div class="mb-3">
                            <label for="imgURL" class="form-label">Image URL</label>
                            <input v-model="editItemData.picture" type="url" class="form-control" name="imgURL"
                                id="imgURL">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">name</label>
                            <input v-model="editItemData.name" type="String" class="form-control" id="name" name="name"
                                min="0" max="10000">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editItemData.description" class="form-control" id="description"
                                name="description" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>