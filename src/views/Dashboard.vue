<template>
    <div class="bg-image">
        <Welcome/>
        <Charts />
    </div>
</template>

<script setup>

// Imports
    import Navbar from "../components/Navbar.vue"
    import Charts from "../components/Charts.vue"
    import Welcome from "../components/Welcome.vue"
    import { onMounted,ref } from 'vue';
    import { getAuth, onAuthStateChanged} from "firebase/auth"

    
// Variables
    const isloggedin = ref(false)
    let auth
    

// Functions 

    // Will Load as soon as the DOM is loaded 
    onMounted(() => {
        auth = getAuth()

        // Calling the OnAuthstateCHangemethod 
        // which will check if the user has logged in or not
        onAuthStateChanged(auth, (user) => {
            if(user) {
                isloggedin.value = true
            }
            else {
                isloggedin.value = false
            }
        })
    })

</script>

<style scoped>
  .container {
        width:100%;
        max-width: 1140px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
    #Dash_items button:hover{
        background-color: white;
        color:#04619f;
        transition: all .7s ease-in;
    }
    #Dash_items li:hover{
        color:white;
        transition: all .5s ease-in;
    }
    .bg-image{
        background-image: url("../assets//abstract-digital-grid-black-background.jpg");
    }
</style>