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
.card-content {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin: 25px;
}

.order-content {
  width: 55%;
}

.payment-content {
  width: 45%;
  padding-left:  5%;
  padding-right:  5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.summary-payment {
  /* background-color: yellow; */
}

.product-card {
  height: 80%;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 30px;
  padding-left: 5%;
}

.text-title {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}

.text-sub-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-section {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-sum {
  font-size: 32px;
  font-weight: bold;
}

.space-top {
  margin-top: 130px;
}

.text-price {
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 900px) {
  .order-content {
    width: 100%;
  }
  .payment-content {
    width: 100%;
  }
  .space-top {
    margin-top: 0px;
  }
  .product-card {
    padding-left: 10px;
  }
  .payment-content {
    padding-left: 5px;
    padding-right: 5px;
  }
}

@media (max-width: 400px) {
  .card-content {
    margin: 5px;
  }
}
</style>
