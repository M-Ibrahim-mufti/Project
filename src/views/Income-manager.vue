<template>
    <div class="bg-image">
        <header class="py-32 mx-4 text-clr">
            <div class="container bg-slate-800 Shadows max-xl:!max-w-[900px] max-md-[600px] max-sm-[540px]">
                <div class="w-full py-10 px-5 flex flex-row justify-evenly max-sm:flex-col">
                    <div class="mb-5 text-left w-[50%] max-sm:w-full">
                        <h2 class="text-4xl font-bold text-white mb-5  max-md:text-2xl">Income Manager</h2>
                        <p class="ml-5 text-2xl text-justify max-md:text-lg">Effectively managing income is a cornerstone of financial stability and prosperity. It involves a systematic approach to handling the money one earns, ensuring it is utilized wisely to meet both short-term needs and long-term goals. This process encompasses various key steps, including budgeting, tracking expenses, and setting financial goals. By creating a well-structured budget, individuals can allocate their income to cover essentials like housing, food, and transportation while also earmarking funds for savings and investments. Additionally, regularly monitoring expenses provides valuable insights into spending patterns, enabling adjustments to be made where necessary. Setting clear financial goals, such as saving for a major purchase or planning for retirement, offers direction and purpose to income management efforts.</p>
                    </div>
                    <form class="w-[50%] ml-5 max-md:my-auto max-sm:w-full max-sm:ml-0" @submit.prevent="OnSubmit">
                        <h2 class=" text-white mb-5 text-4xl text-left font-bold">Add Your Incomes</h2>
                        <div class="mx-5 my-auto flex flex-col justify-start mb-5">
                            <label class="text-white text-center font-bold text-2xl mb-3 max-sm:text-left" for="income">Enter your Income Category</label>
                            <input class="bg-slate-800 text-white outline-none border-b-2 text-lg py-2 px-4 capitalize" type="text" v-model="Text" placeholder="Enter your Income Category here">
                        </div>
                        <div class="mx-5 flex flex-col mb-5">
                            <label class="text-white text-center font-bold text-2xl mb-3 max-sm:text-left" for="Budget">Enter Your Income</label>
                            <input class="bg-slate-800 text-white outline-none border-b-2 text-lg py-2 px-4" type="number" v-model="Numbers" placeholder="Enter your Income here">
                        </div>
                        <div class="flex justify-end">
                            <button class="text-2xl py-3 px-6 rounded-[20px] bg-slate-700 text-white" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
        <section class="pb-32 mx-4">
            <div class="container bg-slate-800 py-10 rounded-[20px] max-xl:!max-w-[900px] max-md-[600px] max-sm-[540px]">
                <div class="text-4xl ml-5 font-bold mb-5">
                    <h2 class="text-white text-left">List of your Incomes</h2>
                </div>
              <div class="w-full text-center flex justify-start mx-5 max-sm:justify-center max-sm:mx-auto" v-for="val in Income" :key="val">
                <div class="pop_up w-[95%] bg-slate-900 text-clr mb-3 flex flex-row border-2 border-gray-600 items-center rounded-[5px]"> 
                        <h2 class="w-[40%] text-left text-2xl mx-3 py-3 pr-3 border-r-4 border-gray-600 max-sm:text-base">{{ val.Income_Category }}</h2>
                        <h2 class="w-[40%] text-left text-2xl mx-3 py-3 pr-3 max-sm:text-base">{{ val.Income }}</h2>
                        <div class="flex w-full mr-5 text-xl text-red-600 justify-end items-center  max-sm:w-[20%]">
                            <button @click="EditTask(val.id)" class="max-sm:w-[50%] max-sm:py-1 max-sm:px-2 max-sm:mr-1 max-sm:text-sm max-sm:rounded-full rounded-[20px] text-lg px-6 py-2 mr-5 text-white bg-green-900 hover:bg-green-600 transition-all duration-300 ease-in ">E</button>
                            <button @click="DeleteData(val.id)" class="max-sm:w-[50%] max-sm:py-1 max-sm:px-2 max-sm:ml-1 max-sm:text-sm rounded-[20px] text-lg px-6 py-2 text-white bg-red-900 hover:bg-red-600 transition-all duration-300 ease-in">X</button>                        
                        </div>
                    </div>
                </div>
                <div>
                    <div class="pop_up mx-5 w-[95%] bg-slate-900 text-clr mb-3 flex flex-row border-2 border-gray-600 items-center rounded-[5px] max-sm:mx-auto ">
                        <h2 class="w-[40%] text-left text-2xl mx-3 py-3 pr-3 border-r-4 border-gray-600 max-sm:text-base">Total income is </h2>
                        <h2 class="w-[60%] text-left text-2xl mx-3 py-3 pr-3 max-sm:text-base">{{ TotalIncome }}</h2>
                    </div>
                </div>
            </div>
        </section>
        <section v-if="ShowEditPopUp" class="edit-popup text-clr pb-20 mx-4 bg-slate-800 text-center max-xl:!max-w-[800px] max-md:!max-w-[600px] max-sm:!max-w-[400px]">
            <div class="flex flex-row justify-evenly py-10 max-sm:flex-col">
                <div class="w-[50%] text-left ml-5 max-sm:w-full max-sm:ml-0">
                    <h2 class="text-4xl text-white font-bold mb-5 max-sm:text-2xl max-sm:text-center">Edit Income</h2>
                    <p class="text-2xl text-justify ml-5 max-sm:text-base max-sm:mx-4 max-sm:mb-4">Made a mistake while typing not a issue just re write what you mistyped and fix the issue just by clicking save if you dont have any issue just press cancel and you will be backed out to previous screen</p>
                </div>
                <div class="w-[40%] max-sm:w-full">
                    <h2 class="text-4xl text-white font-bold mb-5 max-sm:text-2xl">Edit your Income Here</h2>
                    <div class="mb-10 max-sm:mx-4">
                        <label class="block text-left text-2xl mb-3 text-white" for="editName">Income Name</label>
                        <input class="w-full outline-none border-b-2 pl-3 bg-slate-800 border-gray-600 text-xl capitalize" type="text" v-model="EditsIncome.name" id="editName">
                    </div>
                    <div class="max-sm:mx-4">
                        <label class="block text-left text-2xl mb-3 text-white" for="editPrice">Income Price</label>
                        <input class="w-full outline-none border-b-2 pl-3 bg-slate-800 border-gray-600 text-xl" type="number" v-model="EditsIncome.price" id="editPrice">
                    </div>
                </div>
            </div>
            <div class="mt-10 flex flex-row justify-center">
                <button class="text-2xl mr-5 py-2 px-10 bg-slate-700 rounded-3xl hover:bg-white transition-all duration-300 ease-in" @click="SaveEdit">Save</button>
                <button class="text-2xl ml-5 py-2 px-10 bg-slate-700 rounded-3xl hover:bg-white transition-all duration-300 ease-in"  @click="CancelEdit">Cancel</button>
            </div>
        </section>
    </div>
