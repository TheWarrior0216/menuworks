<script setup>
import { ref } from "vue";
import { restaurantsService } from "../services/RestaurantsService.js";


const editableSearch = ref({
  search: ''
})

async function updateSearch() {
  restaurantsService.updateSearch(editableSearch.value.search)
}
</script>


<template>
  <form @submit.prevent="updateSearch()">
    <div class=" m-3 me-5">
      <span class="d-flex">
        <button type="submit" class="btn btn-primary mdi mdi-magnify"></button>
        <input v-model="editableSearch.search" type="text" class="form-control" id="Search Bar"
          placeholder="🔍Search for Restaurants">

      </span>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>