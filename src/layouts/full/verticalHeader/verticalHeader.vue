<template>
  <v-app-bar height="60" elevation="0" color="orange">
    <div class="d-flex justify-space-between align-center px-10" style="flex: 1">
      <div>Logo</div>
      <div v-if="props.cartProduct">
        <!-- <v-chip color="red" size="small" text="81" variant="flat"></v-chip>
        <v-btn class="text-none" size="large" color="#4f545c" prepend-icon="mdi-cart" variant="flat"> ฿0.00 </v-btn> -->
      <v-btn color="white" rounded="xl" class="px-4 py-2" elevation="2">
    <div class="d-flex align-center">
      <v-badge
        :content="cartCount"
        color="red"
        floating
        offset-x="4"
        offset-y="4"
      >
        <v-icon color="black" size="28">mdi-cart</v-icon>
      </v-badge>

      <span class="ms-2 text-black font-weight-bold">
        ฿0.00
      </span>
    </div>
  </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue"

const cartCount = ref(0)
type propsModel = {
  cartProduct?: boolean
}
const props = withDefaults(defineProps<propsModel>(), {
  cartProduct: false,
})
</script>
