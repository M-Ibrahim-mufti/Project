<template>
    <section class="text-black float-right bg-slate-800 h-screen py-24 w-[12%] fixed">
        <div class="w-[95%] mx-auto text-center text-3xl text-white -mt-5 mb-1 py-5 bg-slate-900">
            <h2>Your Expenses</h2>
        </div>
        <div class="w-full text-center text-white" v-for="val in Incomes" :key="val">
            <div class="TEE w-[95%] mx-auto bg-slate-900 mb-1 flex flex-row items-center border-[2px] border-gray-700"> 
                <h2 class="Expenses w-[60%] text-xl pl-2 text-left py-3 border-r-[4px] border-r-gray-700 whitespace-nowrap overflow-x-auto custom-scrollbar">{{ val.Income_Category }}</h2>
                <h2 class="w-[40%] text-xl py-3 pl-1 text-left whitespace-nowrap overflow-x-auto custom-scrollbar">RS <em>{{ val.Income}}</em></h2>
            </div>
        </div>
        <div class = "Enlarger w-[95%] mx-auto text-white  bg-slate-900 mb-1 flex flex-row items-center border-[1px] border-gray-600">
            <h2 class="Expenses w-[60%] text-xl pl-2 text-left py-3 border-r-[4px] border-r-gray-600 whitespace-nowrap overflow-x-auto custom-scrollbar">Total Cost</h2>
            <h2 class="w-[40%] text-xl py-3 pl-1 text-left whitespace-nowrap overflow-x-auto custom-scrollbar">RS <em>{{ Total_Expense}}</em></h2>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { onSnapshot, doc, collection, addDoc, deleteDoc } from 'firebase/firestore';
    import { db } from '@/main';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';

    let auth
    const Incomes = ref([])
    const AU = ref()
    let Total_Income = 0
    const Users = collection(db, "Users")

    function capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onMounted(() => {
        auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            AU.value = user.email
        })
    })

    onSnapshot(Users, (Query) => {
        Query.forEach((doc) =>{
            if(doc.data().User_Email === AU.value || doc.data().User_Email === capitalizeFirstLetter(AU.value)){
                onSnapshot(collection(Users,doc.id, "Income"), (InnerQuery) => {
                    InnerQuery.forEach((InnerDoc) => {
                        Incomes.value.push({id : InnerDoc.id, ...InnerDoc.data()})
                        Total_Income = Total_Income + InnerDoc.data().Income
                    })
                })
            }
        })
    })
</script>

<style>
 .custom-scrollbar::-webkit-scrollbar {
    width: 10px; /* Adjust the width as needed */
    height: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Rounded corners of the thumb */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color of the scrollbar track */
}

.custom-scrollbar:hover {
    overflow: auto;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar thumb on hover */
}

@keyframes pad {
    0% {
        padding: auto;
    }
    100%{
        padding-top: 20px;
        padding-bottom: 20px;
        color:black;
        border-color: black;
    }
}

.Expenses:hover{
    animation:pad .6s forwards;
}

</style>