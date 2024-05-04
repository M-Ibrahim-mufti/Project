<template>
    <section id="Navbar" class="py-2 w-full fixed bg-gradient-to-tr max-lg:h-[60px] from-slate-900 via-slate-800 to-slate-900 z-[100]">
        <div class="container max-xl:!max-w-[900px] max-lg:!max-w-[750px] max-md:!max-w-[600px] max-sm:!max-w-[390px]">
            <div class="flex flex-row justify-between">
                <div class="w-1/4">
                    <div class="flex flex-row items-center">
                        <img class="w-[120px]" src="../assets/logo_transparent.png">
                        <p class="text-4xl ml-[-20px] text-white">ME<e class="font-extrabold">MN</e></p>
                    </div>
                </div>
                <ul id="Dash_items" class="Nav-close max-xl:text-sm max-lg:mt-3 max-lg:text-xl  w-3/5 text-clr flex flex-row justify-end text-lg items-center max-lg:w-1/2 max-lg:flex-col max-lg:justify-center">
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : NavKey == 'Dashboard'}"><router-link @click="NavKey='Dashboard'" to="/Dashboard">Dashboard</router-link></li>
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : NavKey == 'Expense-manager'}"><router-link @click="NavKey='Expense-manager'" to="/Expense-manager">Expense Manager</router-link></li>
                    <li class="mx-4 max-lg:my-[2px]" :class="{'active' : NavKey == 'Income-manager'}"><router-link @click="NavKey='Income-manager'" to="/Income-manager">Income Manager</router-link></li>
                    <li><button @click="handleSignOut" class="flex items-center text-clr py-[6px] px-4 max-lg:py-[2px] max-lg:px-4 text-lg border max-lg:text-base rounded-full bg-transparent">Sign Out</button></li>
                </ul>
                <div class="lg:hidden max-lg:w-1/4 flex justify-end items-start">
                    <a id="Nav-btn"  @click="OpenNavBar">
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
    import { watch } from 'vue';

// Variables
    const IsLoggedIn = ref(false)
    let auth
    const ShowNav = ref(false)
    const ScreenWidth = ref(window.innerWidth)
    const NavKey = ref("Dashboard")

// Functions 
    //  Will Load as soon as the DOM is loaded 
    onMounted(() => {
        auth = getAuth()

        // Calling the OnAuthStateChangeMethod 
        // Which will check if the user has logged in or not
        onAuthStateChanged(auth, (user) => {
            if(user) {
                IsLoggedIn.value = true
            }
            else {
                IsLoggedIn.value = false

            }
        })

        window.addEventListener("resize", removed)
        console.log(NavKey)
    })

    // Clicking on Sign Out will move the user back to the Sign In page
    const handleSignOut = () => {
            signOut(auth).then(() => {
                router.push("/")
        })
    }

    // Removing the classes so that the animation should not interfere during width changes
    const removed = () =>{
        ScreenWidth.value = window.innerWidth
        const Nav = document.getElementById("Dash_items")
        const Navbar = document.getElementById("Navbar")

        if(ScreenWidth.value <= 1024 ){
            Nav.classList.remove("Nav-open", "Nav-close")
            Navbar.classList.remove("opening", "closing")
            Nav.style.transform = 'translateY(-500px)'
        }
        if(ScreenWidth.value > 1024) {
            Nav.style.transform = 'translateY(0px)'
        }
    }

    // Functions for opening and closing of nav-Menu
    const OpenNavBar = () => {
        const Nav = document.getElementById("Dash_items")
        const Navbar = document.getElementById("Navbar")
        if(ShowNav.value === false && IsLoggedIn.value === true ) {
            Nav.classList.add("Nav-open")
            Nav.classList.remove("Nav-close")
            Navbar.classList.add("opening")
            Navbar.classList.remove("closing")
            ShowNav.value = true
        }
        else {
            Nav.classList.add("Nav-close")
            Nav.classList.remove("Nav-open")
            Navbar.classList.add("closing")
            Navbar.classList.remove("opening")
            ShowNav.value = false

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
        animation: link-bold .5s linear forwards;
    }

    @keyframes link-bold {
        0% {
            color: rgb(173,173,173);
            font-weight: normal
        }
        100% {
            color: white;
            font-weight: bolder;
        }
    }

    @media (max-width:1024px) {
        @keyframes drop-down{
            0% {
                transform:translateY(-50px);
            }
            100% {
                transform: translateY(70px);
                display: flex!important;

            }
        }
        @keyframes move-back {
            0% {
                opacity: 1;
                transform: translateY(70px);
            }
            50%{
                opacity: 0;
            }          
            100%{
                opacity: 0;
                transform: translateY(-50px);

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
                height:260px;
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
            animation: Opens .3s forwards;
        }
        .closing{
            animation: closes .5s forwards;
        }
    }
</style>