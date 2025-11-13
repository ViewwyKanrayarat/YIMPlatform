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
                <v-col
                  cols="4"
                  md="4"
                  lg="2"
                  class="img-card-img"
                >
                  <v-img
                    :src="item.image_url[0]"
                    class="img-size"
                  />
                </v-col>

                <v-col
                  cols="4"
                  md="4"
                  lg="6"
                  class="img-card-detail"
                >
                  <div class="text-number">SKU {{ item.sku }}</div>
                  <div>{{ item.name }}</div>
                  <div class="">฿{{ item.price }} / EA</div>
                  <v-btn
                    class=""
                    prepend-icon="mdi-trash-can-outline"
                    variant="text"
                    color="red"
                    @click="removeProduct(item)"
                  >remove</v-btn>
                </v-col>

                <v-col
                  cols="4"
                  md="4"
                  lg="4"
                  class="img-card-input"
                >
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
                    hide-details
                  ></v-number-input>
                  <div class="text-price mt-2">฿{{ (item.amount * item.price).toFixed(2) }}</div>
                </v-col>
              </v-row>
              <hr class="">
              </hr>
            </div>
            <div
              v-if="cart.TotalItems === 0"
              class="mt-10 text-center"
            >There are no items in this cart</div>
          </div>
          <!-- product recommend -->
          <div
            v-if="products.RecommendedProducts.length > 0"
            class="layout-recommend pa-5"
          >
            <div class="title-text-recommend">Recommend</div>
            <v-slide-group show-arrows>
              <v-slide-group-item
                v-for="item in products.RecommendedProducts"
                :key="item.sku"
              >
                <v-card
                  class="ma-4"
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
                      color="#F14725"
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
            <div class="text-primary my-5">Promotion Code</div>
            <div
              class="layout-promotion"
            >
              <v-text-field
                v-model="code"
                label="Promotion Code"
                variant="outlined"
                density="compact"
                hide-details
                height="50"
              ></v-text-field>
              <v-btn
                class="button-apply"
                color="#F14725"
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
              color="#F14725"
              height="50"
              rounded="20"
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
import { nanoid } from "nanoid";
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

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const timestamp = now.getTime().toString().slice(-6); // 6 หลักท้ายของ time
  return `${y}${m}${d}${timestamp}`;
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
      const paymentId = generateOrderId();
      console.log("Payment ID:", paymentId);
      router.push({
        path: "/home/checkout",
        query: { paymentId },
      });
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
}

.layout-cart {
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
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
}

.layout-recommend {
  flex: 0 0 320px;
  border: 1px solid black;
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

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-card-img {
  width: 100%;
}

.img-size {
  width: 100%;
  height: auto;
}

.layout-promotion {
  display: flex;
  padding-top: 10px;
}

.button-apply{
  margin-left: 10px;
}
@media (max-width: 900px) {
  .layout-product-cart {
    width: 100%;
  }

  .layout-summary-cart {
    width: 100%;
  }

  .img-card-img {
    max-width: 200px;
  }

  .text-discount {
    font-size: 25px;
  }

  .title-total {
    font-size: 30px;
    font-weight: bold;
  }
}

.img-card-input {
  text-align: end;
}

@media (max-width: 400px) {
  .layout-promotion {
    display:unset;
    margin-bottom:10px;
  }
  .layout-content {
    margin: 5px;
  }
  .button-apply{
    width: 100%;
    margin-left: 0px;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  .cart-row {
    display: flex !important;
    flex-wrap: wrap !important;
  }

  .img-card-img {
    flex: 0 0 100px !important;
    max-width: 100px !important;
  }
  .img-size {
    width: 100px;
    height: 100px;
  }

  .img-card-detail {
    flex: 1 1 auto !important;
    max-width: calc(100% - 100px) !important;
  }

  .img-card-input {
    flex: 0 0 100% !important;
    max-width: 100% !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .text-discount {
    font-size: 20px;
  }

  .title-total {
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
