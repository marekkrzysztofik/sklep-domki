<template>
  <h1 class="m-3">Dodaj produkt</h1>
  <div class="flex justify-content-center">
    <form @submit.prevent="submit">
      <div class="m-3 pad-20 br-radius-20 bg-white form-grid">
        <div>
          <InputText
            required
            v-model="productForm.name"
            type="text"
            placeholder="Nazwa"
            class="m-3"
          />
        </div>
        <div>
          <InputText
            v-model="productForm.price"
            type="number"
            placeholder="Cena"
            class="m-3"
          />
        </div>
        <Dropdown
          v-model="productForm.type"
          :options="store.type"
          placeholder="Rodzaj"
          class="w-min m-3"
        />
        <Dropdown
          v-model="productForm.animal"
          :options="store.animals"
          placeholder="Zwierzę"
          class="w-min m-3"
        />
        <Textarea name="description" class="m-3" placeholder="Opis" rows="6" />
        <div class="m-left-20">
          <Button
            @click="submit"
            :disabled="!isFormFilled"
            label="Save"
            class="m-3"
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
  price: 0,
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
<style scoped>
.form-grid {
  margin: auto;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 350px);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
</style>
