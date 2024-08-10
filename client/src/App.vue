<script setup>
import { computed, ref } from "vue";
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import FooterCard from "./components/FooterCard.vue";
import { restaurantsService } from "./services/RestaurantsService.js";
import Pop from "./utils/Pop.js";

const account = computed(() => AppState.account)


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

function createRestaurant(){
  try {
    restaurantsService.createRestaurant(editableRestaurantData.value)
  }
  catch (error){
    Pop.error(error);
  }
}
</script>
<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer v-if="!account?.isOwner" class="d-flex justify-content-center">
    <FooterCard />
  </footer>


  <div class="modal fade" @submit.prevent="createRestaurant()" id="createRestaurantModal" tabindex="-1" aria-labelledby="createRestaurantModal"
    aria-hidden="true">
    <form class="container-fluid">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Restaurant</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <section class="row">
              <div class="mb-3">
                <label for="name" class="form-label">Restaurant Name</label>
                <input v-model="editableRestaurantData.name" type="text" class="form-control" id="name" name="name">
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="editableRestaurantData.description" class="form-control"
                  placeholder="Add your restaurant's description here..." id="description"
                  name="description"></textarea>
              </div>
              <div class="mb-3">
                <label for="primaryPictureURL" class="form-label">Restaurant's Primary Picture</label>
                <input v-model="editableRestaurantData.primaryPictureURL" type="text" class="form-control"
                  id="primaryPictureURL" name="primaryPictureURL">
              </div>
              <div class="mb-3">
                <label for="breakfastPictureURL" class="form-label">Restaurant's Breakfast Picture</label>
                <input v-model="editableRestaurantData.breakfastPictureURL" type="text" class="form-control"
                  id="breakfastPictureURL" name="breakfastPictureURL">
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">Restaurant's Location</label>
                <input v-model="editableRestaurantData.location" type="text" class="form-control" id="location"
                  name="location">
              </div>
              <section class="col-md-12">
                <label for="hours" class="mb-2">Restaurant's Hours of Operation</label>
                <div class="row" v-for="businessDay in editableRestaurantData.hours" :key="businessDay.day">
                  <div class="col-md-4">
                    <input v-model="businessDay.isOpen" type="checkbox" class="form-check-input mx-1"
                      :id="businessDay.day" :name="businessDay.day">
                    <label class="form-check-label mx-1" for="hours">{{ businessDay.day }}</label>
                  </div>
                  <div class="col-md-8">
                    <input v-model="businessDay.open" type="time" :id=businessDay.day :name="businessDay.day" min="0:00"
                      max="23:59" /><span> - </span>
                    <input v-model="businessDay.closed" type="time" :id="businessDay.day" :name="businessDay.day"
                      min="0:00" max="23:59" />
                  </div>
                </div>
              </section>
              <!-- FIXME Allow for multiselect -->
              <div class="mb-3 mt-3">
                <label for="type" class="form-label">Restaurant Type</label>
                <select v-model="editableRestaurantData.type" class="form-select text-capitalize" name="type" id="type">
                  <option v-for="type in types" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="logoURL" class="form-label">Restaurant Logo</label>
                <input v-model="editableRestaurantData.logoURL" type="text" class="form-control" id="logo"
                  name="logoURL">
              </div>
              <div class="mb-3">
                <label for="primaryColor" class="form-label">Primary color</label>
                <input v-model="editableRestaurantData.primaryColor" type="color"
                  class="form-control form-control-color" id="exampleColorInput" value="#563d7c"
                  title="Choose your color" name="primaryColor">
              </div>
            </section>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Restaurant</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  height: 10dvh;
}
</style>
