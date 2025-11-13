<template>
  <verticalHeaderVue />
  <ContentLayout>
    <div class="layout-content">
      <v-btn
        prepend-icon="mdi-arrow-left"
        @click="goToHome"
      >Back</v-btn>
      <div class="text-title">Cart</div>
      <div class="layout-cart">
        <!-- CART -->
        <div class="layout-product-cart">
          <!-- product in cart -->
          <div class="product-card">
            <div
              v-for="item, index in cart.Cart"
              :key="index"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
                    :src="item.image_url[0]"
                    class="img-top"
                  />
                </v-col>

                <v-col cols="6">
                  <div class="text-number">SKU {{ item.sku }}</div>
                  <div>{{ item.name }}</div>
                  <div class="pt-5">฿{{ item.price }} / EA</div>
                  <v-btn
                    class="mt-3"
                    prepend-icon="mdi-trash-can-outline"
                    variant="text"
                    color="red"
                    @click="removeProduct(item)"
                  >remove</v-btn>
                </v-col>

                <v-col cols="4">
                  <v-number-input
                    v-model="item.amount"
                    :max="999"
                    :min="1"
                    :reverse="false"
                    controlVariant="split"
                    label=""
                    :hideInput="false"
                    :inset="false"
                    base-color="primary"
                    @update:model-value="val => updateAmount(item, val)"
                  ></v-number-input>
                  <div class="text-price">฿{{ (item.amount * item.price).toFixed(2) }}</div>
                </v-col>
              </v-row>
              <hr class="my-5">
              </hr>
            </div>
            <div
              v-if="cart.TotalItems === 0"
              class="mt-10 text-center"
            >There are no items in this cart</div>
          </div>
          <!-- product recommend -->
          <div class="layout-recommend pa-5">
            <div class="title-text-recommend">Recommend</div>
            <v-slide-group show-arrows>
              <v-slide-group-item
                v-for="item in products.RecommendedProducts"
                :key="item.sku"
              >
                <v-card
                  class="ma-4"
                  color="grey-lighten-1"
                  height="220"
                  width="160"
                >
                  <v-img
                    :src="item.image_url[0]"
                    height="100"
                    cover
                  />

                  <div class="pa-2">
                    <div class="text-subtitle">SKU {{ item.sku }}</div>
                    <div class="text-subtitle text-ellipsis">{{ item.name }}</div>
                    <div class="text-caption">฿{{ item.price.toFixed(2) }} / EA</div>
                    <v-btn
                      size="small"
                      color="orange"
                      prepend-icon="mdi-plus"
                      @click="addProductToCart(item)"
                    > Add to cart </v-btn>
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>

          </div>
        </div>
        <!-- SUMMARY -->
        <div
          v-if="cart.TotalPrice>0"
          class="layout-summary-cart pa-5"
        >
          <!-- promotion -->
          <div>
            <div class="text-sub-title">Summary</div>
            <div class="text-primary pt-5">Promotion Code</div>
            <div
              class="d-flex pt-2"
              style="background-color: red;"
            >
              <v-text-field
                v-model="code"
                label="Promotion Code"
                variant="outlined"
                density="compact"
                hide-details
                height="50"
                class="mr-2"
              ></v-text-field>
              <v-btn
                color="orange"
                height="50"
                @click="cart.calPromotionDiscount(code)"
                :disabled="code === ''"
              >Apply</v-btn>
            </div>
          </div>
          <!-- cal price -->
          <div>
            <div class="d-flex justify-space-between text-discount">
              <div>Subtotal</div>
              <div>฿{{ cart.TotalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div
              class="d-flex justify-space-between text-discount"
              :style="{ color: cart.PromotionDiscount > 0 ? 'orange' : '' }"
            >
              <div>Discount</div>
              <div v-if="cart.PromotionDiscount>0">-฿{{ cart.PromotionDiscount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
              <div v-else>฿{{ cart.PromotionDiscount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div class="d-flex justify-space-between text-discount">
              <div>Delivery Fee</div>
              <div>฿{{ cart.DeliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div class="d-flex justify-space-between title-total">
              <div>Total</div>
              <div>฿{{ cart.TotalPayable.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <v-btn
              block
              class="mt-4"
              @click="comfirmPayment"
            >Checkout</v-btn>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";
import ContentLayout from "@/layouts/content/ContentLayout.vue";
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue";
import Products from "@/components/card/products.vue";
import { useRouter } from "vue-router";
import type { CartModel } from "@/types/CartType";
import { useCart } from "@/stores/cart";
const cart = useCart();
import { useProducts } from "@/stores/products";
const products = useProducts();
const router = useRouter();
const code = ref("");
const amountProduct = ref(1);
const model = ref(null);

// update amount not null
function updateAmount(item: CartModel, val: number | null | "") {
  console.log("val", val);

  if (val === null || val === "" || val < 1) {
    item.amount = 1;
  } else {
    item.amount = val;
  }
}

function goToHome() {
  console.log("goToHome");
  router.push("/");
}

function removeProduct(item: CartModel) {
  Swal.fire({
    title: "Are you sure?",
    text: `Remove ${item.name} from cart?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      cart.removeProduct(item.sku);
    }
  });
}

function addProductToCart(item: CartModel) {
  cart.getProductsInCart(item);
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Add to cart success",
    showConfirmButton: false,
    timer: 1500,
  });
}

function comfirmPayment() {
  Swal.fire({
    title: "Confirm Your Order",
    text: "Do you want to proceed to payment?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Pay Now",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push("/home/checkout");
    }
  });
}

cart.loadConfig();
products.getProducts();
console.log(products.RecommendedProducts);
</script>

<style scoped>
.layout-content {
  height: 100%;
  margin: 25px;
  background-color: pink;
}

.text-title {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}

.text-sub-title {
  font-size: 40px;
}

.title-total {
  font-size: 35px;
  font-weight: bold;
}

.text-primary {
  font-size: 20px;
}

.text-discount {
  font-size: 30px;
}

.title-text-recommend {
  font-size: 30px;
}

.text-price {
  font-size: 20px;
  font-weight: bold;
}

.text-number {
  font-size: 14px;
  color: gray;
}

.layout-cart {
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: green;
}

.layout-product-cart {
  width: 55%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  background-color: yellow;
}

.layout-recommend {
  flex: 0 0 320px;
  border: 1px solid black;
  background-color: blue;
  overflow: hidden;
}

.layout-summary-cart {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
}

.recommend-card {
  display: flex;
}

.img-top {
  width: auto;
  height: auto;
  max-width: 200px;
}

.text-ellipsis {
  white-space: nowrap; /* ไม่ตัดบรรทัด */
  overflow: hidden; /* ซ่อนเนื้อหาที่เกิน */
  text-overflow: ellipsis; /* แสดง ... */
}

@media (max-width: 900px) {
  .layout-product-cart {
    width: 100%;
  }

  .layout-summary {
    width: 100%;
  }
}
</style>
