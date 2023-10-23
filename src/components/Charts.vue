<template>
    <section class="py-5 mx-5 ">
            <div class="container py-16 bg-slate-800 rounded-[20px] Shadows max-xl:!max-w-[900px] max-md:!max-w-[600px] max-sm:!max-w-[540px]">
                <div class="flex flex-col-reverse justify-end mx-auto w-[90%] ">
                    <div class="bg-slate-800 flex items-center Shadows p-10 mt-5 max-md:w-full max-sm:p-0">
                        <canvas class="!w-[100%] !h-[400px]" ref="Chart1"></canvas>
                    </div>
                    <div class=" flex flex-row items-start justify-between bg-slate-800 max-md:flex-col">
                        <div class="w-[40%] text-left max-md:w-full">
                            <h2 class="text-5xl mb-5 font-bold text-white">The Charts : </h2>
                            <p class="text-xl mb-5 text-clr">Are you having trouble understanding which expenses are consuming most of your income? We've created charts to make expense tracking easier for you. By simply adding your expenses, you can quickly identify what is consuming the majority of your income.</p>
                            <p class="text-xl mb-5 text-clr">Please take a look at the following <strong>Bar</strong> and <strong>Pie</strong> charts to get a clear overview of your expenses.</p>
                        </div>
                        <div class="w-[50%] bg-slate-800 Shadows max-md:w-full">
                            <canvas class="w-[400px] h-[400px]" ref="Chart2"></canvas>
                        </div>
                    </div>
                </div>
                <div class="my-10">
                    <button class="py-5 rounded-[20px] px-10 bg-slate-800 text-white text-2xl hover:bg-slate-950 transition-all duration-500 ease-linear" @click="GeneratePDF">Generate Reports</button>
                </div>
            </div>
    </section>
</template>

