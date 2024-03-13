<template>
  <div class="container">
    <div class="like" v-if="likeStore.items.length != 0">
      <div class="like__top">
        <router-link to="/">
          <img src="@/assets/img/toback.svg" alt="" />
        </router-link>

        <h2 class="like__top-title">My Wishlist</h2>
      </div>
      <div class="home__wrapper">
        <Product/>
      </div>
    </div>
    <div class="like__empty" v-else>
      <div class="like__empty-content">
        <img src="@/assets/img/empty-like.png" alt="" class="like__empty-img" />
        <h2 class="like__empty-title">Закладок нет :(</h2>
        <p class="like__empty-subtitle">
          Вы нищеброд? <br />
          Оформите хотя бы один заказ.
        </p>
        <router-link to="/" class="like__empty-btn like"
          >Вернуться назад</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import Product from "@/components/Liked/Liked.vue";
import { useCart } from "@/store/cart.js";
import { useLiked } from "@/store/liked.js";
import { ref, onMounted } from 'vue'

const cartStore = useCart();
const likeStore = useLiked();
const likedProducts = likeStore.items

const onClickDelLike = (item) => {
  likeStore.addLike(item);
};

const onClickAdd = (item) => {
  cartStore.addItem(item);
};
onMounted(() => {
  cartStore.updateStore()
  likeStore.updateStore()
})
</script>
<style lang="scss" scoped>
.home__wrapper{
  display: flex;
  justify-content: center;
  padding-top: 45px;
}
.like {
  margin-top: 40px;
  margin: 45px 60px;
  &__top {
    display: flex;
    align-items: center;
    gap: 20px;

    &-title {
      font-family: "Inter";
      color: #000;
      font-size: 32px;
      font-weight: 700;
      line-height: normal;
    }
  }

  &__empty {
    margin: 100px;
    display: flex;
    justify-content: center;
    text-align: center;
    &-title {
      font-family: "Inter";
      color: #000;
      font-weight: 600;
      font-size: 24px;
      color: #000;
    }
    &-subtitle {
      margin-top: 15px;
      color: rgb(0, 0, 0, 0.5);
      text-align: center;
      font-family: "Inter";
      font-size: 16px;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }

    &-btn {
      margin-top: 30px;
      display: block;
      position: relative;
      border-radius: 18px;
      background: #9dd458;
      padding: 17px 0 19px 0;
      color: #fff;
      text-align: center;
      font-family: "Inter";
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      cursor: pointer;
      width: 245px;

      &::after {
        content: "";
        position: absolute;
        transform: rotate(180deg);
        background-image: url("/src/assets/img/arrow.svg");
        background-repeat: no-repeat;
        width: 20px;
        height: 14px;
        bottom: 22px;
        left: 20px;
        transition: all 0.2s linear;
      }

      &:hover {
        &::after {
          left: 10px;
        }
      }
    }
  }
}
</style>
