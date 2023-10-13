<template>
    <section class="py-2 w-full fixed bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 z-[1]">
        <div class="container max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px]">
            <div class="flex flex-row justify-between">
                <div class="w-1/4">
                    <div class="flex flex-row items-center">
                        <img class="w-[120px]" src="../assets/logo_transparent.png">
                        <p class="text-4xl ml-[-20px] text-white">ME<e class="font-extrabold">MN</e></p>
                    </div>
                </div>
                <ul id="Dash_items" class="w-3/5 text-clr flex flex-row justify-end text-lg items-center max-lg:hidden max-lg:w-1/2 max-lg:flex-col max-lg:justify-center">
                    <li class="mx-4"><a href="/dashboard">Dashboard</a></li>
                    <li class="mx-4"><a href="/Expense-manager">Expense Manager</a></li>
                    <li class="mx-4"><a href="/Income-manager">Income Manager</a></li>
                    <li class="mx-4"><a href="/About">About</a></li>
                </ul>
                <button @click="handleSignOut" class="text-clr py-2 px-4 text-xl border rounded-full bg-transparent max-lg:hidden">Sign Out</button>
                <div class="lg:block max-lg:w-1/4 flex justify-end relative top-[25px] bottom-[10px] right-[20px]">
                    <a id="Nav-btn"  @click="openNavBar">
                        <span class="relative block bg-white w-[40px] h-[2px] top-[14px]"></span>
                        <span class="relative block bg-white w-[40px] h-[2px]"></span>
                        <span class="relative block bg-white w-[40px] h-[2px] bottom-[14px]"></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted,ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut}  from "firebase/auth"
    import router from '@/router';

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

    // Clicking on Sign Out will move the user back to the Sign In page
    const handleSignOut = () => {
            signOut(auth).then(() => {
                router.push("/")
        })
    }

    const openNavBar = () => {
        const nav_btn = document.getElementById("Nav-btn")
        nav_btn.classList.remove("hidden")
        const nav = document.getElementById("Dash_items")
        nav.classList.add("Nav-open")
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
        background-color: white;
        color:#04619f;
        transition: all .7s ease-in;
    }
    #Dash_items li:hover{
        color:white;
        transition: all .5s ease-in;
    }
    @keyframes drop-down{
        0% {
            transform:translateY(0px);
        }
        100% {
            transform: translateY(50px);
            padding-bottom:100px;
        }
    }
    .Nav-open{
        display: flex!important;

        animation:drop-down .5s forwards;
    }
</style>