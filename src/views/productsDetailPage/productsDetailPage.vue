<template>
  <verticalHeaderVue cartProduct/>
  <ContentLayout>
    <div class="card-content">product page</div>
  </ContentLayout >
</template>

<script setup lang="ts">
import ContentLayout from "@/layouts/content/ContentLayout.vue";
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue";
</script>

<style scoped>
.card-content {
  height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: pink;
}
</style>