<script setup>

	// Imports
	import { onMounted,ref } from "vue"
	import { onSnapshot, collection } from "firebase/firestore"
	import { Chart, registerables } from "chart.js"
	import { db } from "../main"
	import { getAuth, onAuthStateChanged } from "firebase/auth"
	import { jsPDF } from 'jspdf'
	import autoTable from "jspdf-autotable"

	// Variables
	const ExpenseName = ref([])
	const ExpensePrice = ref([])
	const IncomeName = ref([])
	const IncomePrice = ref([])
	const AU = ref()
	let auth
	const Users = collection(db, "Users")
	const Chart1 = ref(null)
	const Chart2 = ref(null)
	
	// Registering All the charts as they are not pre-registered 
	Chart.register(...registerables)

	// creating snapshot of the users and adding them in to respected arrays  
	// getting current logged in user 
	onMounted(() => {
		auth = getAuth() 
		onAuthStateChanged(auth , (user) => {
			AU.value = user.email
		})
		onSnapshot(Users, (querySnapshot) => {

		// checking checking 
			querySnapshot.forEach((doc) => {

				// if it matches the user that is current logged in then it will create the Snapshot of all the expenses and incomes of that users
				if(doc.data().User_Email === AU.value || doc.data().User_Email === capitalizeFirstLetter(AU.value)){
					onSnapshot(collection(Users,doc.id,"Expenses"), (Snap) => {
						ExpenseName.value = []
						ExpensePrice.value = []
						Snap.forEach((doc) => {
							ExpenseName.value.push(doc.data().Expense_name)
							ExpensePrice.value.push(doc.data().Expense_price)
						})

						// Creating Charts...
						if(Chart1.value && Chart2.value){
							let FirstChart = new Chart(Chart1.value, {
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
										],
									}]
								},
								options: {}
							})

							let SecondChart = new Chart(Chart2.value, {
								type:"pie",
								data: {
									labels:ExpenseName.value, 
									datasets: [{
										data:ExpensePrice.value,
										labels: "Prices",
									}]
								},
								options:{}
							})
						}
					})

				// Saving income data in their respected Arrays 
					onSnapshot(collection(Users, doc.id, "Income"), (Snap) => {
						IncomeName.value = []
						IncomePrice.value = []
						Snap.forEach((doc) => {
							IncomeName.value.push(doc.data().Income_Category)
							IncomePrice.value.push(doc.data().Income)
						})
					})
				}
			})
		})
	})

    // capitalizing first letter of the string 
    function capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const  GeneratePDF = () => { 

        // variables 
        let EN = []
        let Esum = 0
        let IN = []
        let Isum = 0

        // Saving Expense name and prices in an Array 
        for (let j = 0; j < ExpenseName.value.length; j++) {
            EN.push([ExpenseName.value[j], ExpensePrice.value[j]])
            Esum = Esum + ExpensePrice.value[j]
        }

        // Saving Income category and Incomes in an Array
        console.log(IncomeName.value)
        for (let i = 0; i < IncomeName.value.length;i++){
            IN.push([IncomeName.value[i], IncomePrice.value[i]])
            Isum = Isum + IncomePrice.value[i]
        }

        // creating a PDF 
        const Reports = new jsPDF()
        
        Reports.setFontSize(16)
        Reports.setFont("times")
        Reports.setTextColor(0,0,0)
        Reports.setFillColor(15,31,46)
        Reports.setTextColor("#FFFFFF")

        // using this so that we can change the background color of the PDF page
        Reports.rect(0, 0, Reports.internal.pageSize.width, Reports.internal.pageSize.height,"F").setFont("times", "bold").setFontSize(28)

        // Adding texts to PDF (margin-x, margin-y, text)
        Reports.text(45,14,"Welcome to MEMNs' Reports").setFont("times", "normal").setFontSize(16)
        Reports.text(10,26,"In MEMNs' Reports generator you can find all of you Expenses and Incomes that You have Registered and as well as all the charts that will let you know what is consuming most on your income...", {
            maxWidth:190,
        })
        Reports.text(30,54,"Here Is the report of all your expenses and incomes of this month")
        Reports.text(10,68,"Have a look at your charts and find out what is using maximum amount of your income",{
           maxWidth:150,
           
        })

        // Variable 
        const Element = Chart1.value
        const Element2 = Chart2.value
        const Image = Element.toDataURL('image/png', 1.0)
        const Image2 = Element2.toDataURL('image/png', 1.0)

        // Adding images to the PDF (margin-x, margin-y , imageWidth, imageHeight)
        Reports.addImage(Image, "PNG", 20, 85, 80, 80).setFillColor("#142a3d")
        Reports.addImage(Image2, "PNG", 100, 85, 80,80).setFont("times", 'bold').setFontSize(20)

        Reports.text(10,175,"List of all of your Expenses").setFontSize(16)

        // Creating Tables 
        autoTable(Reports, {

            // Headers styling and declaration
            headStyles:{
                fillColor:"#182d40",
                textColor:"#FFFFFF",
            },
            head:[["Expense Name", "Expense Price"]],
            // Body styling and declaration
            bodyStyles:{
                fillColor:"#233e57",
                textColor:"#FFFFFF",
            },
            body:EN,
            // Footer styling and declaration
            footStyles:{
                fillColor:"#182d40",
                textColor:"#FFFFFF",
  
            },
            foot:[["Total Cost", Esum]],
            theme:'striped',

            // using this such that when we fill color in body it only changes color of odd placements in order to change all the placement colors we need to user didParseCell components
            didParseCell: function (data) {
            if (data.row.section === 'body') {
                data.cell.styles.fillColor = (data.row.index % 2 === 0) ? [35, 62, 87] : '#182d40' ;
                data.cell.styles.textColor = (data.row.index % 2 === 0) ? "#FFFFFF" : "#FFFFFF";
            }
        },
            startY:180,
        })

        Reports.addPage()
        Reports.setFillColor(15,31,46)
        Reports.setTextColor("#FFFFFF")
        Reports.rect(0, 0, Reports.internal.pageSize.width, Reports.internal.pageSize.height,"F").setFontSize(20)
        Reports.text(10,20,"List of all of your Incomes").setFontSize(16)

        // Same as Above 
        autoTable(Reports, {
            headStyles:{
                fillColor:"#182d40",
                textColor:"#FFFFFF",
            },
            head:[["Income Category", "Income"]],
            bodyStyles:{
                fillColor:"#233e57",
                textColor:"#FFFFFF",
            },
            body:IN,
            footStyles:{
                fillColor:"#182d40",
                textColor:"#FFFFFF",

            },
            foot:[["Total Cost",Isum]],
            theme:'striped',
            didParseCell: function (data) {
            if (data.row.section === 'body') {
                data.cell.styles.fillColor = (data.row.index % 2 === 0) ? [35, 62, 87] : '#182d40' ;
                data.cell.styles.textColor = (data.row.index % 2 === 0) ? "#FFFFFF" : "#FFFFFF";
            }
            },
            startY:30,
        })
        Reports.save('Reports.pdf')
    
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