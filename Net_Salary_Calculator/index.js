const readline = require('readline');

// tax rates applied
function calculateTax(income){

    // taxslabs and tax rates
    const taxSlabs= [
        //Tax rate of 10% for income of upto 24,000
        {limit: 24000, rate: 0.1},

         //Tax rate of 25% for income of upto 32,333
         {limit: 32333, rate:0.25},

          //Tax rate of 30% for income of upto 500,000
          {limit:500000, rate: 0.3},

           //Tax rate of 35% for income of more than 800,000
            {limit: 800000, rate: 0.35},

            //Tax rate of 32.5% for income upto 800,000
            {limit: 800000, rate: 0.325},

    ];

    //initial tax is zero
    let tax =0;
    //remaining income is equal to total income
    let remainIncome = income;

    //choose suitable tax slab to calculate the tax 
    for (const slab of taxSlabs){
        //check for remaining income to be taxed
        if(remainIncome <=0) break;
        //calculate taxable amount within slab
        const taxableAmount =Math.min(remainIncome, slab.limit);
        //calculate the tax for the taxable amount
        tax+= taxableAmount *slab.rate;

        //upt 
        remainIncome -= taxableAmount
    }

    // total tax calculation
    return tax;
}

//NHIF rates
function calculateNHIFDeductions(grossPay){
    const nhifRates = [
        {limit:5999, deduction: 150},
        {limit:11999, deduction: 400},
        {limit:29999, deduction: 850},
        {limit:100000, deduction: 1700},

    ];
    for (const rate of nhifRates){
        if (grossPay<= rate.limit){
            return rate.deduction;
        }
    }
    //past the limit
   return nhifRates[nhifRates.length - 1].deduction;

}


//nssf rates 
function calculateNSSFContributions(pensionalPay){
    //contribution rate for tier 1
    const tierIRate = 0.06;
    //lowerlimit for tier II
    const tierIILowestLimit = 7001; 

if(pensionalPay <= tierIILowestLimit){
    //is it within? tier 1 rate
    return pensionalPay * tierIRate;
} else {
    //exceeds
    return tierIILowestLimit * tierIRate;
}
}

//calculate net salary
function calculateNetSalary(basicSalary, benefits){
    //calc gross salary = adding basic salary + benefits
    const grossSalary = basicSalary + benefits;
    //calc tax 
    const tax = calculateTax(grossSalary);
    //calc NHIF deductions based on grosssalary
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    //calc NSSF deductions based on basic sal
    const NSSFDeductions = calculateNSSFContributions(basicSalary);
    //net salary = sub tax,nhif deductions & nssf ded from gross salary
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;

    //return
    return{
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
        netSalary
    };
}

//function for user input
function getUserInput(question){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    });
 
 return new Promise((resolve) => {
    rl.question(question, (answer) =>{
        rl.close();
        resolve(parseFloat(answer));
    });
 });
}
 //function to run the program
 async function run(){
    //input for basic salary

    const basicSalary = await getUserInput("your basic salary = ");

    //get user benefits 
    const benefits = await getUserInput("Your Benefits = ");

    //calc net salary in response to user input
    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    //display the calc
    console.log("Gross = ", salaryDetails.grossSalary);
    console.log("Tax = ", salaryDetails.tax);
    console.log("NHIF Ded = ", salaryDetails.NHIFDeductions);
    console.log("NSSF Ded = ", salaryDetails.NSSFDeductions);
    console.log("Net = ", salaryDetails.netSalary);
 }

 run();