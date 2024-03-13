<template>
  <div class="clothing__header">
    <div class="clothing__header-title">All offers</div>
    <Sorting />
  </div>
  <div class="clothing__products" v-if="paginatedProducts.length">
    <TransitionGroup name="fade">
      <div
        class="clothing__products-item"
        v-for="(item, idx) in paginatedProducts"
        :key="idx"
      >
        <span class="clothing__products-item-heart" @click="liked(item)">
          <img src="/src/assets/img/heart.svg" v-if="!item.liked" />
          <img src="/src/assets/img/heart-solid.svg" v-else alt="" />
        </span>
        <span
          class="clothing__products-item-cart"
          cursor="pointer"
          @click="addToCart(item)"
        >
          <img src="/src/assets/img/cart.svg" v-if="!item.inCart" />
          <img src="/src/assets/img/solidcart.svg" v-else alt="" />
        </span>
        <span class="clothing__products-item-save">
          <h3>{{Math.round(item.discountPercentage) }}% Save</h3>
        </span>
        <RouterLink
          :to="'/product/' + item.id"
          @click="send(item)"
          class="clothing__products-item"
        >
          <img
            class="clothing__products-item-img"
            :src="item.thumbnail"
            alt=""
          />
          <div class="clothing__products-item-descr">
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
            <span class="clothing__products-item-price"
              ><p class="price">${{ item.price }}</p>
              <p class="discount">
                ${{ discountedPrice(item.price, item.discountPercentage) }}
              </p>
            </span>
          </div>
        </RouterLink>
      </div>
    </TransitionGroup>
  </div>
  <div v-else class="loader__div">
    <Loader class="loader__main" />
  </div>
  <div class="pagination">
    <div
      class="page"
      :class="activePage == page ? 'active' : ''"
      @click="pageClick(page)"
      v-for="(page, index) in totalPage"
      :key="index"
    >
      {{ page }}
    </div>
  </div>
</template>

<script setup>
import { provide, onMounted, watch, computed, ref, inject } from "vue";
import { useFormatted } from "@/store/formatted";
import { useLiked } from "@/store/liked";
import { useCart } from "@/store/cart";
import { useItem } from "@/store/item";
import Sorting from "@/components/Sorting/Sorting.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const itemsend = useItem();
const sort = ref("");

const cartStore = useCart();
const likedStore = useLiked();
const products = useFormatted();

const content = ref([]);

const productInPages = ref(12);
const activePage = ref(1);

const send = (item) => {
  itemsend.getItem(item);
};

const getLocal = computed(() => {
  try {
    const savedData = JSON.parse(localStorage.getItem("products"));
    const from = (activePage.value - 1) * productInPages.value;
    const to = from + productInPages.value;
    return savedData.slice(from, to);
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return [];
  }
});

const discountedPrice = (price, discountPercentage) => {
  return (price - (price * discountPercentage) / 100).toFixed(2);
};

const liked = (item) => {
  // products.upDateProducts(item);
  likedStore.addLike(item);
};
const likedArray = ref(likedStore.items);

const addToCart = (item) => {
  // products.upDateProducts(item);
  cartStore.addItem(item);
};

const totalPage = computed(() =>
  Math.ceil(getProducts.value.length / productInPages.value)
);

const paginatedProducts = computed(() => {
  const from = (activePage.value - 1) * productInPages.value;
  const to = from + productInPages.value;
  const mergedProducts = getProducts.value;
  return mergedProducts.slice(from, to);
});

function pageClick(page) {
  activePage.value = page;
  router.push({ query: { page: activePage.value } });
}

const getProducts = computed(() => {
  return products.filterProduct;
});

onMounted(async () => {
  await products.getFormatted();
});
</script>

<style lang="scss" scoped>
.price{
  position: absolute;
  left: -35px;
  text-decoration: line-through;
  color: grey;
  font-weight: 200;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.loader__div {
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
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
