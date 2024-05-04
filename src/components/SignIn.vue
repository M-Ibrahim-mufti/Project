<template>
    <section class="h-screen w-screen flex justify-center items-center overflow-hidden bg-image">
        <div class="container border-gray-300 max-xl:!max-w-[900px] max-lg:!max-w-[780px] max-md:!max-w-[600px] max-sm:!max-w-[340px]">
            <div class="flex flex-row flew-wrap max-md:flex-col">
                <div id="image" class="w-1/2 h-full max-md:w-full max-md:hidden">
                    <img class="object-contain w-full h-[760px] bg-white border-r-2 rounded-l-[20px]" src="../assets/Side_image.jpg" alt="">
                </div>
                <div id="sign-in" class=" bg-slate-800 w-1/2 text-center rounded-r-[20px] max-md:w-full max-md:h-[760px] max-md:rounded-[20px] max-sm:h-[640px]">
                    <h2 class="text-5xl text-white my-5 max-sm:text-3xl">MEMS</h2>
                    <div class="mt-14 mb-10 max-md:mb-4 max-md:mt-9 max-sm:mt-5" >
                        <h2 class="text-3xl text-white max-sm:text-2xl">Welcome to MEMS</h2>
                    </div>
                    <!-- Display the Error messages that occurs during The Sign in -->
                    <p v-if="ErrorMessage" class="bg-red-600 pl-5 mx-5 mb-2 text-left  text-white borders">{{ ErrorMessage }}</p>
                    <div class="mx-20 text-left text-white mb-6 max-sm:mx-8 ">
                        <h2 class="text-xl text-white mb-4 max-sm:text-base max-sm:mb-2">Enter your Email</h2>
                        <p><input class="inp bg-slate-800 px-4 py-2 w-full border border-gray-500" type="text" placeholder="Type your Email" v-model="Email" @keyup.enter="SignIn"></p>
                    </div>
                    <div class="mx-20 text-white text-left mb-3 max-sm:mx-8">
                        <h2 class="text-xl mb-4 max-sm:mb-2 max-sm:text-base">Enter your Password</h2>
                        <p><input class="inp bg-slate-800 px-4 py-2 w-full border border-gray-500" type="password" placeholder="Type your Password" v-model="Password" @keyup.enter="SignIn"></p>
                        <p class="cursor-pointer flex justify-end mt-2 text-white hover:text-red-500 transition-all duration-500 ease-in">Forgot Your Password ?</p>
                    </div>
                    <div class="mx-20 text-center mb-5">
                        <button class="btn" @click="SignIn" >Sign In</button>
                    </div>
                    <div class="flex flex-row justify-center text-gray-400 text-2xl mb-6 max-sm:mb-3">
                        <p>-----</p>
                        <p>or</p>
                        <p>-----</p>
                    </div>
                    <div id="google-btn" @click="signInWithGoogle" @mouseover="IsVisible" @mouseout="IsHidden" class="flex justify-center items-center mx-32 max-sm:mx-8" >
                        <img src="../assets/icons8-google-48.png">
                        <p id="g-text" :class="!ShowText ? 'hidden' : 'visible'">Sign In with Google</p>
                    </div>
                    <div class="mx-20 my-10">
                        <h2 class="text-xl text-white">New to MEMS? <a @click="CreateAccountPage" class="cursor-pointer text-2xl text-clr hover:text-red-500 transition-all duration-500 ease-in">Create Account</a></h2>
                    </div>
                </div>
                <SignUp/>
            </div>
        </div>
    </section>
</template>

<script setup>
// Imports 

    import SignUp from "../components/SignUp.vue"
    import { ref } from "vue"
    import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { useRouter } from "vue-router"
    import { where,getDocs, query ,addDoc, collection} from "firebase/firestore";
    import { db } from "@/main";

//  Variable

    const Router = useRouter()
    const ShowText = ref(false);
    const ErrorMessage = ref("")
    const Email = ref("")
    const Password = ref("")

// Functions 

    // When hovering over the google icon it will slide right and display the Sign in to google text
    const IsVisible = () => {
        ShowText.value = true;
    }

    // When hovering over the google icon it will remove the (Sign in to google) text
    const IsHidden = () => {
        ShowText.value = false;
    }

    // Adding and removing animation and reappearing it on click 
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
    const SignIn = () => {

        // getting authentication
        const auth = getAuth()  

        // Adding function signing with Email and password that is to be passed inputting email and password
        signInWithEmailAndPassword(auth, Email.value, Password.value)
        .then(() => {

            // If successfully logged in then push to the Dashboard pages
            Router.push('/Dashboard')
        })

        // if failed it will throw the error and display respected message on the screen
        .catch((error) =>{
            if (error.code == "auth/invalid-email") {
                ErrorMessage.value = "Please enter correct email"
            }
            else if (error.code == "auth/user-not-found") {
                ErrorMessage.value = "no account with this email was found"
            }
            else if (error.code == "auth/wrong-password") {
                ErrorMessage.value = "Incorrect Password"
            }
            else {
                ErrorMessage.value = "Email or Password incorrect"
            }
        })
    }

    // This code is generated by ChatGPT will learn about it later.....
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((user) => {

            const User_Email = user.user.email;
            const UsersCollection = collection(db, 'Users');
            const NewUserCollection = collection(db, 'New_Users')

            // Check if the user already exists in the database
            const Queries = query(UsersCollection, where('User_Email', '==', User_Email));
            const Queries2 = query(NewUserCollection, where('email', '==', User_Email))

            getDocs(Queries2)
            .then((QuerySnapshot) => {
                if(QuerySnapshot.size === 0) {
                    addDoc(NewUserCollection, {
                        Note : "Google Login",
                        email : User_Email
                    })
                    .then((DocRef) => {
                        console.log("User added to dataBase with ID", DocRef.id)
                    })
                    .catch((error) => {
                        console.log("Error adding to dataBase:", error)
                    })
                }
                else {
                    console.log("user Already Exist in database")
                }
            })
            .catch((error) => {
                console.log("Error adding to the database.", error)
            })
            getDocs(Queries)
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    
                    // If the user doesn't exist, add them to the database
                    addDoc(UsersCollection, {
                        User_Email: User_Email
                    })
                    .then((DocRef) => {
                        console.log('User added to the database with ID: ', DocRef.id);
                    })
                    .catch((error) => {
                        console.error('Error adding user to the database: ', error);
                    });
                } 
                else {
                    console.log('User already exists in the database');
                }
            })
            .catch((error) => {
                console.error('Error checking for user existence: ', error);
            });
            Router.push('/Dashboard')
        });
    }

    window.addEventListener("load", () => {
        
    })

        
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
	#google-btn:hover{
        visibility: visible;
        animation: draw-border 1s forwards !important;
        /* animation: slide-left .5s forwards; */
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
	@media (max-width:640px){
        .btn {
            font-size: 24px;
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
                font-size: 20px;
                display: flex;
                align-items: center;
            }
        }
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