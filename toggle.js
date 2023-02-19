document.addEventListener("DOMContentLoaded", complete);

function complete(e) {
  todoList.children[0].classList.toggle("completed");
  // console.log(localStorage.getItem("completed"));
  console.log(todoList.children[0].classList);
}

function completed(todo) {
  if (todo.target.parentElement.classList.contains("completed")) {
    localStorage.setItem("completed", "completed");
  }

  // console.log(todo.target.parentElement.classList);
  // console.log(todoList.children);
}
