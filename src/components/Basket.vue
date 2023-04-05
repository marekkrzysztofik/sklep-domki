<template>
  <Button
    v-if="!isEuro"
    @click="changeToEu"
    class="m-right-20"
    label="Zmień na €"
    icon="pi pi-calculator"
  />
  <Button
    v-if="isEuro"
    @click="changeToPln"
    class="m-right-20"
    label="Zmień na PLN"
    icon="pi pi-calculator"
  />
  <div class="flex align-items-center">
    <h1 v-if="store.basket.length === 0">Nie ma produktów w koszyku</h1>
    <div class="flex flex-column">
      <div
        v-for="product in store.basket"
        class="flex justify-content-between bg-dark-blue side-pad-20 br-radius-20 width-530 m-2"
      >
        <div class="flex align-items-center">
          <img :src="product.photo" class="basket-img m-right-20" alt="" />
          <div>
            <h2>{{ product.name }}</h2>
            <p class="m-0">
              Cena za sztukę:
              {{ isEuro ? product.priceEU + ' €' : product.price + ' zł' }}
            </p>
            <p class="small-txt">{{ isEuro ? ' + prowizja' : '' }}</p>
          </div>
        </div>
        <div class="flex align-items-center">
          <div class="quantity-box flex br-radius-20">
            <button
              @click="add(store.basket.indexOf(product))"
              class="btn-icon"
            >
              <i class="pi pi-plus"></i>
            </button>
            <h5 class="m-0 pad-10">{{ product.quantity }}</h5>
            <button
              @click="subtract(store.basket.indexOf(product))"
              class="btn-icon"
            >
              <i class="pi pi-minus"></i>
            </button>
          </div>
          <button
            @click="deleteProduct(store.basket.indexOf(product))"
            class="bin-icon br-radius-20 btn-icon-danger m-1"
          >
            <i class="pi pi-ban"></i>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="store.basket.length > 0"
      class="flex flex-column m-3 pad-20 bg-white br-radius-20"
    >
      <h1>Do zapłaty</h1>
      <div class="flex justify-content-end">
        <p>{{ isEuro ? store.pricesEuSum + ' €' : store.pricesSum + ' zł' }}</p>
      </div>
      <div class="bg-dark-blue pad-20 br-radius-20">
        Wybierz dostawę i płatność
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/stores/store.js'
import { ref } from 'vue'
const store = useStore()
const isEuro = ref(false)

const changeToPln = () => {
  console.log(store.basket)
  isEuro.value = false
}
const changeToEu = () => {
  isEuro.value = true
}
const deleteProduct = (id) => {
  store.basket.splice(id, 1)
}
const add = (id) => {
  let quantity = parseInt(store.basket[id].quantity)
  quantity += 1
  store.basket[id].quantity = quantity
}
const subtract = (id) => {
  let quantity = parseInt(store.basket[id].quantity)
  if (quantity > 1) {
    quantity -= 1
  }
  store.basket[id].quantity = quantity
}
</script>
