<template>
  <div class="wrapper">
    <Header />
    <Cart />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import Cart from "@/components/Cart/Cart.vue";
</script>

<style lang="scss" scoped></style>
