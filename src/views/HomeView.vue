<template>
  <ConfirmDialog />
  <Toast />
  <div class="flex justify-content-center m-3">
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
  </div>
  <div class="flex justify-content-center">
    <DataTable
      v-if="!searchUsed"
      :value="store.products"
      responsiveLayout="scroll"
      class="w-max datatable"
    >
      <template #header>Produkty </template>
      <Column
        v-for="column in productColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        sortable
      ></Column>
      <Column
        :field="isEuro ? 'priceEU' : 'price'"
        header="Cena"
        sortable
      ></Column>
      <Column header="Waluta"
        ><template #body> {{ isEuro ? '€' : 'zł' }} </template></Column
      >
      <Column header="Actions">
        <template #body="event">
          <div>
            <button
              @click="confirmDialog(event.data)"
              class="btn-icon btn-icon-danger"
            >
              <i class="pi pi-ban"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
    <DataTable
      v-if="searchUsed"
      :value="store.filteredProducts"
      responsiveLayout="scroll"
      class="w-max datatable"
    >
      <template #header>Products </template>
      <Column
        v-for="column in productColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
      ></Column>
      <Column :field="isEuro ? 'priceEU' : 'price'" header="Cena"></Column>
      <Column header="Waluta"
        ><template #body> {{ isEuro ? '€' : 'zł' }} </template></Column
      >
      <Column header="Actions">
        <template #body="event">
          <div>
            <button
              @click="confirmDialog(event.data)"
              class="btn-icon btn-icon-danger"
            >
              <i class="pi pi-ban"></i>
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
const searchUsed = ref(false)
const toast = useToast()
const confirm = useConfirm()
const isEuro = ref(false)

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
const deleteProduct = (id) => {
  store.products.splice(id, 1)
  searchUsed.value = false
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
