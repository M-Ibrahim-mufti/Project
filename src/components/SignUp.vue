<template>
    <div id="sign-up" class="RSI w-1/2 bg-slate-800 text-center rounded-r-[20px] max-md:w-full max-md:h-[760px] max-md:rounded-[20px] max-sm:h-[640px]">
        <h2 class="text-5xl my-5 text-white max-sm:text-3xl">MEMS</h2>
        <div class="mt-14 mb-10 text-white max-md:mb-4 max-md:mt-9 " >
            <h2 class="text-3xl max-sm:text-2xl">Welcome to MEMS</h2>
        </div>
        <p v-if="ErrorMessage" class="bg-red-600 pl-5 mx-5 mb-2 text-left text-white borders">{{ ErrorMessage }}</p>
        <div class="mx-20 text-left mb-5 max-sm:mx-8">
            <h2 class="text-xl text-white mb-4 max-sm:text-base max-sm:mb-2">Create your Email</h2>
            <p><input class="bg-slate-800 text-white inp px-4 py-2 w-full border border-gray-500" type="text" placeholder="Type your Email" v-model="Email" @keyup.enter="SignUp"></p>
        </div>
        <div id="pass1" class="mx-20 text-left mb-5 max-sm:mx-8">
            <h2 class="text-xl text-white mb-4 max-sm:text-base max-sm:mb-2">Create your Password</h2>
            <p><input class="bg-slate-800 text-white inp px-4 py-2 w-full border border-gray-500" type="password" placeholder="Type your Password" v-model="Password" @keyup.enter="SignUp"></p>
        </div>
        <div class="mx-20 text-center my-10">
            <button class="btn" @click="SignUp" >Sign up</button>
        </div>
        <div class="flex flex-row justify-center text-gray-400 text-2xl mb-6">
            <p>-----</p>
            <p>or</p>
            <p>-----</p>
        </div>
        <div class="mx-20 my-10 max-sm:mx-5">
            <h2 class="text-xl text-white">Already have an Account <a @click="SignInPage" class="cursor-pointer text-2xl text-clr hover:text-red-500 transition-all duration-500 ease-in">Sign in</a></h2>
        </div>
    </div>
</template>

<script setup>

// Imports
    import { ref } from "vue"
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from "vue-router"
    import { addDoc, collection } from "firebase/firestore"
    import { db } from "../main.js"

// Variables
    const Router = useRouter()
    const ErrorMessage = ref("")
    const Email = ref("")
    const Password = ref("")
// Functions 

    // Adding and removing animation and reappearing it on click 
    function SignInPage(){
        let SU = document.getElementById("sign-up")
        SU.classList.remove('Display')
        SU.classList.add("Remove")
        let SI = document.getElementById("sign-in")
        SI.classList.remove("Remove")
        SI.classList.add('Display')
    }
    
    // Creating new User and adding those User to the DataBase with their password and Emails
    const SignUp = () => {
        // checking if user has signed up or not 
        console.log("signed up Successfully")
        const auth = getAuth()
        
        // Creation user with Email and Passwords
        createUserWithEmailAndPassword(auth, Email.value, Password.value)
        .then(() => {
                alert("Successfully Created the Account")

                // Calling The DataBase and saving the logged in user in the database
                createUser(Email.value, Password.value)
                Router.push('/dashboard')
        })
        .catch((error) => {

            // Catching error if user valid an invalid email 
            if(error.code == "auth/invalid-email"){
                ErrorMessage.value = "Please use this format for email something@something.com"
            }
            else {
                alert(error.code)
            }
        })
    }

    // Creation DataBase collection and adding new user to it
    const createUser = async(Email, Password) => {
        try {

        // Created user will be stored in NewUser collection
            const ColRef = collection(db, "New_Users")
            const Users = collection(db, "Users")

            // the email & password passed from the Parameter will be added to data base with key value email and password 
            await addDoc(ColRef, {
                email: Email, 
                password: Password
            })
            // Adding Email Of the user to the second collection so that it can access its components with ease
            addDoc(Users, {
                User_Email : Email
            })
        }
        catch (error) {
            alert("Having issue saving user data in the database", error)
        }
    }

</script>

<style scoped>
    .borders{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    
    .btn{
        font-size: 25px;
        border: 2px solid;
        padding: 6px 55px;
        color: rgb(218, 217, 217);
        border-radius: 30px;
        background-color: rgb(58, 58, 58);
        border: none;
    }
    @media (max-width:640px){
        .btn {
            font-size: 22px;
        }
    }
    .btn:hover{
        background-color: black;
        color:white;
        transition: all .5s ease;
    }
    .inp {    
        outline: none;
        border: none;
        border-bottom: 2px solid rgb(218, 217, 217);
    }
    .RSI{
        opacity: 0;
        display:none;

    }

</style>