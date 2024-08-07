<script setup>
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";


// async function setToOwner(){
//   try {
//     await accountService.setToOwner()
//   } catch (error) {
//     Pop.error(error)
//   }
// }

</script>


<template>
  <button style="color: darkturquoise;" class="text-center py-4 btn text-center">If you Own a Restaurant Click
    Here!</button>
  <!-- TODO add restraunmjiuzgyriu yg -->
  <div class="modal fade" id="createRestaurantModal" tabindex="1" aria-labelledby="createRestaurantModal"
    aria-hidden="true">
    <!-- <div class="modal-dialog">
      <div v-if="activeItem" class="modal-content">
        <div class="modal-header justify-content-center">
          <h1 class="modal-title fs-2 text-center" id="exampleModalLabel">{{ activeItem.name }}</h1>
        </div>
        <div class="modal-body">
          <img :src="activeItem.picture" alt="" class="modal-pic rounded mb-1">
          <p class="text-center fs-5">{{ activeItem.description }}</p>
          <textarea v-model="specialInstructions" class="form-control" id="exampleFormControlTextarea1" rows="5"
            maxlength="80" placeholder="Special Instructions"></textarea>
        </div>
        <div v-if="account && order" class="modal-footer">
          <button v-if="quantity == 1" type="button" @click="quantityDecrease()" class="btn btn-secondary"
            disabled>-</button>
          <button v-else type="button" @click="quantityDecrease()" class="btn btn-secondary">-</button>
          <p class="fs-3">{{ quantity }}</p>
          <button v-if="quantity == 50" type="button" @click="quantityIncrease()" class="btn btn-secondary"
            disabled>+</button>
          <button v-else type="button" @click="quantityIncrease()" class="btn btn-secondary">+</button>
          <button @click="createOrderItem()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Add
            to Cart <i class="mdi mdi-cart-plus"></i></button>
        </div>
        <div v-else class="modal-footer">
          <button disabled data-bs-dismiss="modal" type="button" class="btn btn-primary">Add
            to Cart <i class="mdi mdi-cart-plus"></i></button>
        </div>
      </div>
    </div> -->
  </div>
</template>


<style lang="scss" scoped></style>