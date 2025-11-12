<template>
  <v-card @click="goToDetail" class="layout-card pa-5 d-flex flex-column h-100" color="back">
    <!-- รูปสินค้า -->
    <v-img :src="items?.image_url?.[0] || ''" class="img-resize" cover />

    <!-- SKU -->
    <div>SKU: {{ props.items.sku }}</div>

    <!-- ชื่อสินค้า -->
    <div>{{ props.items.name }}</div>

    <!-- ราคา -->
    <div>฿{{ props.items.price.toFixed(2) }} / EA</div>

    <v-btn class="mt-2" color="orange" prepend-icon="mdi-plus" @click.stop="addProductToCart"> Add to cart </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
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

function addProductToCart() {
  console.log("addProductToCart",props.items)
  cart.getProductsInCart(props.items)
}
</script>

<style scoped>
.layout-card {
  width: 100%;
}

.img-resize {
  height: 250px;
}

@media (max-width: 850px) {
  .img-resize {
    height: 150px;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .img-resize {
    height: 250px;
    width: 100%;
  }
}
</style>