</template>

<script setup>
    // Same as Expense Manager with different Variables 

    import { onMounted, ref } from 'vue';
    import { onSnapshot, doc, collection, addDoc, deleteDoc,updateDoc } from 'firebase/firestore';
    import { db } from '@/main';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    
    let auth
    const AU = ref()
    const Numbers = ref("")
    const Text = ref("")
    const CurrentId = ref() 
    const Income = ref([])
    let TotalIncome = 0
    const Users = collection(db, "Users")
    const EditsIncome = ref({id:"", name:"", price:""})
    const ShowEditPopUp = ref(false)

    const CancelEdit = () =>{
        ShowEditPopUp.value = false
    }

    const SaveEdit = () => {
        const IncomeRef = doc(Users, CurrentId.value,"Income", EditsIncome.value.id)
        updateDoc(IncomeRef, {
            Income_Category: EditsIncome.value.name,
            Income: EditsIncome.value.price
        })
        
        ShowEditPopUp.value = false
    }
    const EditTask = (id) =>{
        const income = Income.value.find(item => item.id === id )

        if(income) {
            EditsIncome.value = {
                id:income.id,
                name:income.Income_Category, 
                price:income.Income
            }
            ShowEditPopUp.value = true
        }
    }


    const OnSubmit = async() => {
        if(Text.value == "" && Numbers.value ==""){
            alert("fields cannot be empty")
        }
        else{
            addDoc(collection(Users, CurrentId.value, "Income"), {
                Income_Category : Text.value,
                Income : Numbers.value
            })
        }

        Text.value = ""
        Numbers.value = ""
    }

    const DeleteData = async(id) => {
        const ExpenseRef = doc(Users, CurrentId.value, "Income", id)
        deleteDoc(ExpenseRef)

        Income.value = Income.value.filter(items => items.id !== id)
    }

    onSnapshot(Users, (Query) => {
        Query.forEach((doc)=> {
            if(doc.data().User_Email === AU.value || doc.data().User_Email === capitalizeFirstLetter(AU.value)){
                CurrentId.value = doc.id
                onSnapshot(collection(Users, CurrentId.value, "Income"), (InnerQuery) => {
                    Income.value = []
                    TotalIncome = 0
                    InnerQuery.forEach((doc) => {
                        Income.value.push({id:doc.id, ...doc.data()})
                        TotalIncome = TotalIncome + doc.data().Income
                        
                    })
                })
            }
        })
    })

    onMounted(() => {
        auth = getAuth()
        onAuthStateChanged (auth, (user) => {
            AU.value = user.email
        })
    })


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<style scoped>
    .container {
        width:100%;
        max-width: 1140px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
    .bg-image{
         background-image: url("../assets//abstract-digital-grid-black-background.jpg");
    }
    .Shadows{
        box-shadow : rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 20px;
    }
    @keyframes pop {
        0%{
            transform: translateY(0px);
        }
        100%{
            transform: translateY(-5px);
            color:white;

        }
    }
    .pop_up:hover{
        animation: pop .6s forwards;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .edit-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width:100%;
        max-width: 1140px;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index:2;
    } 
    
</style>
