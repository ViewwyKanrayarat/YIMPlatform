<template>
  <v-app-bar height="35" elevation="0" color="yellow">
    <div class="d-flex flex-column w-full h-full">
      <div class="text-center py-1 ">For free shipping on order over {{ formatNumber(announce.listItems?.config?.delivery_fee?.minimum_cart_amount ?? 0) }} and more discount use code {{ announce.listItems?.config?.promotion?.discount_code ?? '' }}</div>
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
  console.log('List',announce.listItems.config.delivery_fee.minimum_cart_amount);
}

init()
</script>
