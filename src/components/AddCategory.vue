<template>
  <h1 class="m-3">Dodaj nową kategorię</h1>
  <div class="flex justify-content-center">
    <div class="flex justify-content-center">
      <form class="flex" @submit.prevent="submitType">
        <div class="m-3 pad-20 br-radius-20 bg-white flex">
          <div class="m-3">
            <h2>Rodzaje domków</h2>
            <div v-for="item in store.type">
              <div class="flex align-items-center">
                <p>{{ item }}</p>
                <button
                  @click="deleteType(store.type.indexOf(item))"
                  class="btn-icon btn-icon-danger m-2"
                >
                  <i class="pi pi-ban"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="m-3">
            <h2>Dodaj nowy rodzaj</h2>
            <InputText
              name="typeName"
              type="text"
              placeholder="Nazwa"
              class="m-3"
              required
            />
            <Button type="submitType" label="Save" class="m-3" />
          </div>
        </div>
      </form>
    </div>
    <div class="flex justify-content-center">
      <form class="flex" @submit.prevent="submitAnimal">
        <div class="m-3 pad-20 br-radius-20 bg-white flex">
          <div class="m-3">
            <h2>Rodzaje zwierząt</h2>
            <div v-for="item in store.animals">
              <div class="flex align-items-center">
                <p>{{ item }}</p>
                <button
                  @click="deleteAnimal(store.animals.indexOf(item))"
                  class="btn-icon btn-icon-danger m-2"
                >
                  <i class="pi pi-ban"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="m-3">
            <h2>Dodaj nowe zwierzę</h2>
            <InputText
              name="animalName"
              type="text"
              placeholder="Nazwa"
              class="m-3"
              required
            />
            <Button type="submitAnimal" label="Save" class="m-3" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/stores/store.js'

const store = useStore()

const deleteType = (id) => {
  store.type.splice(id, 1)
}
const deleteAnimal = (id) => {
  store.animals.splice(id, 1)
}
const submitType = (event) => {
  const { typeName } = Object.fromEntries(new FormData(event.target))
  store.type.push(typeName)
}
const submitAnimal = (event) => {
  const { animalName } = Object.fromEntries(new FormData(event.target))
  store.animals.push(animalName)
}
</script>

