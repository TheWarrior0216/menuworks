<script setup>
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";


async function setToOwner(){
  try {
    await accountService.setToOwner()
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<template>
<button @click="setToOwner()" style="color: darkturquoise;" class="text-center py-4 btn text-center">If you Own a Restaurant Click Here!</button>
</template>


<style lang="scss" scoped>

</style>