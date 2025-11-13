<template>
  <VerticalHeaderVue cartProduct />
  <ContentLayout>
    <div class="card-content">
      <!-- filter -->
      <div class="filter-content">
        <div class="layout-filter">
          <div class="title-text">Filter</div>
          <v-text-field
            v-model="search"
            placeholder="Keyword"
            density="compact"
            variant="outlined"
            hide-details
            base-color="primary"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="changeSearch()"
          >
          </v-text-field>
          <v-card class="pa-3 mt-10">
            <v-list>
              <!-- filter band -->
              <v-list-group value="brand">
                <template #activator="{ props }">
                  <v-list-item v-bind="props" prepend-icon="mdi-tag" title="Brand" />
                </template>
              </v-list-group>

              <!-- filter range price -->
              <v-list-group value="price">
                <template #activator="{ props }">
                  <v-list-item v-bind="props" prepend-icon="mdi-currency-usd" title="Price" />
                </template>

                <div class="w-full flex">
                  <div class="w-1/2">
                    <v-text-field
                      v-model="minPrice"
                      type="number"
                      label="Min"
                      min="0"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @keydown="onlyNumber"
                    />
                  </div>
                  <div>&nbsp;&nbsp;-&nbsp;&nbsp;</div>
                  <div class="w-1/2">
                    <v-text-field
                      v-model="maxPrice"
                      type="number"
                      label="Max"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @keydown="onlyNumber"
                    />
                  </div>
                </div>
                <v-btn color="primary" block class="mt-3" @click="changeSearch"> Search </v-btn>
              </v-list-group>
            </v-list>
          </v-card>
        </div>
      </div>
      <!-- products -->
      <div class="product-content">
        <div class="title-text-product title-text">Product</div>
        <div class="layout-content">
          <div class="layout-product">
            <div class="product-card" v-for="(product, index) in products.Products" :key="index">
              <Products :items="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ContentLayout from "@/layouts/content/ContentLayout.vue"
import VerticalHeaderVue from "@/layouts/full/verticalHeader/verticalHeader.vue"
import Products from "@/components/card/products.vue"
import type { productsFilterModel } from "../types/ProductsType"
import { useProducts } from "@/stores/products"
const products = useProducts()

// filter
let search = ref<string>("")

// range price
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

// filter by name products, price
async function changeSearch() {
  let filter: productsFilterModel = {
    keyword: search.value,
    min: minPrice.value != null ? Number(minPrice.value) : null,
    max: maxPrice.value != null ? Number(maxPrice.value) : null,
  }
  console.log("HOME", filter)
  await products.getProducts(filter)
}

// only number
const onlyNumber = (e: KeyboardEvent) => {
  if (!/[0-9]/.test(e.key) && !["Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault()
  }
}

async function init() {
  await products.getProducts()
}

init()
</script>

<style scoped>
.card-content {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}

.filter-content {
  width: 20%;
  display: flex;
  justify-content: center;
}

.layout-filter {
  width: 90%;
}

.product-content {
  width: 80%;
}

.layout-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-product {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-left: 5%;
  margin-right: 5%;
  align-items: stretch;
}
.title-text-product {
  margin-left: 5%;
}
.product-card {
  display: flex;
}
.title-text {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
@media (max-width: 900px) {
  .filter-content {
    width: 100%;
  }

  .product-content {
    width: 100%;
    padding-top: 50px;
  }
}

@media (max-width: 600px) {
  .layout-product {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
