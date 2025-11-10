<template>
  <v-app class="full-layout">
    <VerticalHeader />

    <v-main class="content-area">
       <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import VerticalHeader from "@/layouts/full/verticalHeader/verticalHeader.vue"
import Footer from "@/layouts/footer/footer.vue"
</script>

<style scoped>
.full-layout {
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}

.content-area {
  /* flex: 1 0 auto; */
}
</style>