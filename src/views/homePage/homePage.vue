<template>
  <VerticalHeaderVue cartProduct />
  <ContentLayout>
    <div class="card-content">
      <!-- filter -->
      <div class="filter-content">
        <div class="layout-filter">
          <v-text-field
            v-model="search"
            placeholder="Keyword"
            density="compact"
            variant="outlined"
            hide-details
            base-color="primary"
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
                      v-model.number="minPrice"
                      type="number"
                      label="Min"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                  <div>&nbsp;&nbsp;-&nbsp;&nbsp;</div>
                  <div class="w-1/2">
                    <v-text-field
                      v-model.number="maxPrice"
                      type="number"
                      label="Max"
                      density="compact"
                      variant="outlined"
                      hide-details
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
        <div class="layout-product">
          <div class="product-card" v-for="(product, index) in products.Products" :key="index">
            <Products :items="product" />
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
import { useProducts } from "@/stores/products"
const products = useProducts()

// filter
let search = ref<string>("")

// range price
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

function changeSearch() {
  console.log(search.value,minPrice.value,maxPrice.value)
  console.log("กรองช่วงราคา", {
    min: minPrice.value,
    max: maxPrice.value,
  })
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
  background-color: red;
}
.filter-content {
  width: 20%;
  display: flex;
  justify-content: center;
  background-color: blue;
}

.layout-filter {
  width: 90%;
  background-color: red;
}

.product-content {
  width: 80%;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-product {
  width: 90%;
  background-color: lightblue;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.product-card {
  display: flex;
}

@media (max-width: 900px) {
  .filter-content {
    width: 100%;
  }
  .product-content {
    width: 100%;
  }
}
</style>
