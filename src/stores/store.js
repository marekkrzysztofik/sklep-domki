import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      products: [],
      type: ['na ziemi', 'na drzewie'],
      animals: ['pies'],
      basket: [],
      searchTerm: '',
    }
  },
  getters: {
    filteredProducts() {
      return this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.animal
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          product.price.toString().includes(this.searchTerm)
      )
    },
    pricesSum() {
      const prices = []
      this.basket.forEach((product) => {
        prices.push(parseInt(product.price))
      })
      return prices.reduce((a, b) => a + b)
    },
    pricesEuSum() {
      const prices = []
      this.basket.forEach((product) => {
        prices.push(parseInt(Math.ceil(product.priceEU)))
      })
      return prices.reduce((a, b) => a + b)
    },
  },
  persist: {
    enabled: true,
  },
})
