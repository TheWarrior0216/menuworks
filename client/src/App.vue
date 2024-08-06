<script setup>
import { computed } from "vue";
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

const account = computed(()=> AppState.account)

</script>
<!-- FIXME add if they are an owner -->
<template>
  <header v-if="!account.isOwner" class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
