<template>
  <v-app-bar height="70" elevation="0" color="#F14725">
    <div class="layout-nav">
      <!-- logo -->
      <div>
        <v-img src="/public/icon/smileIcon.png" height="60" width="60" />
      </div>
      <!-- button cart -->
      <div v-if="props.cartProduct">
        <v-btn height="50" rounded="xl" class="button-cart px-4 py-2" elevation="2" @click="goToCart">
          <div class="d-flex align-center">
            <v-badge :content="cart.TotalItems" color="red" floating>
              <v-icon color="black" size="20">mdi-cart</v-icon>
            </v-badge>
            <span class="ms-2 text-black font-weight-bold"> ฿{{ cart.TotalPrice.toFixed(2) }} </span>
          </div>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCart } from "@/stores/cart"
const cart = useCart()
const router = useRouter()

const cartCount = ref(10)

type propsModel = {
  cartProduct?: boolean
}

const props = withDefaults(defineProps<propsModel>(), {
  cartProduct: false,
})

const goToCart = () => {
  router.push("/home/cart")
}
</script>

<style scoped>
.button-cart {
  background-color: #fff;
}
.layout-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  flex: 1;
}
@media (max-width: 900px) {
  .layout-nav {
    padding-left: 25px;
    padding-right: 25px;
  }
}
@media (max-width: 400px) {
  .layout-nav {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
