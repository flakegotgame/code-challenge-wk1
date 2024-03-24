// input speed
let speed = 100;

//Set Speed Limit
const speedLimit = 70;

// Define Demerit structure
const Demerit = Math.abs((speed - speedLimit)/5)

// Conditions 
if (speed <=70){
    console.log("OK");
}
else if(Demerit>12){
    console.log("License Suspended");
}
else if (speed > 70) {
    console.log("Demerit" +Demerit);
}