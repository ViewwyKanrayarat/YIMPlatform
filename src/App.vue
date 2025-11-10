<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
<style>
.v-overlay-container {
  font-family: 'Noto Sans Thai', sans-serif !important;
}
</style>
