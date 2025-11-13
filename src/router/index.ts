import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import FullLayout from "@/layouts/full/FullLayout.vue"
import HomePage from "@/views/homePage/homePage.vue"
import CartPage from "@/views/cartPage/cartPage.vue"
import CheckoutPage from "@/views/checkoutPage/checkoutPage.vue"
import ProductsPage from "@/views/productsDetailPage/productsDetailPage.vue"
import { useCart } from "@/stores/cart"

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: FullLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
      },
      {
        path: "cart",
        name: "CartPage",
        component: CartPage,
      },
      {
        path: "checkout",
        name: "CheckoutPage",
        component: CheckoutPage,
      },
      {
        path: "detail/:sku",
        name: "ProductsPage",
        component: ProductsPage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/home",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const cart = useCart()

  // ไม่ให้เข้า Checkout ถ้าในตะกร้าไม่มีสินค้า
  if (to.name === "CheckoutPage" && cart.TotalItems === 0) {
    return next({ name: "Home" })
  }

  next()
})

export default router
