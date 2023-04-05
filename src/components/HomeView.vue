<template>
  <ConfirmDialog />
  <Toast />
  <div class="flex justify-content-center align-items-center m-3">
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
    <Button
      v-if="searchUsed"
      @click="allProducts"
      class="m-right-20"
      label="Powrót"
      icon="pi pi-chevron-left"
    />
    <InputText v-model="store.searchTerm" type="text" placeholder="Szukaj" />
    <Button @click="handleSearch" icon="pi pi-search" />
    <RouterLink class="no-decoration menu-txt" to="/basket"
      ><i class="pi pi-shopping-bag m-3 icon-width" />KOSZYK</RouterLink
    >
  </div>
  <div class="flex justify-content-center">
    <DataTable
      :value="searchUsed ? store.filteredProducts : store.products"
      editMode="row"
      v-model:editingRows="editingRows"
      @row-edit-save="onRowEditSave"
      responsiveLayout="scroll"
      class="w-max datatable"
    >
      <template #header>Produkty </template>
      <Column field="photo" header="Image">
        <template #body="slotProps">
          <img class="product-img" :src="slotProps.data.photo" />
        </template>
      </Column>
      <Column
        v-for="column in productColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        sortable
      ></Column>
      <Column :field="isEuro ? 'priceEU' : 'price'" header="Cena" sortable
        ><template #editor="{ data, field }">
          <InputText v-model="data[field]" class="width-70" /> </template
      ></Column>
      <Column header="Waluta"
        ><template #body> {{ isEuro ? '€' : 'zł' }} </template></Column
      >
      <Column :rowEditor="true" header="Edytuj" />
      <Column header="Usuń">
        <template #body="event">
          <div>
            <button
              @click="confirmDialog(event.data)"
              class="btn-icon btn-icon-danger m-1"
            >
              <i class="pi pi-ban"></i>
            </button>
            <button
              @click="addToBasket(event.data)"
              class="btn-icon btn-icon-success m-1"
            >
              <i class="pi pi-plus"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { productColumns } from '@/consts/productColumns'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useStore } from '@/stores/store.js'

const store = useStore()
const toast = useToast()
const confirm = useConfirm()
const searchUsed = ref(false)
const isEuro = ref(false)
const editingRows = ref([])

const onRowEditSave = (event) => {
  let { newData, index } = event
  newData.priceEU = (newData.price / 4.75).toFixed(2)
  store.products[index] = newData
}
const changeToPln = () => {
  isEuro.value = false
}
const changeToEu = () => {
  isEuro.value = true
}
const handleSearch = () => {
  searchUsed.value = true
}
const allProducts = () => {
  searchUsed.value = false
}
const getBasketId = (data) => {
  const basketId = store.basket.findIndex((item) => {
    const { quantity, ...rest } = item
    return JSON.stringify(rest) === JSON.stringify(data)
  })
  return basketId
}
const deleteProduct = (productId) => {
  const basketId = getBasketId(store.products[productId])
  if (basketId !== -1) {
    store.basket.splice(basketId, 1)
  }
  store.products.splice(productId, 1)
  searchUsed.value = false
}
const addToBasket = (data) => {
  const id = getBasketId(data)
  console.log(id)
  if (id === -1) {
    store.basket.push({ ...data, quantity: 1 })
  } else {
    let quantity = parseInt(store.basket[id].quantity)
    quantity += 1
    store.basket[id].quantity = quantity
  }
}
const confirmDialog = (data) => {
  confirm.require({
    message: 'Do you want to delete this product?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Competition deleted',
        life: 3000,
      })
      const id = store.products.indexOf(data)
      deleteProduct(id)
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      })
    },
  })
}
</script>
