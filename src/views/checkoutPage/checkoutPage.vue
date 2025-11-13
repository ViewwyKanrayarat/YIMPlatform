<template>
  <verticalHeaderVue />
  <ContentLayout>
    <div class="card-content">
      <div class="order-content">
        <div class="text-title">Checkout</div>
        <div class="product-card">
          <div class="text-sub-title">Order ID {{ paymentId }}</div>
          <!-- order cart -->
          <!-- <v-container fluid> -->
          <v-row
            v-for="(item, i) in cart.Cart"
            :key="i"
          >
            <v-col
              cols="4"
              md="4"
              lg="2"
            >
              <v-img
                :src="item.image_url[0]"
                width="100"
                height="100"
                cover
              />
            </v-col>

            <v-col
              cols="4"
              md="4"
              lg="6"
            >
              <div>{{ item.brand }}</div>
              <div>{{ item.name }}</div>
              <div>฿{{ item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </v-col>

            <v-col
              cols="4"
              md="4"
              lg="4"
              class="text-end"
            >
              <div>x{{ item.amount.toLocaleString() }}</div>
              <div>฿{{ (item.price * item.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </v-col>
          </v-row>
          <!-- </v-container> -->
        </div>
      </div>
      <!-- payment -->
      <div class="payment-content">
        <div class="summary-payment">
          <div class="text-sub-title space-top">Payment Information</div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Subtotal</div>
            <div class="text-sub-title">฿{{ cart.TotalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Discount</div>
            <div class="text-sub-title">
              ฿{{ cart.PromotionDiscount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Delivery Fee</div>
            <div class="text-sub-title">฿{{ cart.DeliveryFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
          </div>
          <div class="d-flex justify-space-between my-10">
            <div class="text-sum">Total</div>
            <div class="text-sub-title">฿{{ cart.TotalPayable.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
          </div>
        </div>

        <!-- qr code  -->
        <!-- order_id -->
        <!-- total_amount -->
        <div class="d-flex justify-center mb-10">
          <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payment-api.yimplatform.com/orders/${paymentId}/checkout?price=${cart.TotalPayable}`" />
        </div>

        <!-- home -->
        <div class="d-flex justify-center">
          <v-btn
            @click="goToHome"
            size="x-large"
            width="500px"
            color="#F14725"
          >Back to Home Page</v-btn>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ContentLayout from "@/layouts/content/ContentLayout.vue";
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { useCart } from "@/stores/cart";
const cart = useCart();
import { useProducts } from "@/stores/products";
const products = useProducts();
const router = useRouter();
const route = useRoute();
const paymentId = route.query.paymentId;

const goToHome = () => {
  cart.resetCart();
  router.push("/");
};
</script>

<style scoped>
@import "@/css/pages/checkout.css";
</style>
