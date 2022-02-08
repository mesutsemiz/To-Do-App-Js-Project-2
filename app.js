//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector("#filter-todo");
//event Listeners

document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click",filterTodo)

//functions

function addTodo(e){
    //prevent form from submitting
    e.preventDefault()
    //todo Dıv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TO DO LOCAL STORGE
    savelocalTodos(todoInput.value);

 


    //Check Mark Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    console.log(trashButton);

    //APPEND TO LİST

    todoList.appendChild(todoDiv);

    todoInput.value=" ";
    todoInput.focus();
    

}


function deleteCheck(e){
    console.log(e.target.value);

    const item = e.target;

    // DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo =item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();

        })
        
        
    }

    //CHECK MARK
    if (item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")

    }



}


function filterTodo(e){
    const todos =todoList.childNodes
   
    todos.forEach(function(todo){
        console.log(e.target.value);
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if (todo.classList.contains("completed")) {

                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none"
                }               
                break;
            
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";                   
                } else{
                    todo.style.display = "none"
                }               
                break;
        
        }
    })

}



function savelocalTodos(todo){
    //CHECK --

    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo){

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    //Check Mark Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    console.log(trashButton);

    //APPEND TO LİST

    todoList.appendChild(todoDiv);

    })

}


function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos,indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos))
}












