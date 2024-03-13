import { createWebHashHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";

export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("@/pages/Product.vue"),
      props: true,
    },
    {
      path: "/liked",
      name: "liked",
      component: () => import("@/pages/Liked.vue"),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});
