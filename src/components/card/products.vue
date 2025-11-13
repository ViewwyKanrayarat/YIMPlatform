<template>
  <v-card @click="goToDetail" class="layout-card pa-5 d-flex flex-column h-100" color="back">
    <!-- รูปสินค้า -->
    <v-img :src="items?.image_url?.[0] || ''" class="img-resize" cover />

    <!-- SKU -->
    <div class="text-sku">SKU: {{ props.items.sku }}</div>

    <!-- ชื่อสินค้า -->
    <div class="text-name">{{ props.items.name }}</div>

    <!-- ราคา -->
    <div class="d-flex justify-space-between">
      <div>฿{{ props.items.price.toFixed(2) }} / EA</div>
      <v-btn class="button-add" prepend-icon="mdi-plus" @click.stop="addProductToCart(props.items)"> Add to cart </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Swal from 'sweetalert2'
import { useRouter } from "vue-router"
import type { CartModel } from "@/types/CartType"
import { useCart } from "@/stores/cart"
const cart = useCart()
const router = useRouter()

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

function goToDetail() {
  router.push(`home/detail/${props.items.sku}`)
}

function addProductToCart(items:CartModel) {
  cart.getProductsInCart(items)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Add to cart success',
    showConfirmButton: false,
    timer: 1500
  })
}
</script>

<style scoped>
@import "@/css/components/products.css";
</style>
