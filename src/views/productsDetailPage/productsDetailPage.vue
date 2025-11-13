<template>
  <verticalHeaderVue cartProduct />
  <ContentLayout>
    <div class="layout-content">
      <v-btn prepend-icon="mdi-arrow-left" @click="goToHome">Back</v-btn>
      <div class="detail-content">
        <!-- img product -->
        <div v-if="items?.image_url?.length" class="img-detail">
          <!-- img top -->
          <div class="layout-img">
            <v-img :src="items.image_url[selectedIndex]" class="img-top" />
          </div>
          <!-- img bottom -->
          <div class="layout-img">
            <div class="img-bottom">
              <v-img
                v-for="(img, index) in items.image_url"
                :key="index"
                :src="img"
                class="img-bottom-detail"
                :class="{ active: index === selectedIndex }"
                @click="selectImage(index)"
              />
            </div>
          </div>
        </div>
        <v-skeleton-loader v-else type="image" class="img-detail" />
        <!-- detail product -->
        <div class="product-detail">
          <div class="title-detail">{{ items.name }}</div>
          <div class="price-detail">฿{{ items.price.toFixed(2) }} / EA</div>
          <div class="d-flex justify-space-between">
            <div>Product Detail</div>
            <v-btn class="mt-2" color="#F14725" prepend-icon="mdi-plus" @click="addProductToCart"> Add to cart </v-btn>
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
import { ref, watch } from "vue"
import Swal from 'sweetalert2'
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
const selectedIndex = ref(0)

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

// for select image
function selectImage(index: number) {
  selectedIndex.value = index
}

// รีเซ็ต items เป็นรูปแรก
watch(
  () => items.value.image_url,
  (list) => {
    if (list?.length) selectedIndex.value = 0
  },
  { immediate: true }
)

function addProductToCart() {
  cart.getProductsInCart(items.value)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Add to cart success',
    showConfirmButton: false,
    timer: 1500
  })
}

function goToHome() {
  router.push("/")
}

async function init() {
  await products.getProducts()
  await products.getProductById(sku)
  items.value = JSON.parse(JSON.stringify(products.ProductById))
}

init()
</script>

<style scoped>
.layout-content {
  height: 100%;
  margin: 25px;
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
}

.layout-img {
  display: flex;
  justify-content: center;
}

.img-top {
  width: auto;
  height: auto;
  max-width: 300px;
}

.img-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  gap: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.img-bottom-detail {
  width: auto;
  height: auto;
  max-width: 150px;
  cursor: pointer;
  outline: 1px solid transparent;
  transition: outline-color 0.2s ease;
}

.img-bottom-detail.active {
  outline-color: var(--v-theme-primary);
}

.product-detail {
  width: 60%;
}

.title-detail {
  font-size: 40px;
  font-weight: bold;
}

.price-detail {
  font-size: 30px;
}

@media (max-width: 900px) {
  .img-detail {
    width: 100%;
  }
  .product-detail {
    width: 100%;
  }
  .img-top {
    width: 100%;
    height: auto;
    max-width: 400px;
  }
}

@media (max-width: 400px) {
  .layout-content {
    margin: 5px;
  }
}
</style>
