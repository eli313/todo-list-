// Variables
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".btn");
const todoList = document.querySelector(".todo-container");
const filterList = document.querySelector(".filter-list");

// Event listeners
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterList.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
// Functions

function taskColor(todoDiv) {
  let taskLength = todoDiv.children[0].innerText.length;
  if (taskLength % 9 === 0) {
    todoDiv.classList.add("task1");
  } else if (taskLength % 11 === 0) {
    todoDiv.classList.add("task2");
  } else if (taskLength % 7 === 0) {
    todoDiv.classList.add("task3");
  } else if (taskLength % 6 === 0) {
    todoDiv.classList.add("task4");
  } else if (taskLength % 2 === 0) {
    todoDiv.classList.add("task5");
  } else if (taskLength % 3 === 0) {
    todoDiv.classList.add("task6");
  } else if (taskLength % 5 === 0) {
    todoDiv.classList.add("task7");
  } else {
    todoDiv.classList.add("task8");
  }
}

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task");
  const newTodo = `<li>${todoInput.value}</li>
  <i class="fa-solid fa-circle-check"></i>
  <i class="fa-solid fa-trash"></i>`;
  todoDiv.innerHTML = newTodo;
  taskColor(todoDiv);
  if (todoDiv.children[0].innerText.length !== 0) {
    todoList.appendChild(todoDiv);
    saveLocalTodo(todoInput.value);
    todoInput.value = "";
  } else {
    return;
  }
  // changing task colors
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const todo = e.target.parentElement;

  if (classList[1] === "fa-circle-check") {
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash") {
    removeLocalTodos(todo);
    todo.remove();
  }
}

function filterTodos(e) {
  const todos = [...todoList.childNodes];
  todos.forEach((child) => {
    if (e.target.value === "all") {
      child.style.display = "flex";
    } else if (e.target.value === "completed") {
      if (child.classList.contains("completed")) {
        child.style.display = "flex";
      } else {
        child.style.display = "none";
      }
    } else if (e.target.value === "uncompleted") {
      if (!child.classList.contains("completed")) {
        child.style.display = "flex";
      } else {
        child.style.display = "none";
      }
    }
  });
}

function saveLocalTodo(todo) {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedToDos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedToDos));
}

function getLocalTodos() {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedToDos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("task");

    const newTodo = `<li>${todo}</li>
    <i class="fa-solid fa-circle-check"></i>
    <i class="fa-solid fa-trash"></i>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    taskColor(todoDiv);

    // Colors
  });
}

function removeLocalTodos(todo) {
  let savedToDos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  const filtered = savedToDos.filter((t) => t !== todo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filtered));
}
