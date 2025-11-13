<template>
  <v-app-bar
    elevation="0"
    color="yellow"
    density="comfortable"
    class="top-banner"
  >
    <div class="banner-text">
      For free shipping on order over
      {{ formatNumber(announce.List?.config?.delivery_fee?.minimum_cart_amount ?? 0) }}
      and more discount use code
      {{ announce.List?.config?.promotion?.discount_code ?? "" }}
    </div>
  </v-app-bar>
</template>


<script setup lang="ts">
import { useAnnounce } from "@/stores/announce"
const announce = useAnnounce()

// format number
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

async function init() {
  await announce.getAnnounce()
  
}

init()
</script>

<style scoped>
.top-banner {
  /* ให้สูงตามเนื้อหา ไม่บีบ */
  height: auto;
  min-height: 35px;
  display: flex;
  align-items: center;
}

/* ข้อความด้านใน */
.banner-text {
  width: 100%;
  text-align: center;
  padding: 4px 16px;
  /* font-size: 14px; */
  font-weight: bold;
  line-height: 1.3;
  white-space: normal;
  word-break: break-word;
}

/* มือถือจอเล็ก ≤ 600px */
@media (max-width: 600px) {
  .banner-text {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>

