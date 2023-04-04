<template>
  <h1 class="m-3">Dodaj produkt</h1>
  <div class="flex justify-content-center">
    <form @submit.prevent="submit">
      <div class="m-3 pad-20 br-radius-20 bg-white flex flex-column">
        <div>
          <InputText
            v-model="productForm.name"
            type="text"
            placeholder="Nazwa"
            class="w-min m-3"
          />
          <Dropdown
            v-model="productForm.type"
            :options="store.type"
            placeholder="Rodzaj"
            class="w-min m-3"
          />
        </div>
        <div>
          <InputText
            v-model="productForm.price"
            type="number"
            placeholder="Cena"
            class="w-min m-3"
          />
          <Dropdown
            v-model="productForm.animal"
            :options="store.animals"
            placeholder="Zwierzę"
            class="w-min m-3"
          />
        </div>
        <div class="m-30-auto">
          <Button
            @click="submit"
            :disabled="!isFormFilled"
            label="Save"
            class="width-120"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import { useStore } from '@/stores/store.js'

const store = useStore()
const router = useRouter()
const productForm = reactive({
  name: '',
  type: '',
  animal: '',
  price: '',
})

const isFormFilled = computed(() => {
  for (const key in productForm) {
    if (!productForm[key]) {
      return false
    }
  }
  return true
})
const submit = () => {
  productForm.priceEU = (productForm.price / 4.75).toFixed(2)
  store.products.push(productForm)
  router.push('/')
}
</script>
