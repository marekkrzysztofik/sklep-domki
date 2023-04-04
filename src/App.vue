<template>
  <div class="flex flex-column align-items-center">
    <div class="flex  justify-content-center align-items-center" >
      <RouterLink class="no-decoration menu-txt m-3" to="/add-category"
      ><i class="pi pi-plus m-2" />KATEGORIE</RouterLink
    >
    <RouterLink class="m-3" to="/"
      ><img src="../images/logo.png" alt="logo" class="logo"
    /></RouterLink>
    <RouterLink class="no-decoration menu-txt m-3" to="/add-product"
      >NOWY PRODUKT<i class="pi pi-plus m-2"
    /></RouterLink>
    </div>
   
    <RouterView />
  </div>

</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
