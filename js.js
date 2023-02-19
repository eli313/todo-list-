// Variables
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".btn");
const toDolist = document.querySelector(".todo-container");
const filterOptions = document.querySelector(".filter-list");
const colorPicker = document.querySelector(".color-picker");
const colors = document.querySelectorAll(".colors");

// Event Listeners
addBtn.addEventListener("click", addToDo);
toDolist.addEventListener("click", checkRemove);
filterOptions.addEventListener("click", filterToDos);
// colorPicker.addEventListener("click", (e) => { 
//   // console.log(e)
//   colorPicker.classList.toggle("color-expanded");
// });
colors.addEventListener("click",(e)=>{
  console.log(e)
})
console.log(colors)
document.addEventListener("DOMContentLoaded", getLocalToDos);
// Functions
function addToDo(event) {
  // console.log(event);
  event.preventDefault();
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("task");

  const classes = ["task1", "task2", "task3", "task4", "task5", "task6"];
  const bla = classes.map((c) => {
    return c;
  });
  // console.log(bla);
  toDoDiv.classList.add(bla);
  const newToDo = `
  <li>${todoInput.value}</li>
  <i class="fa-solid fa-circle-check"></i>
  <i class="fa-solid fa-trash"></i>`;
  toDoDiv.innerHTML = newToDo;
  // console.log(toDoDiv.children[0].innerText.length);
  if (toDoDiv.children[0].innerText.length === 0) {
    // console.log("back");
    return;
  } else {
    toDolist.appendChild(toDoDiv);
    saveLocalToDos(todoInput.value);
    todoInput.value = "";
  }
}

function checkRemove(e) {
  // console.log(e.target);
  const classList = [...e.target.classList];
  const todo = e.target.parentElement;
  if (classList[1] === "fa-circle-check") {
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash") {
    removeLocalToDos(todo);
    todo.remove();
  }
}

function filterToDos(todo) {
  console.log(toDolist.childNodes);
  const todos = [...toDolist.childNodes];
  todos.forEach((task) => {
    switch (todo.target.value) {
      case "All":
        task.style.display = "flex";
        break;
      case "Completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "Uncompleted":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalToDos(todo) {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedToDos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedToDos));
}

function getLocalToDos() {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedToDos.forEach((todo) => {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("task", "task2");
    const newToDo = `
  <li> ${todo} </li>
  <i class="fa-solid fa-circle-check"></i>
  <i class="fa-solid fa-trash"></i>`;
    toDoDiv.innerHTML = newToDo;
    toDolist.appendChild(toDoDiv);
  });
}

function removeLocalToDos(todo) {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredToDos = savedToDos.filter(
    (t) => t != todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredToDos));
}
