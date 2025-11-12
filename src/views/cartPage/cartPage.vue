<template>
  <verticalHeaderVue />
  <ContentLayout>
    <div class="layout-content">
      <v-btn
        prepend-icon="mdi-arrow-left"
        @click="goToHome"
      >Back</v-btn>
      <div class="title-cart">Cart</div>
      <div class="layout-cart">
        <!-- left -->
        <div class="layout-product-cart">
          <!-- top -->
          <div class="product-card">
            <v-row>
              <v-col cols="2">
                <div>ช่องที่ 1</div>
              </v-col>

              <v-col cols="6">
                <div>SKU 1</div>
                <div>xxx</div>
                <div>price</div>
                <v-btn>remove</v-btn>
              </v-col>

              <v-col cols="4">
                <v-number-input
                  v-model="amountProduct"
                  :max="999"
                  :min="1"
                  :reverse="false"
                  controlVariant="split"
                  label=""
                  :hideInput="false"
                  :inset="false"
                  base-color="primary"
                ></v-number-input>
                <div class="text-price">฿{{ amountProduct.toFixed(2) }}</div>
              </v-col>
            </v-row>
            <hr class="mt-5">
            </hr>
            <!-- <v-row>
              <v-col cols="2">
                <div>ช่องที่ 1</div>
              </v-col>

              <v-col cols="6">
                <div>SKU 1</div>
                <div>xxx</div>
                <div>price</div>
                <v-btn>remove</v-btn>
              </v-col>

              <v-col cols="4">
                <v-number-input v-model="amountProduct" :max="999" :min="1" :reverse="false" controlVariant="split"
                  label="" :hideInput="false" :inset="false" base-color="primary"></v-number-input>
              </v-col>
            </v-row>
            <hr class="mt-5">
            </hr>
            <v-row>
              <v-col cols="2">
                <div>ช่องที่ 1</div>
              </v-col>

              <v-col cols="6">
                <div>SKU 1</div>
                <div>xxx</div>
                <div>price</div>
                <v-btn>remove</v-btn>
              </v-col>

              <v-col cols="4">
                <v-number-input v-model="amountProduct" :max="999" :min="1" :reverse="false" controlVariant="split"
                  label="" :hideInput="false" :inset="false" base-color="primary"></v-number-input>
              </v-col>
            </v-row>
            <hr class="mt-5">
            </hr>
            <v-row>
              <v-col cols="2">
                <div>ช่องที่ 1</div>
              </v-col>

              <v-col cols="6">
                <div>SKU 1</div>
                <div>xxx</div>
                <div>price</div>
                <v-btn>remove</v-btn>
              </v-col>

              <v-col cols="4">
                <v-number-input v-model="amountProduct" :max="999" :min="1" :reverse="false" controlVariant="split"
                  label="" :hideInput="false" :inset="false" base-color="primary"></v-number-input>
              </v-col>
            </v-row>
            <hr class="mt-5">
            </hr>
            <v-row>
              <v-col cols="2">
                <div>ช่องที่ 1</div>
              </v-col>

              <v-col cols="6">
                <div>SKU 1</div>
                <div>xxx</div>
                <div>price</div>
                <v-btn>remove</v-btn>
              </v-col>

              <v-col cols="4">
                <v-number-input v-model="amountProduct" :max="999" :min="1" :reverse="false" controlVariant="split"
                  label="" :hideInput="false" :inset="false" base-color="primary"></v-number-input>
              </v-col>
            </v-row>
            <hr class="mt-5">
            </hr> -->
          </div>
          <!-- bottom -->
          <div class="layout-recommend pa-5">
            <div class="title-text-recommend">Recommend</div>
           
              <v-slide-group
                show-arrows
              >
                <v-slide-group-item
                  v-for="item in itemCart"
                  :key="item.sku"
                >
                  <v-card
                    class="ma-4"
                    color="grey-lighten-1"
                    height="190"
                    width="150"
                  >
                    <v-img
                      :src="item.image_url[0]"
                      height="80"
                      cover
                    />

                    <div class="pa-2">
                      <div class="text-subtitle-2">SKU {{ item.sku }}</div>
                      <div class="text-subtitle-2">{{ item.name }}</div>
                      <div class="text-caption">฿{{ item.price.toFixed(2) }} / EA</div>
                      <v-btn size="small" color="orange" prepend-icon="mdi-plus"> Add to cart </v-btn>
                    </div>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>

          </div>
        </div>
        <!-- right -->
        <div class="layout-summary pa-5">
          <div>
            <div class="title-text">Summary</div>
            <div>Promotion Code</div>
            <div class="d-flex">
              <v-text-field
                label="Promotion Code"
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
              <v-btn
                color="orange"
                class="mt-2"
              >Apply</v-btn>
            </div>
          </div>

          <div>
            <div class="d-flex justify-space-between">
              <div>Subtotal</div>
              <div>฿33333</div>
            </div>
            <div class="d-flex justify-space-between">
              <div>Discount</div>
              <div>฿100</div>
            </div>
            <div class="d-flex justify-space-between">
              <div>Delivery Free</div>
              <div>฿0</div>
            </div>
            <v-btn
              block
              class="mt-4"
            >Checkout</v-btn>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ContentLayout from "@/layouts/content/ContentLayout.vue";
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue";
import Products from "@/components/card/products.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const itemCart = [
  {
    sku: 1,
    brand: "CA",
    name: "T-Bone Slice 300g.",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 250.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80",
    ],
    price: 149.0,
  },
];

const amountProduct = ref(1);
const model = ref(null);

const goToHome = () => {
  console.log("goToHome");

  router.push("/");
};
</script>

<style scoped>
.layout-content {
  height: 100vh;
  padding: 25px;
  background-color: pink;
}

.title-cart {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}

.title-text {
  font-size: 40px;
}

.title-text-recommend {
  font-size: 30px;
}

.text-price {
  font-size: 20px;
  font-weight: bold;
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
  width: 63%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
}

.product-card {
  height: 55%;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  background-color: red;
}

.layout-summary {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
}

.layout-recommend {
  height: 40%;
  border: 1px solid black;
  background-color: yellow;
}

.recommend-card {
  display: flex;
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
