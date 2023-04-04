import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      products: [],
      type: ['na ziemi', 'na drzewie'],
      animals: ['pies'],
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
  },
  persist: {
    enabled: true,
  },
})
