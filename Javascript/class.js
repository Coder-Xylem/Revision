// class Vehicles{
//   constructor(a,b,c){
//    this.a = a;
//     this.b = b;
//     this.c = c;
//   }

//   speed(){
//     return this.a*this.b
//   }
// }

// const test = new Vehicles(1,2,3);
// const test1 = new Vehicles(1,2,3);
// console.log(test,"test");
// console.log(test.speed(1,2),"speed");
// console.log(test1.speed(2,2),"speed");



// class Vehicle {
//   constructor(make, model, year, speed = 0, fuel = 100, type = 'Sedan') {
//     // Initialize instance properties through constructor
//     this.make = make;
//     this.model = model;
//     this.year = year;
//     this.speed = speed;
//     this.fuel = fuel;
//     this.type = type;

//     // Additional properties that are not initialized in the constructor
//     this.isRunning = false;
//   }

//   // Method to start the vehicle
//   start() {
//     console.log(this.make,
//     this.model,
//     this.year,
//     this.speed,
//     this.fuel,
//     this.type
// );
    
//     if (this.fuel > 0) {
//       this.isRunning = true;
//       console.log(`${this.make} ${this.model} is now running.`);
//     } else {
//       console.log("Not enough fuel to start.");
//     }
//   }

//   // Method to stop the vehicle
//   stop() {
//     this.isRunning = false;
//     console.log(`${this.make} ${this.model} has stopped.`);
//   }

//   // Method to accelerate
//   accelerate(increase) {
//     if (this.isRunning) {
//       this.speed += increase;
//       this.fuel -= increase * 0.1; // Example: Fuel decreases as speed increases
//       console.log(`${this.make} ${this.model} accelerated to ${this.speed} km/h. Fuel left: ${this.fuel}`);
//     } else {
//       console.log("Start the vehicle first.");
//     }
//   }

//   // Method to brake
//   brake(decrease) {
//     if (this.isRunning) {
//       this.speed -= decrease;
//       if (this.speed < 0) this.speed = 0; // Speed should not go below 0
//       console.log(`${this.make} ${this.model} slowed down to ${this.speed} km/h.`);
//     } else {
//       console.log("Start the vehicle first.");
//     }
//   }

//   // Method to check fuel level
//   checkFuel() {
//     console.log(`Fuel level: ${this.fuel}%`);
//   }
// }

// // Example usage of the class
// const myCar = new Vehicle("Toyota", "Corolla", 2020, 0, 100, "Sedan");
// const myCar1 = new Vehicle("Toyota", "Corolla", 20203, 300, 2100, "Seedan");
// myCar1.start();
// myCar1.accelerate(30);
// myCar1.checkFuel();
// myCar1.brake(10);
// myCar1.stop();


// test = new  Date();

// Promise = {
//     tr:"folloew"
// }
// console.log(Promise);



function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
	// console.log("3 seconds have passed");
}

let c = 0;

function display(){
      console.clear()
      console.log(c++);
      setTimeout(display, 100);
      
} 
setTimeout(display,1000);