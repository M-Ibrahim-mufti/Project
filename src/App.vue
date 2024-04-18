<template>
	<div id="preloader"></div>
	<Navbar v-if="IsLoggedIn"/>
	<router-view  v-if="isLoaderComplete"/>
</template>

<script setup>
	import Navbar from './components/Navbar.vue'
	import {getAuth, onAuthStateChanged} from 'firebase/auth' 
	import {ref, onMounted } from "vue"
    import router from '@/router';

	const isLoaderComplete = ref(false)	
	const IsLoggedIn = ref(false)	
	onMounted(() => {
		const auth = getAuth()

		onAuthStateChanged(auth, (user) => {
			IsLoggedIn.value = !!user
			if (IsLoggedIn.value === true) {
				router.push("/Dashboard")
			}
			else {
				router.push("/")
			}
		})
	})

	window.addEventListener("load", () => {
		setTimeout(() => {
			const Loader = document.getElementById('preloader');
			Loader.style.display = "none";
			isLoaderComplete.value = true;
		}, 2000);
	});
</script>

<style>
  body{
    font-family: serif;
  }

  .text-clr{
    color:rgb(173, 173, 173);
  }

  #preloader{
	background: black url("./assets/Eclipse-1s-200px.gif") no-repeat center center;
	height: 100vh;
	width: 100%;
  }
</style>