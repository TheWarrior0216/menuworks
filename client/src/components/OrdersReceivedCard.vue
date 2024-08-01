<script setup>


</script>


<template>

<div class="card">
  <div class="card-body">
    <h6 class="card-title">Order #123456</h6>
    <p class="name-on-order fs-3">Name On Order</p>
    <!-- v-for through orderItems in order -->
    <p class="card-subtitle mb-2 text-muted">Order Item x quantity</p>
    <div>
        <button class="btn btn-dark px-3 mt-5">Mark As Complete</button>
        <button class="btn btn-dark px-3 my-2">Cancel Order</button>
    </div>
   
  </div>
</div>

</template>


<style lang="scss" scoped>

</style>