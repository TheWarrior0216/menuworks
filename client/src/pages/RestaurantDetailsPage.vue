<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
onMounted(()=>
{
    getRestaurant()
})

function getRestaurant() {
    throw new Error('Function not implemented.');
}

</script>


<template>
    <h1>restaurant details page 😎</h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <img class="img-fluid"
                    src="https://images.unsplash.com/photo-1649082236294-94468ba45741?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="picture">
            </div>
            <img class="logo"
                src="https://marketplace.canva.com/EAE6qtOUX08/1/0/1600w/canva-good-kitchen-logo-design-with-chef-hat-symbol-8C8EhVwzkV8.jpg"
                alt="logo">
        </div>
    </div>
</template>


<style lang="scss" scoped>
.logo{
    border-radius: 50%;
    aspect-ratio: 1/1;
}
</style>