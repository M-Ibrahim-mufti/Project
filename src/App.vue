<template>
	<Navbar v-if="IsLoggedIn"/>
	<router-view/>
</template>

<script setup>
	import Navbar from './components/Navbar.vue'
	import {getAuth, onAuthStateChanged} from 'firebase/auth' 
	import {ref, onMounted } from "vue"

	
	const IsLoggedIn = ref(false)	
	onMounted(() => {
		const auth = getAuth()

		onAuthStateChanged(auth, (user) => {
			IsLoggedIn.value = !!user 
		})
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