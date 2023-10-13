<template>
    <div class="bg-image">
        <header class="py-32 mx-4 text-clr ">
            <div class="container bg-slate-800 Shadows max-xl:!max-w-[900px] max-md-[600px] max-sm-[540px]">
                <div class=" w-full py-10 px-5 flex flex-row justify-evenly max-sm:flex-col">
                    <div class="mb-5 text-left w-[50%] max-sm:w-full">
                        <h2 class="text-4xl text-white text-left font-bold mb-5 max-md:text-2xl">Expense Manager</h2>
                        <p class="ml-5 text-2xl text-justify max-md:text-lg">Managing your expenses is crucial for maintaining financial stability. To add a new expense, simply navigate to the 'Add Expense' section and fill in the necessary details, such as the expense name and cost. If you need to make changes to an existing expense, head over to the 'Modify Expense' section, select the expense you want to adjust, and update the relevant information. In case you need to remove an expense, visit the 'Delete Expense' section, choose the expense you wish to delete, and confirm the action. These straightforward steps ensure that you have full control over your financial records, allowing you to make informed decisions and stay on top of your budget.</p>
                    </div>

                    <form class="w-[50%] ml-5 max-md:my-auto max-sm:w-full max-sm:ml-0" @submit.prevent="onSubmit">
                        <h2 class=" text-white mb-5 text-4xl text-left font-bold">Add Your Expenses</h2>
                        <div class="mx-5 my-auto flex flex-col justify-start mb-5">
                            <label class="text-white text-center font-bold text-2xl mb-3 max-sm:text-left" for="Expenses">Enter your Expense</label>
                            <input class="bg-slate-800 text-white outline-none border-b-2 text-lg py-2 px-4" type="text" v-model="text" placeholder="Enter your Expense Here">
                        </div>
                        <div class="mx-5 flex flex-col mb-5">
                            <label class="text-white text-center font-bold text-2xl mb-3 max-sm:text-left" for="Budget">Enter price of that Expense</label>
                            <input class="bg-slate-800 text-white outline-none border-b-2 text-lg py-2 px-4" type="number" v-model="number" placeholder="Enter price of the expense">
                        </div>
                        <div class="flex justify-end">
                            <button class="text-2xl py-3 px-6 rounded-[20px] bg-slate-700 text-white" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
        <section class="pb-32 mx-4">
            <div class="container bg-slate-800 py-10 rounded-[20px] Shadows max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px]">
                <div class="text-4xl ml-5 font-bold mb-5">
                    <h2 class="text-white text-left">List of your Expenses</h2>
                </div>
                <div class="w-full flex justify-start mx-5 max-sm:justify-center max-sm:mx-auto" v-for="val in Expense" :key="val">
                    <div class="pop_up w-[95%] bg-slate-900 text-clr mb-2 flex flex-row border-2 border-gray-600 items-center rounded-[5px] "> 
                        <h2 class="w-[40%] text-left text-2xl mx-3 py-3 pr-3 border-gray-600 border-r-4 max-sm:text-base">{{ val.Enxpense_name }}</h2>
                        <h2 class="w-[40%] text-left text-2xl py-3 pr-3 whitespace-nowrap max-sm:text-base max-sm:border-r-4 max-sm:mr-3 max-sm:border-gray-600">RS <em class="py-4 pl-4 mx-3 border-l-4 border-gray-600">{{ val.Expense_price}}</em></h2>
                        <!-- Removing the Entitty from the database as well as the frontend -->
                        <div class="flex w-full mr-5 text-2xl text-red-600 justify-end items-center  max-sm:w-[20%]">
                            <button @click="EditTask(val.id)" class="max-sm:w-[50%] max-sm:py-1 max-sm:px-2 max-sm:mr-1 max-sm:text-sm max-sm:rounded-full rounded-[20px] text-lg px-6 py-2 mr-5 text-white bg-green-600 hover:bg-green-800 transition-all duration-300 ease-in "> E</button>
                            <button @click="deletedata(val.id)" class="max-sm:w-[50%] max-sm:py-1 max-sm:px-2 max-sm:ml-1 max-sm:text-sm rounded-[20px] text-lg px-6 py-2 text-white bg-red-600 hover:bg-red-800 transition-all duration-300 ease-in">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-if="showEditPopup" class="edit-popup text-clr pb-20 bg-slate-800 text-center  max-xl:!max-w-[800px] max-md:!max-w-[600px] max-sm:!max-w-[400px]">
            <div class="flex flex-row justify-evenly py-10 max-sm:flex-col">
                <div class="w-[50%] text-left ml-5 max-sm:w-full max-sm:ml-0">
                    <h2 class="text-4xl text-white font-bold mb-5 max-sm:text-2xl max-sm:text-center">Edit Expense</h2>
                    <p class="text-2xl text-justify ml-5 max-sm:text-base max-sm:mx-4 max-sm:mb-4">Made a mistake while typing not a issue just re write what you mistyped and fix the issue just by clicking save if you dont have any issue just press cancel and you will be backed out to previous screen</p>
                </div>
                <div class="w-[40%] max-sm:w-full">
                    <h2 class="text-4xl text-white font-bold mb-5 max-sm:text-2xl">Edit your Expenses Here</h2>
                    <div class="mb-10 max-sm:mx-4">
                        <label class="block text-left text-2xl mb-3 text-white" for="editName">Expense Name</label>
                        <input class="w-full outline-none border-b-2 pl-3 bg-slate-800 border-gray-600 text-xl" type="text" v-model="EditsExpense.name" id="editName">
                    </div>
                    <div class="max-sm:mx-4">
                        <label class="block text-left text-2xl mb-3 text-white" for="editPrice">Expense Price</label>
                        <input class="w-full outline-none border-b-2 pl-3 bg-slate-800 border-gray-600 text-xl" type="number" v-model="EditsExpense.price" id="editPrice">
                    </div>
                </div>
            </div>
            <div class="mt-10 flex flex-row justify-center">
                <button class="text-2xl mr-5 py-2 px-10 bg-slate-700 rounded-3xl hover:bg-white transition-all duration-300 ease-in" @click="saveEdit">Save</button>
                <button class="text-2xl ml-5 py-2 px-10 bg-slate-700 rounded-3xl hover:bg-white transition-all duration-300 ease-in"  @click="cancelEdit">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { onSnapshot, doc, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
    import { db } from '@/main';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    
    let auth

    const showEditPopup = ref(false)
    const AU = ref()
    const number = ref("")
    const text = ref("")
    const Current_id = ref() 
    const Expense = ref([])
    const Users = collection(db, "Users")
    const EditsExpense = ref({id:"", name:"", price: ""})

    const cancelEdit = () =>{
        showEditPopup.value = false
    }

    const saveEdit = () => {
        const ExpenseRef = doc(Users, Current_id.value,"Expenses", EditsExpense.value.id)
        updateDoc(ExpenseRef, {
            Enxpense_name: EditsExpense.value.name,
            Expense_price: EditsExpense.value.price
        })
        
        showEditPopup.value = false
    }
    const EditTask = (id) =>{
        const expense = Expense.value.find(item => item.id === id )

        if(expense) {
            EditsExpense.value = {id:expense.id, name:expense.Enxpense_name, price:expense.Expense_price}
            showEditPopup.value = true
        }
    }

    const onSubmit = async() => {
        console.log(AU.value)
        if(text.value == "" && number.value ==""){
            alert("fields cannot be empty")
        }
        else{
            await addDoc(collection(Users, Current_id.value, "Expenses"), {
                Enxpense_name : text.value,
                Expense_price : number.value
            })
        }

        text.value = ""
        number.value = ""
    }

    const deletedata = async(id) => {
        const ExpenseRef = doc(Users, Current_id.value, "Expenses", id)
        console.log(ExpenseRef.id)
        await deleteDoc(ExpenseRef)

        Expense.value = Expense.value.filter(items => items.id !== id)
    }

    onSnapshot(Users, (Query) => {
        console.log(capitalizeFirstLetter(AU.value))
        Query.forEach((doc)=> {
            if(doc.data().User_Email === AU.value || doc.data().User_Email === capitalizeFirstLetter(AU.value)){
                Current_id.value = doc.id
                onSnapshot(collection(Users, Current_id.value, "Expenses"), (InnerQuery) => {
                    Expense.value = []
                    InnerQuery.forEach((doc) => {
                        Expense.value.push({id:doc.id, ...doc.data()})
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


    function capitalizeFirstLetter(string){
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .Shadows{
        /* box-shadow : rgba(0, 0, 0, 0.35) 0px 5px 15px; */
        box-shadow: rgba(200, 200, 200, 0.5) 0px 5px 15px;
        border-radius: 20px;
    }

    .bg-image{
        background-image: url("../assets//abstract-digital-grid-black-background.jpg");
    }
    @keyframes pop {
        0%{
            transform: translateY(0px);
        }
        100%{
            transform: translateY(-5px);
            color: white;

        }
    }
    .pop_up:hover{
        animation: pop .6s forwards;
    }
    .edit-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width:100%;
        max-width: 1000px;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index:2;
    } 

</style>