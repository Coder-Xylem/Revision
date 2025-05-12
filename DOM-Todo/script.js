let Todos = [];


let input = document.querySelector(".input");
let display = document.querySelector(".list");

function clicked() {
  const value = input.value.trim();
  if (value !== "") {
    Todos.push(value);
    console.log(value);
    input.value = "";
  }
  display.innerHTML = "";
  for (let index = 0; index < Todos.length; index++) {
    let li = document.createElement("li");
    li.textContent = Todos[index];
    display.appendChild(li);
  }
}

function remove() {
  Todos.shift();
  display.innerHTML = "";
  for (let index = 0; index < Todos.length; index++) {
    let li = document.createElement("li");
    li.textContent = Todos[index];
    display.appendChild(li);
  }
}

function Updat() {
  const value = input.value.trim();
  if (value !== "" && Todos.length > 0) {
    Todos[0] = value;
    display.innerHTML = "";
    for (let index = 0; index < Todos.length; index++) {
      let li = document.createElement("li");
      li.textContent = Todos[index];
      display.appendChild(li);
    }
  }
}
