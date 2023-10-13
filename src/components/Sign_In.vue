<template>
    <section class="py-32 bg-image">
        <div class="container  border-gray-300 ">
            <div class="flex flex-row flew-wrap">
                <div id="image" class="w-1/2 h-full">
                    <img class="object-fill w-full h-[920px] border-r-2 rounded-l-[20px]" src="../assets/Side_image.jpg" alt="">
                </div>
                <div id="sign-in" class=" bg-slate-800 w-1/2 text-center rounded-r-[20px]">
                    <h2 class="text-5xl text-white my-7">MEMS</h2>
                    <div class="mt-24 mb-10" >
                        <h2 class="text-3xl text-white">Welcome to MEMS</h2>
                    </div>
                    <!-- Display the Error messages that occurs during The Sign in -->
                    <p v-if="errorMessage" class="bg-red-600 pl-5 mx-20 mb-2 text-left text-white borders">{{ errorMessage }}</p>
                    <div class="mx-20 text-left text-white mb-6">
                        <h2 class="text-xl text-white mb-4">Enter your Email</h2>
                        <p><input class="inp bg-slate-800 px-4 py-2 w-full border border-gray-500" type="text" placeholder="Type your Email" v-model="Email" @keyup.enter="Sign_in"></p>
                    </div>
                    <div class="mx-20 text-white text-left mb-6">
                        <h2 class="text-xl mb-4">Enter your Password</h2>
                        <p><input class="inp bg-slate-800 px-4 py-2 w-full border border-gray-500" type="password" placeholder="Type your Password" v-model="Password" @keyup.enter="Sign_in"></p>
                        <p class="cursor-pointer flex justify-end mt-2 text-white hover:text-red-500 transition-all duration-500 ease-in">Forgot Your Password ?</p>
                    </div>
                    <div class="mx-20 text-center mb-6">
                        <button class="btn" @click="Sign_in" >Sign In</button>
                    </div>
                    <div class="flex flex-row justify-center text-gray-400 text-2xl mb-6">
                        <p>-----</p>
                        <p>or</p>
                        <p>-----</p>
                    </div>
                    <div id="google-btn" @click="signInWithGoogle" @mouseover="isvisible" @mouseout="ishidden" class="flex justify-center items-center mx-32" >
                        <img src="../assets/icons8-google-48.png">
                        <p id="g-text" :class="!showtext ? 'hidden' : 'visible'">Sign In with Google</p>
                    </div>
                    <div class="mx-20 my-20">
                        <h2 class="text-xl text-white">New to MEMS? <a @click="CreateAccountPage" class="cursor-pointer text-2xl text-clr hover:text-red-500 transition-all duration-500 ease-in">Create Account</a></h2>
                    </div>
                </div>
                <Sign_UP/>
            </div>
        </div>
    </section>
</template>

<script setup>
// Imports 

    import Sign_UP from "../components/Sign_up.vue"
    import { onMounted, onUnmounted, ref } from "vue"
    import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { useRouter } from "vue-router"
    import { Query, QuerySnapshot, addDoc, collection, getDocs, onSnapshot, runTransaction } from "firebase/firestore";
    import { db } from "@/main";

//  Variable

    const router = useRouter()
    const showtext = ref(false);
    const data = ref("Successfully logged in")
    const errorMessage = ref("")
    const Email = ref("")
    const Password = ref("")
    const New_users = collection (db, "New_Users")
    const Users = collection(db, "Finance")
// Functions 

    // When hovering over the google icon it will slide right and display the Sign in to google text
    const isvisible = () => {
        showtext.value = true;
    }

    // When hovering over the google icon it will remove the (Sign in to google) text
    const ishidden = () => {
        showtext.value = false;
    }

    // Adding and removing animatin and reappearing it on click 
    function CreateAccountPage() {
        let SI = document.getElementById("sign-in")
        SI.classList.add("Remove")
        SI.classList.remove("Display")
        let SU = document.getElementById("sign-up")
        SU.classList.remove('RSI')
        SU.classList.remove("Remove")
        SU.classList.add("Display")
    } 

    // Creating a Sign in function and checking if the User is a Registered user or not 
    const Sign_in = () => {
        // getting authentication
        const auth = getAuth()  
        // Adding function signing with Email and password that is to be passed inputting email and password
        signInWithEmailAndPassword(auth, Email.value, Password.value)
        .then(() => {
            // just to check if the user is logged in correctly
            console.log(data.value)
            console.log(auth.currentUser)

            // If successfully loggend in then push to the Dashboard pages
            router.push('/dashboard')
        })

        // if failed it will throw the error and display respected message on the screen
        .catch((error) =>{
            if (error.code == "auth/invalid-email") {
                errorMessage.value = "Please enter correct email"
            }
            else if (error.code == "auth/user-not-found") {
                errorMessage.value = "no account with this email was found"
            }
            else if (error.code == "auth/wrong-password") {
                errorMessage.value = "Incorrect Password"
            }
            else {
                errorMessage.value = "Email or Password incorrect"
            }
        })
    }

    // user can sign in with google by clicking on the Sign in with google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result)=> {
            console.log(result.user)
            router.push("/dashboard_comp")
        })
    }


        
</script>

<style scoped>
    .borders{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    .container {
        width:100%;
        max-width:1200px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; 
        border-radius: 20px;
    }
    .bg-image{
        background-image: url("../assets//abstract-digital-grid-black-background.jpg");
        background-size: cover;
    }
    /* .body::before {
        content: "";
        background-image: url("../assets/abstract-digital-grid-black-background.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position:center center;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    } */
    #google-btn:hover{
        visibility: visible;
        animation: draw-border 1s forwards !important;
        animation: slide-left .5s forwards;
        cursor: pointer;
    }

    @keyframes draw-border {
        0% {
            box-shadow: 0 0 0 0 rgba(255,99,71, 0);
            padding: 0, 0;
        }
        100% {
            box-shadow: 0 0 0 2px rgb(245, 237, 227);
            padding:5px 30px;
            border-radius: 60px;
            background-color: black;
            color:white;
            border:none;

        }
        
    }
    .hidden {
        display: none;
    }
    .visible{
        display: block;
        animation: slide-up 1s forwards;
        border:none;

        
    }
    @keyframes slide-up {
        0% {
            transform:  translateY(-40px);
            opacity:0;
        }
        100% {
            transform: translateX(0);
            opacity:1;
            font-size: 24px;
        }
        
    }
    @keyframes slide-left {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(-40px);
        }
    }

    .btn{
        font-size: 25px;
        padding: 6px 55px;
        color: rgb(218, 217, 217);
        border-radius: 30px;
        background-color: rgb(58, 58, 58);
    }
    .btn:hover{
        background-color: black;
        color:white;
        transition: all 2s ease;
    }
    .inp {    
        outline: none;
        border: none;
        border-bottom: 2px solid rgb(218, 217, 217);
    }

    .Display{
        animation: Display .6s forwards;
    }
    .Remove {
        animation: Remove .6s forwards;
        display: none;
    }
    @keyframes Display {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes Remove {
        0% {
            opacity: 1;
        }
        100% {
            opacity:0;
        }
    }

</style>