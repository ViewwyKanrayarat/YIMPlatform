<template>
  <v-app-bar height="70" elevation="0" color="orange">
    <div class="d-flex justify-space-between align-center px-10" style="flex: 1">
      <div>Logo</div>
      <div v-if="props.cartProduct">
        <!-- <v-chip color="red" size="small" text="81" variant="flat"></v-chip>
        <v-btn class="text-none" size="large" color="#4f545c" prepend-icon="mdi-cart" variant="flat"> ฿0.00 </v-btn> -->
        <v-btn height="50"  rounded="xl" class="button-cart px-4 py-2" elevation="2" @click="goToCart">
          <div class="d-flex align-center">
            <v-badge :content="cartCount" color="red" floating>
              <v-icon color="black" size="20">mdi-cart</v-icon>
            </v-badge>
            <span class="ms-2 text-black font-weight-bold"> ฿0.00 </span>
          </div>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router";
const router = useRouter();

const cartCount = ref(10)
type propsModel = {
  cartProduct?: boolean
}
const props = withDefaults(defineProps<propsModel>(), {
  cartProduct: false,
})

const goToCart = () => {
  router.push("/home/cart");
};
</script>

<style scoped>
.button-cart{
  background-color: #fff;
}
</style>