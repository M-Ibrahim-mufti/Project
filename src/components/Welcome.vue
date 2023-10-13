<template>
  <header class="pt-24 pb-4 mx-4">
    <div class="container bg-slate-800 py-10 rounded-[20px] Shadows max-xl:relative max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px] ">
        <div class="text-left mx-5 text-clr">
            <h2 class="my-10 text-white text-5xl max-sm:text-3xl">Welcome To MEMN's Dashboard</h2>
            <p class="w-[95%] text-justify ml-10 text-2xl mb-14 max-sm:text-xl max-sm:ml-5 max-sm:text-left">Welcome to our Monthly Expense Management platform, designed to simplify your financial journey. Our user-friendly interface offers intuitive tools for tracking and analyzing your monthly expenses, providing you with a clear overview of your financial health. With customizable categories and detailed transaction logs, you can effortlessly allocate your income, ensuring it aligns with your priorities. Set realistic budget goals and receive timely notifications to stay on track. Gain insights into your spending patterns and make informed decisions for a more secure financial future. Let's embark on this journey towards financial well-being together</p>
        </div>
        <div id="Cards" class="flex flex-row justify-evenly max-lg:flex max-lg:flex-col">
            <div class="px-5 py-5 text-left borders w-[30%] flex flex-col items-center max-lg:w-[90%] max-lg:mx-auto max-lg:mb-5">
                <div class="w-[30%] mb-5">
                    <img src="../assets/expense.png">
                </div>
                <div class="text-xl text-white">
                    <h2 class="mb-3 font-bold text-3xl max-sm:text-xl">Manage Your Expenses</h2>
                    <p class="mb-2 max-sm:text-sm">Having trouble managing your expenses or having difficulty saving up<br>Try Our Expense Managerment System in which you can manage your expenses without any hurdle with respect to your income</p>
                    <p class="mb-2 max-sm:text-sm">By <strong>adding </strong> <strong>Editing </strong>and <strong>Deleting</strong> You can manage you expenses </p>
                    <p class="mb-3 max-sm:text-sm">Click below to Manage your Expenses with ease </p>
                    <div class="flex justify-end"><a href="/Expense-manager" class="btn" >Read More</a></div>
                </div>
            </div>
            <div class="px-5 py-5 text-left borders w-[30%] flex flex-col items-center max-lg:w-[90%] max-lg:mx-auto max-lg:mb-5">
                <div class="w-[30%] mb-5">
                    <img src="../assets/cash.png" alt="">
                </div>
                <div class="text-xl text-white">
                    <h2 class="mb-3 font-bold text-3xl max-sm:text-xl">Manage Your Income</h2>
                    <p class="mb-2 max-sm:text-sm">Let us have a look at your Income if you are having trouble managing your expenses<br>we will provide best possible chart to let you know where all of your income is Being used at</p>
                    <p class="mb-2 max-sm:text-sm">By <strong>Adding</strong> <strong>Modifying</strong> and <strong>Deleting</strong> you can manage your income precisely</p>
                    <p class="mb-3 max-sm:text-sm">Click below to Manage your income with ease </p>
                    <div class="flex justify-end"><a href="/Income-manager" class="btn" >Read More</a></div>
                </div>
            </div>
            <div class="px-5 py-5 text-left borders w-[30%] flex flex-col items-center max-lg:w-[90%] max-lg:mx-auto max-lg:mb-5">
                <div class="w-[30%] mb-5">
                    <img src="../assets/info.png" alt="">
                </div>
                <div class="text-xl text-white">
                    <h2 class="mb-3 font-bold text-3xl max-sm:text-xl">About us?</h2>
                    <p class="mb-2 max-sm:text-sm">Welcome to our Monthly Expense Management System! Our platform is designed to help you effortlessly track and manage your monthly expenses.</p>
                    <p class="mb-2 max-sm:text-sm">With user-friendly features and intuitive design</p>
                    <p class="mb-3 max-sm:text-sm">Take control of your finances with us and experience a seamless approach to tracking, analyzing, and optimizing your expenses</p>
                    <div class="flex justify-end"><a href="/About" class="btn" >Read More</a></div>
                </div>
            </div>
        </div>
    </div>
  </header>
</template>

<script setup>
   
</script>

<style scoped>
    .Shadows{
        box-shadow : rgba(0, 0, 0, 0.35) 0px 5px 15px
    }
    .container {
        width:100%;
        max-width: 1200px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
    .borders{
        border-radius: 5px;
        border-top-left-radius: 50px;
        border-bottom-right-radius:50px ;
        background-color: black;       
    }
    @keyframes pop-up {
        0%{
            transform: translateY(0);
        }
        100%{
            transform: translateY(-30px);
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

        }
    }

    .borders:hover{
        animation: pop-up .6s forwards;
    }
    .btn{
        margin-top: 8px;
        padding: 10px 25px;
        background-color: rgb(32, 32, 32);
        border-top-right-radius: 30px;
        border-bottom-left-radius: 30px;
        color:black;
    }
    .btn:hover{
        border-radius: 0;
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        background-color: white;
        color:black;
        transition: all .3s ease-in;
    }
    #Cards p{
        color:rgb(173, 173, 173)
    }
 </style>