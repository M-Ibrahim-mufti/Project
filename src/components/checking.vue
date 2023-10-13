<template>
    <section class="py-32">
        <div class="container">
            <div class="flex flex-row justify-between">
                <div>
                    <canvas class="w-[400px] h-[400px]" id="chart1"></canvas>
                </div>
                <div>
                    <canvas id="chart2"></canvas>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onBeforeUnmount,ref } from "vue"
    import { onSnapshot, query, collection } from "firebase/firestore"
    import { Chart, registerables } from "chart.js"
    import { db } from "../main"

    const ExpenseName = ref([])
    const ExpensePrice = ref([])
    const expenseRef = collection(db, "Expenses")
    
    Chart.register(...registerables)

    const unsubscribeSnapshot = onSnapshot(expenseRef, (querySnapshot) => {

        querySnapshot.forEach((doc) => {
            ExpenseName.value.push(doc.data().Expense)
            ExpensePrice.value.push(doc.data().Price)
        })

        let chart1 = document.getElementById("chart1")
        let chart2 = document.getElementById("chart2")

        let FirstChart = new Chart(chart1, {
            type: "bar",
            data: {
                labels: ExpenseName.value,
                datasets: [{
                    label: "Prices",
                    data: ExpensePrice.value
                }]
            },
            options: {}
        })

        let SecondChart = new Chart(chart2, {
            type:"pie",
            data: {
                labels: ExpenseName.value,
                datasets: [{
                
                    data:ExpensePrice.value,
                    labels: "Prices",
                }]
            },
            options:{

            }
        })
    })

    onBeforeUnmount(() => {
        unsubscribeSnapshot()
    })

    
</script>

<style scoped>
    .container {
        width:100%;
        max-width: 1140px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
    }
</style>