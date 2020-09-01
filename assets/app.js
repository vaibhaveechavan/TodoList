//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); //retrieve the already existing list if any from local storage on page refresh
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    var msg, x;
    x = document.getElementById("inputCheck");
    //prevent form from submitting
    event.preventDefault();
    //TODO div
    const todoDiv = document.createElement('div');
    // todoDiv.tagName.add(todoInput.value);
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    if (newTodo.innerText == "") {
        msg = "Invalid input!"
        document.getElementById("inputCheck").innerHTML = msg;
        x.classList.remove("hide");
        x.classList.add("input-check");
        setTimeout(() => {
            x.classList.remove("input-check");
            x.classList.add("hide");
        }, 1000);
    } else {
        x.classList.remove("input-check");
        x.classList.add("hide");

        // x.style.display = "none";
        //add todo to local storage
        saveLocalTodos(todoInput.value);
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button
        completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to List
        todoList.appendChild(todoDiv);
        //clear todoInput value
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    //delete TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        // console.log(todo.classList.contains("completed"));
        // console.log(!todo.classList.contains("completed"));

        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    // console.log("completed list")
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check if list already exists
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //check if list already exists
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //TODO div
        const todoDiv = document.createElement('div');
        // todoDiv.tagName.add(todoInput.value);
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //check if list already exists
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
