<template>
  <Navbar v-if="IsLoggedIn"/>
  <router-view/>
</template>

<script setup>
  import Navbar from './components/Navbar.vue'
  import {getAuth, onAuthStateChanged} from 'firebase/auth' 
  import {ref, onMounted } from "vue"

  
  const IsLoggedIn = ref(false)
  console.log(IsLoggedIn.value)
  
  onMounted(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      IsLoggedIn.value = !!user 
    })
    console.log(IsLoggedIn.value)
  })
</script>

<style>
  body{
      font-family: serif;
  }

  .text-clr{
      color:rgb(173, 173, 173);
  }
</style>