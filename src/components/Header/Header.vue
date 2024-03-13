<template>
  <header class="header">
    <RouterLink to="/" class="header__logo">
      <img class="header__logo-img" src="@/assets/img/logo.jpg" alt="" />
      <div class="header__logo-text">
        <h2 class="header__logo-title">VUE GROCERY</h2>
        <p class="header__logo-subtitle">The best grocery store</p>
      </div>
    </RouterLink>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item" @click="onClickOpenCart" >
          <span class="header__nav-link cart-btn">
            <img src="@/assets/img/cart.svg" alt="" />
            <span>${{cartStore.totalPrice}}</span>
          </span>
        </li>
        <li class="header__nav-item heart__thing">
          <router-link to="/liked" class="header__nav-link like">
            <img src="@/assets/img/like.svg" alt="" />
          </router-link>
        </li>
        <li class="header__nav-item">
          <span class="header__nav-link user">
            <img src="@/assets/img/user.svg" alt="" />
          </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useCart } from "@/store/cart.js";

const cartStore = useCart();
const onClickOpenCart = () => {
  cartStore.isOpenCart = true;
  document.body.style = "overflow: hidden; margin-right: 16px;";
};
</script>

<style lang="scss" scoped></style>
