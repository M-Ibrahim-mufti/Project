<template>
	<div id="preloader"></div>
	<Navbar v-if="IsLoggedIn"/>
	<router-view/>
</template>

<script setup>
	import Navbar from './components/Navbar.vue'
	import {getAuth, onAuthStateChanged} from 'firebase/auth' 
	import {ref, onMounted } from "vue"
    import router from '@/router';

	
	const IsLoggedIn = ref(false)	
	onMounted(() => {
		const auth = getAuth()

		onAuthStateChanged(auth, (user) => {
			IsLoggedIn.value = !!user 
			if (IsLoggedIn.value === true) {
				router.push("/Dashboard")
			}
		})
	})

	window.addEventListener("load", () => {
		setTimeout(() => {
			const Loader = document.getElementById('preloader');
			Loader.style.display = "none";
		}, 2000); // Set the timeout duration in milliseconds (in this example, 2000 milliseconds or 2 seconds)
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