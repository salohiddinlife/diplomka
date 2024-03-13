import { defineStore } from "pinia";
import { useFormatted } from '@/store/formatted.js'
export const useLiked = defineStore("liked", {
  state: () => ({
    items: [],
    localStore: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
  }),
  actions: {
    addLike(item) {
      const index = this.localStore.findIndex((el) => el.id === item.id);
      if (index !== -1) {
        this.localStore[index].liked = !this.localStore[index].liked;
      } else {
        // If the item doesn't exist, add it with liked property set to true
        item.liked = true;
        this.localStore.push(item);
      }
      localStorage.setItem("products", JSON.stringify(this.localStore));
      // this.updateStore()
    },
    updateStore() {
      this.items = this.localStore.filter((item) => item.liked);
      const formatted = useFormatted();
      formatted.getFormatted();
    },
  },
  
  
});
