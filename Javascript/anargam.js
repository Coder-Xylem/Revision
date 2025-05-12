// test=(to,from)=>{
//     to = to.toLowerCase();
//     from = from.toLowerCase();

//     const toA = to.split(""); 
//     const fromA = from.split("");
    
//     toA.sort();
//     fromA.sort();

//     const toF = toA.join("");
//     const fromF = fromA.join("")

    
//     {toF === fromF ?console.log(`Given Character ${to} is anargam with ${from} `):console.log(`Given Character ${to} is anargam with ${from} `);}

// }
// test("check","cchek")



//keep in mind simple sort is not going to work it considers array as array of strings  
check = (arr) =>{
arr.sort((a,b)=>a-b)
const t = arr.pop()
console.log(t);

}

check([3,54,5,2,5,6,34,56,0,8,4,4,4,1,1])
check([4,54,523,5,5,6,3,56,0,8,4,4,4,1,1])

