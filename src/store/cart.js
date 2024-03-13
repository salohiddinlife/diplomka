import { defineStore } from "pinia";
import { useFormatted } from "@/store/formatted.js";

export const useCart = defineStore({
  id: "cart",
  state: () => ({
    isOpenCart: false,
    items: [],
    localStore: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
  }),
  actions: {
    addItem(item) {
      const index = this.localStore.findIndex((el) => el.id === item.id);
      if (index !== -1) {
        this.localStore[index].inCart = !this.localStore[index].inCart;
      } else {
        item.inCart = true;
        this.localStore.push(item);
      }
      localStorage.setItem("products", JSON.stringify(this.localStore));
    },
    updateStore() {
      this.items = this.localStore.filter((item) => item.inCart);
      const formatted = useFormatted();
      formatted.getFormatted();
    },
  },
  getters: {
    totalPrice() {
      return this.items.reduce((sum, el) => sum + el.price, 0);
    },
  },
});
