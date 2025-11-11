<template>
  <v-app class="full-layout">
    <AnnounceHeader />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import AnnounceHeader from "@/layouts/full/verticalHeader/announceHeader.vue"
import Footer from "@/layouts/footer/footer.vue"
</script>

<style scoped>
.full-layout {
  display: flex;
  flex-direction: column;
}
</style>
