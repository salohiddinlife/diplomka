<template>
<div class="liked__products">
  <div
    class="liked__products-item"
    v-for="item in likedProducts"
    :key="item.id"
  >
    <span class="liked__products-item-heart" @click="liked(item)">
      <img src="/src/assets/img/heart.svg" v-if="!item.liked" />
      <img src="/src/assets/img/heart-solid.svg" v-else alt="" />
    </span>
    <span class="liked__products-item-cart" @click="addToCart(item)">
      <img src="/src/assets/img/cart.svg" v-if="!item.inCart" />
      <img src="/src/assets/img/solidcart.svg" v-else alt="" />
    </span>
    <RouterLink
      :to="'/product/' + item.id"
      @click="send(item)"
      class="liked__products-item"
    >
      <img class="liked__products-item-img" :src="item.thumbnail" alt="" />
      <div class="liked__products-item-descr">
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.brand }}’s Brand</p>
          <span class="product__status">
            <img
              :src="
                item.stock > 0
                  ? '/src/assets/img/checked.svg'
                  : '/src/assets/img/not_checked.svg'
              "
            />
            <h3>{{ item.stock > 0 ? "in stock" : "out of stock" }}</h3>
          </span>
        </div>
        <span class="liked__products-item-price"
          ><p>${{ item.price }}</p></span
        >
      </div>
    </RouterLink>
  </div>
  </div>
</template>

<script setup>
import { provide, onMounted, computed, ref, inject } from "vue";
import { useFormatted } from "@/store/formatted";
import { useLiked } from "@/store/liked";
import { useCart } from "@/store/cart";
import { useItem } from "@/store/item";

import Sorting from "@/components/Sorting/Sorting.vue";
const api = inject("api");

const itemsend = useItem();

const send = (item) => {
  itemsend.getItem(item);
};

const sort = ref("");

const cartStore = useCart();
const likedStore = useLiked();
const products = useFormatted();

const likedProducts = likedStore.items;

const productInPages = ref(12);
const activePage = ref(1);

const liked = (item) => {
  products.upDateProducts(item);
  likedStore.addLike(item);
};
const addToCart = (item) => {
  products.upDateProducts(item);
  cartStore.addItem(item);
};

const totalPage = computed(() =>
  Math.ceil(getProducts.value.length / productInPages.value)
);
</script>
<style lang="scss" scoped>
.loader__div {
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
}
.liked__products {
    align-self: center;
    // display: grid;
    // place-items: center;
    // grid-template-columns: repeat(3, 1fr);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    row-gap: 50px;
    column-gap: 20px;
    max-width: 894px;
    width: 100%;
    &-item {
        position: relative;
        max-width: 282px;
        max-height: 441px;
        width: 100%;
        height: 100%;
        transition: all .3s;

        &-heart,
        &-cart {
            cursor: pointer;
            border-radius: 50%;
            width: 32.36px;
            height: 32.36px;
            background: rgb(255, 255, 255);
            border: 1px solid grey;
            display: grid;
            place-items: center;
            position: absolute;
            top: 26px;
            right: 20px;
            z-index: 22;

            & img {
                width: 15px;
                height: 15px;
            }
        }
        &-cart {
            left: 20px;
        }

        &-img {
            max-width: 282px;
            max-height: 370px;
            min-height: 370px;
            overflow: hidden;
            border-radius: 12px;
        }

        &-descr {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;

            & h2 {
                color: rgb(60, 66, 66);
                font-family: Causten;
                font-size: 16px;
                font-weight: 600;
                line-height: 19px;
                letter-spacing: 0%;
                text-align: left;
            }

            & p {
                color: rgb(128, 125, 126);
                font-size: 14px;
                font-weight: 500;
                line-height: 17px;
            }


        }

        &-price {
            border-radius: 8px;
            background: rgb(246, 246, 246);
            width: 82.31px;
            height: 36.58px;
            display: flex;
            justify-content: center;
            align-items: center;

            & p {
                color: rgb(60, 66, 66);
                font-size: 14px;
                font-weight: 700;
                line-height: 17px;
            }
        }
    }
}
.product__status {
  display: flex;
  align-items: center;
  gap: 5px;
  & img {
    height: 14px;
    width: 14px;
  }
  & h3 {
    color: rgb(33, 184, 33);
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }
}
</style>
