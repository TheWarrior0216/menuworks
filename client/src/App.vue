<script setup>
import { computed } from "vue";
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import FooterCard from "./components/FooterCard.vue";

const account = computed(() => AppState.account)


</script>
<template>
  <header v-if="!account?.isOwner" class="sticky-top">
    <Navbar />
  </header>
  <main>
    SETH I NEED OWNER PERMISSIONS ON THE GITHUB SO I CAN HOST THE SITE - porter
    <router-view />
  </main>
  <footer v-if="!account?.isOwner" class="d-flex justify-content-center">
    <FooterCard />
  </footer>

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
