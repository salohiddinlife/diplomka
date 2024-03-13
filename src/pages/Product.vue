<template>
  <div class="product" v-if="product">
    <div class="product__info">
      <div class="swiper__div">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :pagination="{
            clickable: true,
          }"
          class="product__slide"
        >
          <SwiperSlide
            style="width: max-content"
            v-for="image in product.images"
            :key="image.id"
          >
            <img v-lazy="image" alt="" class="product__slider-img" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="product__oper">
        <div class="product__text">
          <h2 class="product__title">{{ product.title }}</h2>
          <p class="product__descr">
            {{ product.description }}
          </p>
          <h2 class="stock">
            in stock:{{product.stock}}
          </h2>
          <h2 class="saving__info">YOU SAVE ${{Math.round(product.price - discountedPrice(product.price, product.discountPercentage))}}  ({{Math.round(product.discountPercentage)}}%)</h2>
        </div>
        <div class="product__btns">
          <button class="product__buy">
            <h2 class="product__buy-h2">Buy Now</h2>
            <p class="discount">
              ${{ discountedPrice(product.price, product.discountPercentage) }}
            </p>
            <span class="product__buy-span">${{ product.price }}</span>
          </button>
          <button class="product__cart" @click="addToCart(product)">
            <h2>Add To Cart</h2>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<script setup>
import { Navigation, Pagination } from "swiper/modules";
import { ref, onMounted, inject } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useItem } from "@/store/item";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const discountedPrice = (price, discountPercentage) => {
  return (price - (price * discountPercentage) / 100).toFixed(2);
};
const props = defineProps({
  id: String,
});
const api = inject("api");
const product = ref(null);
const fetchdata = async () => {
  try {
    const res = await api.get(`/${props.id}`);
    product.value = res.data;
  } catch (error) {
    console.error(error);
  }
};
onMounted(fetchdata);
//  cart
import { useCart } from "@/store/cart";
import { useFormatted } from "@/store/formatted";
const cartStore = useCart();
const products = useFormatted();

const addToCart = (product) => {
  products.upDateProducts(product);
  cartStore.addItem(product);
};
const modules = [Navigation, Pagination];
</script>

<style lang="scss" scoped>
.product__slider-img {
  border: 1px solid #f3f3f3;
  border-radius: 40px;
  width: 420px;
  height: 422px;
}
.product__info {
  display: flex;
  border-bottom: 2px solid #f4f4f4;
}
.product__slide {
  width: 420px;
  height: 420px;
}
.swiper__div {
  padding: 45px;
}
.product__text {
  padding: 75px 69px 69px 30px;
  max-height: 62.44%;
}
.saving__info{
  margin-top: 30px;
  color: #000000;
}
.product__title {
  font-family: "Inter";
  font-weight: 500;
  font-size: 40px;
  color: #000;
}
.product__descr {
  padding-top: 20px;
  font-family: "Inter";
  font-weight: 500;
  font-size: 22px;
  color: #000;
}
.product__buy {
  border-radius: 18px;
  background: #9dd458;
  width: 204px;
  height: 65px;
  &-span {
text-decoration: line-through;
    font-size: 16px;
    text-align: center;
    color: #000;
  }
  &-h2 {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #fff;
  }
}
.discount {
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #000;
}
.product__cart {
  background: #f59b47;
  border-radius: 18px;
  width: 204px;
  height: 65px;
  & h2 {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #fff;
  }
}
.product__btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 464px;
}
.product__oper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 45px;
}
</style>
