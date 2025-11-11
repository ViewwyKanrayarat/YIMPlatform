<template>
  <v-app-bar height="35" elevation="0" color="yellow">
    <div class="d-flex flex-column w-full h-full">
      <div class="text-center py-1 ">For free shipping on order over 50,000 and more discount use code YIMPLATFORM</div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAnnounce } from "@/stores/announce"
const announce = useAnnounce()

function init() {
  announce.getAnnounce()
}

init()
</script>
