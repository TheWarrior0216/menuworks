<script setup>

</script>


<template>

<!-- Header Section -->
<section class="container">
    <div class="row">
        <div class="col-12 d-flex justify-content-between">
            <h1>Restaurant Name Here</h1>
            <h3>Your Restaurant Is Currently Open/Closed</h3>
        </div>
    </div>
</section>

<section class="container">
    <div class="row">
        <div class="col-md-2 d-flex flex-column justify-content-around options">
                <button class="btn btn-dark">Manage Orders</button>
                <button class="btn btn-dark">Change Item Availability</button>
                <button class="btn btn-dark">Order History</button>
                <button class="btn btn-dark">Update Restaurant Info</button>
                <button class="btn btn-dark">Stop Accepting Orders</button>
                <button class="btn btn-dark">Edit Menu</button>
        </div>
        <div class="col-md-10">
            <div class="row">
                <div class="col-4">
                    <!-- Insert OrdersReceivedCard Component Here -->
                </div>
            </div>
        </div>
    </div>
</section>

</template>


<style lang="scss" scoped>

.options {
    height: var(--main-height);
}
</style>