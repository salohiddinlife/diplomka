import { defineStore } from "pinia";

export const useItem = defineStore({
  id: "item",
  state: () => ({
    item: [],
  }),
  actions: {
    getItem(item) {
      this.item = item;
    },
  },
});
