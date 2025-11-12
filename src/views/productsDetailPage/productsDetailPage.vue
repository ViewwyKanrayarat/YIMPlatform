<template>
  <verticalHeaderVue cartProduct />
  <ContentLayout>
    <div class="layout-content">
      <v-btn prepend-icon="mdi-arrow-left" @click="goToHome">Back</v-btn>
      <div class="detail-content">
        <!-- img product -->
        <div class="img-detail">hihi</div>
        <!-- detail product -->
        <div class="product-detail">
          <div class="title-detail">{{ items.name }}</div>
          <div class="price-detail">฿{{ items.price.toFixed(2) }} / EA</div>
          <div class="d-flex justify-space-between">
            <div>Product Detail</div>
            <v-btn class="mt-2" color="orange" prepend-icon="mdi-plus" @click="addProductToCart"> Add to cart </v-btn>
          </div>
          <div>SKU: {{ items.sku }}</div>
          <div>Brand: {{ items.brand }}</div>
          <div>Pack Size: {{ items.pack_size }}</div>
          <div class="pt-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ContentLayout from "@/layouts/content/ContentLayout.vue"
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue"
import { useRoute, useRouter } from "vue-router"
import type { CartModel } from "@/types/CartType"
import { useCart } from "@/stores/cart"
const cart = useCart()
import { useProducts } from "@/stores/products"
const products = useProducts()

const router = useRouter()
const route = useRoute()
const sku = route.params.sku

// state form
const items = ref<CartModel>({
  sku: 0,
  brand: "",
  name: "",
  pack_size: "",
  image_url: [],
  price: 0,
  amount: 0,
})

function addProductToCart() {
  console.log("DETAIL PAGE", items.value)
  cart.getProductsInCart(items.value)
}

function goToHome() {
  router.push("/")
}

async function init() {
  // console.log("ดูรายละเอียด SKU:", sku)
  await products.getProducts()
  await products.getProductById(sku)
  // console.log("product อันเดียว", products.ProductById)
  items.value = JSON.parse(JSON.stringify(products.ProductById))
  console.log("items", items.value)
}

init()
</script>

<style scoped>
.layout-content {
  height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: pink;
}

.detail-content {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}

.img-detail {
  width: 40%;
  background-color: red;
}

.product-detail {
  width: 60%;
  background-color: blue;
}

.title-detail {
  font-size: 40px;
  font-weight: bold;
}

.price-detail {
  font-size: 30px;
}
</style>
