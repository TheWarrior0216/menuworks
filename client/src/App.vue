<script setup>
import { computed } from "vue";
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

const account = computed(()=> AppState.account)

</script>
<template>
  <header v-if="!account?.isOwner" class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
<footer>
  <p>If you Own a Restaurant Click Here<span class="mdi mdi-arrow-right"></span></p>
</footer>
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
