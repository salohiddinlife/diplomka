import { defineStore } from "pinia";
import axios from "axios";

export const useFormatted = defineStore({
  id: "formatted",
  state: () => ({
    url: "https://dummyjson.com/products",
    prev: 0,
    limit: 12,
    regProducts: null,
    original: null,
    item: null,
    sort: [
      {
        id: 1,
        name: "All",
        isActive: true,
      },
      {
        id: 2,
        name: "Price",
        isActive: false,
      },
      {
        id: 3,
        name: "A/Z",
        isActive: false,
      },
      {
        id: 4,
        name: "Rating",
        isActive: false,
      },
    ],
  }),
  actions: {
    upDateProducts(item) {
      let index = this.regProducts.findIndex((el) => el.id === item.id);
    
      if (index !== -1) {
        // Update the liked property if the item is being liked
        if (item.inLike === true) {
          this.regProducts[index].liked = true;
        }
        // Update the inCart property if the item is being added to the cart
        if (item.inCart === true) {
          this.regProducts[index].inCart = true;
        }
        // Handle other cases if needed
      } else {
        // Item not found in the list, handle this case if needed
      }
    },
    async getFormatted() {
      this.isLoading = true;
      const localStore = localStorage.getItem("products");
      if (localStore) {
        this.regProducts = JSON.parse(localStore);
      } else {
        try {
          const res = await axios.get(`${this.url}?limit=100`);

          if (res) {
            const data = res.data.products;
            data.forEach((obj) => {
              obj.amount = 0;
              obj.totalPrice = 0;
            });
            localStorage.setItem("products", JSON.stringify(data))
            this.original = data;
            if (!this.regProducts) {
              this.regProducts = [...this.original];
            }
          } else {
          }
        } catch (error) {
          
        }
      }
      this.isLoading = false;
    },
  },
  getters: {
    filterProduct() {
      if (!this.regProducts) {
        return [];
      }

      const DO_NOT_SORT = 0;
      const SORT_BY_PRICE = 1;
      const SORT_BY_TITLE = 2;
      const SORT_BY_RATING = 3;

      const indexSort = this.sort.findIndex((el) => el.isActive);

      // If sorting is disabled, return a copy of the original array
      if (indexSort === DO_NOT_SORT) {
        return [...this.regProducts];
      }

      // Define a bubble sort function based on the selected sorting criterion
      const bubbleSort = (arr, compareFunction) => {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - 1; j++) {
            if (compareFunction(arr[j], arr[j + 1]) > 0) {
              // Swap elements if they are in the wrong order
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
        return arr;
      };

      // Define compare functions for sorting by rating, price, or title
      let compareFunction;
      switch (indexSort) {
        case SORT_BY_RATING:
          compareFunction = (a, b) => a.rating - b.rating;
          break;
        case SORT_BY_PRICE:
          compareFunction = (a, b) => a.price - b.price;
          break;
        case SORT_BY_TITLE:
          compareFunction = (a, b) => a.title.localeCompare(b.title);
          break;
        default:
          return [...this.regProducts];
      }

      const sortedProducts = bubbleSort([...this.regProducts], compareFunction);
      const localSaving = JSON.stringify(this.regProducts);
      localStorage.setItem("products", localSaving);
      return sortedProducts;
    },
  },
});
