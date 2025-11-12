<template>
  <verticalHeaderVue />
  <ContentLayout>
    <div class="card-content">
      <div class="order-content">
        <div class="text-title">Checkout</div>
        <div class="product-card">
          <div class="text-sub-title">Order ID xxx</div>
          <!-- order cart -->
          <v-container fluid>
            <v-row v-for="(item, i) in itemCart" :key="i" class="py-3">
              <v-col cols="4" md="4" lg="2">
                <v-img :src="item.image_url[0]" width="100" height="100" cover class="rounded" />
              </v-col>

              <v-col cols="4" md="4" lg="6">
                <div>{{ item.brand }}</div>
                <div>{{ item.name }}</div>
                <div>฿{{ item.price }}</div>
              </v-col>

              <v-col cols="4" md="4" lg="4" class="text-end">
                <div>x1</div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
      <!-- payment -->
      <div class="payment-content">
        <div class="summary-payment">
          <div class="text-sub-title space-top">Payment Information</div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Subtotal</div>
            <div class="text-sub-title">฿100000.00</div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Discount</div>
            <div class="text-sub-title">฿100000.00</div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="text-section">Delivery Fee</div>
            <div class="text-sub-title">฿100000.00</div>
          </div>
          <div class="d-flex justify-space-between mt-10">
            <div class="text-sum">Total</div>
            <div class="text-sum">฿1000000</div>
          </div>
        </div>

        <!-- qr code  -->
        <!-- order_id -->
        <!-- total_amount -->
        <div class="d-flex justify-center">
          <img
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payment-api.yimplatform.com/orders/${orderId}/checkout?price=${totalAmount}`"
          />
        </div>

        <!-- home -->
        <div class="d-flex justify-center">
          <v-btn @click="goToHome" size="x-large" width="500px">Back to Home Page</v-btn>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ContentLayout from "@/layouts/content/ContentLayout.vue"
import verticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const amountProduct = ref(1)
const orderId = "xxxxxx"
const totalAmount = 500000

const itemCart = [
  {
    sku: 1,
    brand: "CA",
    name: "T-Bone Slice 300g.",
    pack_size: "1",
    image_url: ["https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=200&h=200&q=80"],
    price: 250.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
    price: 149.0,
  },
  {
    sku: 2,
    brand: "CA",
    name: "Eggs No.1 Pack 30",
    pack_size: "1",
    image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
    price: 149.0,
  },
  // {
  //   sku: 2,
  //   brand: "CA",
  //   name: "Eggs No.1 Pack 30",
  //   pack_size: "1",
  //   image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
  //   price: 149.0,
  // },
  // {
  //   sku: 2,
  //   brand: "CA",
  //   name: "Eggs No.1 Pack 30",
  //   pack_size: "1",
  //   image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
  //   price: 149.0,
  // },
  // {
  //   sku: 2,
  //   brand: "CA",
  //   name: "Eggs No.1 Pack 30",
  //   pack_size: "1",
  //   image_url: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=200&h=200&q=80"],
  //   price: 149.0,
  // },
]

const goToHome = () => {
  console.log("goToHome")

  router.push("/")
}
</script>

<style scoped>
.card-content {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  /* min-height: 80vh; */
  margin: 25px;
  background-color: pink;
}

.order-content {
  width: 55%;
  /* display: flex; */
  /* justify-content: center; */
  background-color: yellow;
}

.payment-content {
  width: 45%;
  padding-left: 75px;
  padding-right: 75px;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* ดันปุ่มลงล่าง */
  /* min-height: 55%; */
}

.summary-payment {
  background-color: yellow;
}

.product-card {
  height: 80%;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  background-color: violet;
  margin-top: 30px;
  padding-left: 50px;
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
    margin-top: 50px;
  }
}
</style>
