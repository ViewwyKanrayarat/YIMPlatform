<template>
  <v-card class="layout-card pa-5 d-flex flex-column h-100" color="back">
    <!-- รูปสินค้า -->
    <v-img   :src="items?.image_url?.[0] || ''" height="150" cover />

    <!-- SKU -->
    <div>SKU: {{ props.items.sku }}</div>

    <!-- ชื่อสินค้า -->
    <div>{{ props.items.name }}</div>


    <!-- ราคา -->
    <div>฿{{ props.items.price.toFixed(2) }} / EA</div>

    <v-btn class="mt-2" color="orange" prepend-icon="mdi-plus"> Add to cart </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"

type propsModel = {
  items: {
    sku: number
    brand: string
    name: string
    pack_size: string
    image_url: string[]
    price: number
  }
}
const props = withDefaults(defineProps<propsModel>(), {
  items: () => ({
    return: {
      sku: 0,
      brand: "",
      name: "",
      pack_size: "",
      image_url: [],
      price: 0,
    },
  }),
})

console.log("items:", props.items)
</script>

<style scoped>
.layout-card {
  width: 100%;
}
</style>
