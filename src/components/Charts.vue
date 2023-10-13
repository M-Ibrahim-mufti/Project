<template>
    <section class="py-5 mx-5 ">
            <div class="container py-16 bg-slate-800 rounded-[20px] Shadows max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px]">
                <div class="flex flex-col-reverse justify-end mx-auto w-[90%] ">
                    <div class="bg-slate-800 flex items-center Shadows p-10 mt-5 max-md:w-full max-sm:p-0">
                        <canvas class="!w-[100%] !h-[400px]" id="chart1"></canvas>
                    </div>
                    <div class=" flex flex-row items-start justify-between bg-slate-800 max-md:flex-col">
                        <div class="w-[40%] text-left max-md:w-full">
                            <h2 class="text-5xl mb-5 font-bold text-white">The Charts : </h2>
                            <p class="text-xl mb-5 text-clr">Are you having trouble understanding which expenses are consuming most of your income? We've created charts to make expense tracking easier for you. By simply adding your expenses, you can quickly identify what is consuming the majority of your income.</p>
                            <p class="text-xl mb-5 text-clr">Please take a look at the following <strong>Bar</strong> and <strong>Pie</strong> charts to get a clear overview of your expenses.</p>
                        </div>
                        <div class="w-[50%] bg-slate-800 Shadows max-md:w-full">
                            <canvas class="w-[400px] h-[400px]" id="chart2"></canvas>
                        </div>
                    </div>
                </div>
                <div class="my-10">
                    <button class="py-5 rounded-[20px] px-10 bg-slate-800 text-white text-2xl hover:bg-slate-950 transition-all duration-500 ease-linear" @click="generatePDF">Generate Charts PDF</button>
                </div>
            </div>
    </section>
</template>

<script setup>
    import { onBeforeUnmount,onMounted,ref } from "vue"
    import { onSnapshot, collection } from "firebase/firestore"
    import { Chart, registerables } from "chart.js"
    import { db } from "../main"
    import { getAuth, onAuthStateChanged } from "firebase/auth"
    import { jsPDF } from 'jspdf'

    const ExpenseName = ref([])
    const ExpensePrice = ref([])
    const AU = ref()
    let auth
    const Users = collection(db, "Users")
    
    Chart.register(...registerables)

    const unsubscribeSnapshot = onSnapshot(Users, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().User_Email === AU.value || doc.data().User_Email === capitalizeFirstLetter(AU.value)){
                onSnapshot(collection(Users,doc.id,"Expenses"), (Snap) => {
                    ExpenseName.value = []
                    ExpensePrice.value = []
                    Snap.forEach((doc) => {
                        ExpenseName.value.push(doc.data().Enxpense_name)
                        ExpensePrice.value.push(doc.data().Expense_price)
                    })
                
                    let chart1 = document.getElementById("chart1")
                    let chart2 = document.getElementById("chart2")

                    let FirstChart = new Chart(chart1, {
                        type: "bar",
                        data: {
                            labels: ExpenseName.value,
                            datasets: [{
                                label: "Prices",
                                data: ExpensePrice.value,
                                backgroundColor: [
                                    '#318CE7',
                                    '#F9629F',
                                    '#FFC000',
                                    '#FFBF00',
                                    '#50C878',
                                    '#DA70D6'
                                ]
                            }]
                        },
                        options: {}
                    })

                    let SecondChart = new Chart(chart2, {
                        type:"pie",
                        data: {
                            labels:ExpenseName.value, 
                            datasets: [{
                            
                                data:ExpensePrice.value,
                                labels: "Prices",
                             
                            }]
                        },
                        options:{

                        }
                    })
                
                })
            }
        })
    })

    onBeforeUnmount(() => {
        unsubscribeSnapshot()
    })

    onMounted(() => {
        auth = getAuth() 
        onAuthStateChanged(auth , (user) => {
            AU.value = user.email
        })
    })

    
    function capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const  generatePDF = () => {
        const element = document.getElementById("chart1")
        const element2 = document.getElementById("chart2")
        const image = element.toDataURL('image/png', 1.0)
        const image2 = element2.toDataURL("image/png", 1.0)
        const pdf = new jsPDF('portrait')
        const canvasWidth = pdf.internal.pageSize.getWidth();
        const canvasHeight = pdf.internal.pageSize.getHeight();

        const imageWidth = 100; // Set the width of the image
        const imageHeight = (imageWidth / element.width) * element.height; // Maintain aspect ratio

        const centerX = (canvasWidth - imageWidth) / 2;
        const centerY = (canvasHeight - imageHeight) / 2;

        pdf.addImage(image, 'PNG', centerX, centerY, imageWidth, imageHeight);
        
        const image2Width = 100; // Set the width of the second image
        const image2Height = (image2Width / element2.width) * element2.height; // Maintain aspect ratio

        const centerX2 = (canvasWidth - image2Width) / 2;
        const centerY2 = centerY + imageHeight + 10; // Add some space between the images

        pdf.addImage(image2, 'PNG', centerX2, centerY2, image2Width, image2Height);
        pdf.save("Charts.pdf")
    }

</script>

<style scoped>
    .container {
        width:100%;
        max-width: 1200px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
    .Shadows{
        box-shadow : rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 20px;
    }
</style>