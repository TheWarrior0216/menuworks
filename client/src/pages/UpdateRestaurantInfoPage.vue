<script setup>
import { computed, ref } from 'vue';
import { Restaurant } from '../models/Restaurant.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { restaurantsService } from '../services/RestaurantsService.js';
import { useRoute } from 'vue-router';

const route = useRoute()
const restaurant = computed(() => AppState.activeRestaurant)

const types = [
    "mexican",
    "indian",
    "italian",
    "american",
    "japanese",
    "thai",
    "french",
    "chinese",
    "greek",
    "brazilian",
    "spanish",
    "vietnamese",
    "korean",
    "african",
    "caribbean",
    "cuban",
    "barbeque",
    "other"
]

const editableRestaurantData = ref({
    name: '',
    description: '',
    primaryPictureURL: '',
    breakfastPictureURL: '',
    location: '', 
    hours: [
        {
            open: '',
            closed: '',
            day: 'Sunday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Monday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Tuesday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Wednesday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Thursday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Friday',
            isOpen: false
        },
        {
            open: '',
            closed: '',
            day: 'Saturday',
            isOpen: false
        },
    ],
    type: '',
    logoURL: '',
    primaryColor: '#000000',
})

// TODO create an updateRestaurantDetails function
async function updateRestaurantDetails(){
    try {
      await restaurantsService.updateRestaurantDetails(editableRestaurantData.value , route.params.restaurantId)
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
<form class="container-fluid" @submit.prevent="updateRestaurantDetails()">
    <section class="row">
        <div class="mb-3">
        <label for="name" class="form-label">Restaurant Name</label>
        <input v-model="editableRestaurantData.name" type="text" class="form-control" id="name" name="name">
        </div>
        <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="editableRestaurantData.description" class="form-control" placeholder="Add your restaurant's description here..." id="description" name="description"></textarea>
        </div>
        <div class="mb-3">
        <label for="primaryPictureURL" class="form-label">Restaurant's Primary Picture</label>
        <input v-model="editableRestaurantData.primaryPictureURL" type="text" class="form-control" id="primaryPictureURL" name="primaryPictureURL">
        </div>
        <div class="mb-3">
        <label for="breakfastPictureURL" class="form-label">Restaurant's Breakfast Picture</label>
        <input v-model="editableRestaurantData.breakfastPictureURL" type="text" class="form-control" id="breakfastPictureURL" name="breakfastPictureURL">
        </div>
        <div class="mb-3">
        <label for="location" class="form-label">Restaurant's Location</label>
        <input v-model="editableRestaurantData.location" type="text" class="form-control" id="location" name="location">
        </div>
        <section class="col-md-4">
            <label for="hours" class="mb-2">Restaurant's Hours of Operation</label>
            <div class="row" v-for="businessDay in editableRestaurantData.hours" :key="businessDay.day">
                <div class="col-md-4">
                    <input type="checkbox" class="form-check-input mx-1" :id="businessDay.day" :name="businessDay.day">
                    <label class="form-check-label mx-1" for="hours">{{ businessDay.day }}</label>
                </div>
                <div class="col-md-8">
                    <input v-model="businessDay.open" type="time" :id=businessDay.day :name="businessDay.day" min="0:00" max="23:59"/><span> - </span>
                    <input v-model="businessDay.closed" type="time" :id="businessDay.day" :name="businessDay.day" min="0:00" max="23:59"/>
                </div>
            </div>
            <!-- <div>
                <input type="checkbox" class="form-check-input" id="monday">
                <label class="form-check-label" for="hours">Monday</label>
                <input type="time" id="monday" name="monday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="monday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="tuesday">
                <label class="form-check-label" for="hours">Tuesday</label>
                <input type="time" id="tuesday" name="tuesday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="tuesday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="wednesday">
                <label class="form-check-label" for="hours">Wednesday</label>
                <input type="time" id="wednesday" name="wednesday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="wednesday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="thursday">
                <label class="form-check-label" for="hours">Thursday</label>
                <input type="time" id="thursday" name="thursday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="thursday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="friday">
                <label class="form-check-label" for="hours">Friday</label>
                <input type="time" id="friday" name="friday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="friday" min="0:00" max="23:59"/>
            </div>
            <div class="mb-3">
                <input type="checkbox" class="form-check-input" id="saturday">
                <label class="form-check-label" for="hours">Saturday</label>
                <input type="time" id="saturday" name="saturday" min="0:00" max="23:59"/><span> - </span>
                <input type="time" id="sunday" name="saturday" min="0:00" max="23:59"/>
            </div> -->
        </section>
        <!-- FIXME Allow for multiselect -->
        <div class="mb-3 mt-3">
            <label for="type" class="form-label">Restaurant Type</label>
            <select class="form-select text-capitalize" name="type" id="type">
                <option v-for="type in types" :key="type" :value="type">
                {{ type }}
                </option>
            </select>
        </div>
        <div class="mb-3">
        <label for="logoURL" class="form-label">Restaurant Logo</label>
        <input v-model="editableRestaurantData.logoURL" type="text" class="form-control" id="logo" name="logoURL">
        </div>
        <div class="mb-3">
            <label for="primaryColor" class="form-label" >Primary color</label>
            <input v-model="editableRestaurantData.primaryColor" type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color" name="primaryColor">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>    
    </section>
</form>

</template>


<style lang="scss" scoped>

</style>