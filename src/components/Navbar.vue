<template>
    <section id="Navbar" class="py-2 w-full fixed bg-gradient-to-tr max-lg:h-[60px] from-slate-900 via-slate-800 to-slate-900 z-[100]">
        <div class="container max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px]">
            <div class="flex flex-row justify-between">
                <div class="w-1/4">
                    <div class="flex flex-row items-center">
                        <img class="w-[120px]" src="../assets/logo_transparent.png">
                        <p class="text-4xl ml-[-20px] text-white">ME<e class="font-extrabold">MN</e></p>
                    </div>
                </div>
                <ul id="Dash_items" class="Nav-close max-xl:text-sm max-lg:mt-3 max-lg:text-xl  w-3/5 text-clr flex flex-row justify-end text-lg items-center max-lg:w-1/2 max-lg:flex-col max-lg:justify-center">
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : Navkey == 'Dashboard'}"><router-link @click="Navkey='Dashboard'" to="/dashboard">Dashboard</router-link></li>
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : Navkey == 'Expense-manager'}"><router-link @click="Navkey='Expense-manager'" to="/Expense-manager">Expense Manager</router-link></li>
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : Navkey == 'Income-manager'}"><router-link @click="Navkey='Income-manager'" to="/Income-manager">Income Manager</router-link></li>
                    <li class="mx-4 max-lg:mb-[2px]" :class="{'active' : Navkey == 'About'}"><router-link @click="Navkey='About'" to="/About">About</router-link></li>               
                    <li><button @click="handleSignOut" class="flex items-center text-clr py-[6px] px-4 max-lg:py-[2px] max-lg:px-4 text-lg border max-lg:text-base rounded-full bg-transparent">Sign Out</button></li>
                </ul>
                <div class="lg:hidden max-lg:w-1/4 flex justify-end items-start">
                    <a id="Nav-btn"  @click="openNavBar">
                        <span class="relative block bg-white w-[40px] h-[2px] mb-2"></span>
                        <span class="relative block bg-white w-[40px] h-[2px] mb-2"></span>
                        <span class="relative block bg-white w-[40px] h-[2px]"></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Imports
    import { onMounted,ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut}  from "firebase/auth"
    import router from '@/router';

// Variables
    const isloggedin = ref(false)
    let auth
    const showNav = ref(false)
    const screenWidth = ref(window.innerWidth)
    const Navkey = ref('Dashboard')

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

        window.addEventListener("resize", removed)

    })

    // Clicking on Sign Out will move the user back to the Sign In page
    const handleSignOut = () => {
            signOut(auth).then(() => {
                router.push("/")
        })
    }

    // Removing the classes so that the animation should not interfere during width changes
    const removed = () =>{
        screenWidth.value = window.innerWidth
        const nav = document.getElementById("Dash_items")
        const Navbar = document.getElementById("Navbar")
        if(screenWidth.value <= 1024 ){
            nav.classList.remove("Nav-open", "Nav-close")
            Navbar.classList.remove("opening", "closing")
            nav.style.transform = 'translateY(-500px)'
        }
        if(screenWidth.value >1024) {
            nav.style.transform = 'translateY(0px)'
        }
    }

    // Functions for openning and closing of nav-Menu
    const openNavBar = () => {
        const nav = document.getElementById("Dash_items")
        const Navbar = document.getElementById("Navbar")
        if(showNav.value === false ) {
            nav.classList.add("Nav-open")
            nav.classList.remove("Nav-close")
            Navbar.classList.add("opening")
            Navbar.classList.remove("closing")
            showNav.value = true
        }
        else {
            nav.classList.add("Nav-close")
            nav.classList.remove("Nav-open")
            Navbar.classList.add("closing")
            Navbar.classList.remove("opening")
            showNav.value = false

        }
        
    }
    
</script>

<style scoped>
    .container {
        width:100%;
        max-width: 1400px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
    #Dash_items button:hover{
        background-color: rgba(5, 12, 15, 0);
        color:white;
        transition: all .5s ease-in;
    }
    #Dash_items li:hover{
        color:white;
        transition: all .5s ease-in;
    }
    .active {
        color: white;
        font-weight: 700;
        transition: all .4s ease;
    }

    @media (max-width:1024px) {
        @keyframes drop-down{
            0% {
                transform:translateY(-50px);
            }
            100% {
                transform: translateY(50px);
                display: flex!important;

            }
        }
        @keyframes move-back {
            0% {
                transform: translateY(0px);
            }          
            100%{
                transform: translateY(-500px);

            }
        }
        @keyframes Opens {
            0% {
                height:0;
            }
            100%{
               height: 260px;
            }
        }
        
        @keyframes closes {
            0%{
                height:200px;
            }
            100% {
                height: 60px;
   
            }
        }
        .Nav-open{
            z-index: 1;
            animation:drop-down .5s forwards;
        }
        .Nav-close {
            z-index:1;
            animation: move-back .5s forwards;
        }
        #Nav-btn{
            margin-top: 16px;
        }
        .opening{
            animation: Opens .5s forwards;
        }
        .closing{
            animation: closes .5s forwards;
        }
    }
</style>