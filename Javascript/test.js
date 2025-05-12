const fs = require("fs");
let time = Date.now();


// // const fs = require("fs");
// //blocking or Synchronous
// const contents = fs.readFileSync("sample.txt", "utf-8");
// // console.log(contents ,"Data first", (Date.now() - time));

// const contents2 = fs.readFileSync("copy.txt", "utf-8");
// // console.log(contents2, "Data Second", (Date.now() - time));





// // ASynchronous
// fs.readFile("sample.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading sample.txt:", err);
//     return;
//   }
// //   console.log(data, "Data first", (Date.now() - time));
// });

// fs.readFile("copy.txt", "utf-8", (err, data1) => {
//   if (err) {
//     console.error("Error reading copy.txt:", err);
//     return;
//   }
// //   console.log(data1, "Data Second", (Date.now() - time));
// });

// // console.log("data1", (Date.now() - time));
// let ans = 1;
// for (let i = 1; i <= 100000; i++) {
// 	ans = ans * i
// }
// // console.log(ans,(Date.now()-time));	


function run() {
	console.log("I will run after 1s",(Date.now()-time));
}

setTimeout(run, 1000);
console.log("I will run immedietely",(Date.now()-time));