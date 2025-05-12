let user =  {
    name: "Abdullah",
    age: 19,
    genderMale: true,
    indian: true,
    education: ["10th", "12th", "Graduation"],
    aim: "TBD"
};
let user2 =  {
    name: "Shaikh",
    age: 9,
    genderMale: true,
    indian: false,
    education: ["10th"],
    aim: "Doctor"
};

function details(us = {}) {
    console.log(`${us.name} is an ${us.indian ? "Indian" : "Non-Indian"} ${us.genderMale ? "Male" : "Female"} aged around ${us.age} years. ${us.genderMale ? "His" : "Her"} Education is: ${us.education.join(", ")}. Aim: ${us.aim}`);
}

// details(user);
// details(user2);
//----------------------------------------------------------------------------------
//hoisting in js
    // console.log(x); 
    var x = 2;
//----------------------------------------------------------------------------------
//understanding asyncJS
function test(){
    let tim1 = Date.now()
    let tim2
    // console.log(tim);
    
  setTimeout(()=>{
    tim2 = Date.now();
    // console.log(tim2 - tim1);
    
  },(500))
  
}
//  console.log("start"); 
//  test(); 
//  console.log("end");

// Syncronous code - code that runs line by line and waits for the current line to finish before moving to the next line

var count = 0;
function sum(num) {
	let ans = 0;
    count++;
	for (let i = 1; i <= num; i++) {
		ans = ans + i
	}
	return ans;
}
// const ans1 = sum(10);
// console.log(ans1); // 55
// const ans2 = sum(100);
// console.log(ans2); // 5050
// const ans3 = sum(1000); 
// console.log(ans3); // 500500
// console.log(count);


//----------------------------------------------------------------------------------
//file reading
const f = require('fs');
const con = f.readFileSync("sample.txt", "utf-8")
console.log(con);
