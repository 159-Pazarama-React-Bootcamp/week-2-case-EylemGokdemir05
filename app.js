// adding html elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

const apiUrl = 'https://61c73e6d9031850017547388.mockapi.io/todos';

var todos=[];


// submit event
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function for current value
    renderTodos(todos[todos.length-1].title); 
});

getAllTodos().then(todos => {
    todos.forEach(todo => { renderTodos(todo); });
});

function getAllTodos() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then(function(todos){
            todos.forEach((todo)=>{
                //console.log('todo: ',todo.title);
            })
        });
}

var todos=[];

// add Todo function
function addTodo(item){
    let todo = {
        id:Date.now(),
        title:item,
        completeStatus:false
    }
    todos.push(todo);
    fetch(apiUrl,{
        method: "POST",
        body: JSON.stringify(todos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
    console.log('addtodo ',todos)
    console.log('addtodoitem ',item)
}

function renderTodos(todos){

    const listItem=document.createElement('li');
    listItem.setAttribute('class','todos');
    listItem.innerHTML+=`
    <span class="todo-input">${todos}</span>
    <button class="delete-btn">Sil</button>
    `
    todoItemsList.append(listItem);
}

// for completed status
function toggle(id){
    todos.forEach(function(item) {
        if(item.id==id){
            item.completeStatus = !item.completeStatus;
        }
    })
    // addToLocalStorage(todos);
}

// delete Todo function
function deleteTodo(id){
    todos=todos.filter(function(item) {
        return item.id != id;
    })
}

todoItemsList.addEventListener('click', function(event) {
    if(event.target.type==='checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('delete-btn')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
})