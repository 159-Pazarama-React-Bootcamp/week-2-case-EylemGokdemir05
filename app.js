// adding html elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

const apiUrl = 'https://61c73e6d9031850017547388.mockapi.io/todos';

var todos=[];


// submit event
todoForm.addEventListener('submit', function(event) {
    window.console.log('event ',event)
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function for current value
    renderTodos(event.target[0].value);
});

getAllTodos().then(todos => {
    todos.forEach(todo => { renderTodos(todo); });
});

function getAllTodos() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then(function(todos){
            todos.forEach((todo)=>{
                console.log('todo: ',todo.title);
            })
        });
}

function addTodo(item){
    let todos = {
        id:Date.now(),
        title:item,
        completeStatus:false
    }
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

// add Todo function
// function addTodo(item){
//     if(item!==''){
//         const todo={
//             id:Date.now(),
//             title:item,
//             completeStatus:false
//         }
//         todos.push(todo);
//         addToLocalStorage(todos);
//         todoInput.value='';
//     }
// }

function renderTodos(todos){
    todoItemsList.innerHTML = '';

    window.console.log('todos ',todos)

    // const checked=item.completeStatus ? 'checked' : null;
    // const listItem=document.createElement('li');
    // listItem.setAttribute('class','item');
    // listItem.setAttribute('data-key', item.id);
    // if(item.completeStatus===true){
    //     listItem.classList.add('checked');
    // }
    const listItem=document.createElement('li');
    listItem.setAttribute('class','todos');
    window.console.log('listItem ',listItem)
    listItem.innerHTML=`
    <span class="todo-input">${todos}</span>
    `
    todoItemsList.append(listItem);
    // todos.forEach(function(item) {
    //     window.console.log('item ',item)
    //     const checked=item.completeStatus ? 'checked' : null;
    //     const listItem=document.createElement('li');
    //     listItem.setAttribute('class','item');
    //     listItem.setAttribute('data-key', item.id);
    //     if(item.completeStatus===true){
    //         listItem.classList.add('checked');
    //     }
    //     listItem.innerHTML=`
    //         <input type="checkbox" class="checkbox" ${checked}>
    //         ${item.title}
    //         <button class="delete-btn">Sil</button>
    //     `
    //     todoItemsList.append(listItem);
    // });
}

// const addToLocalStorage = (todos) => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//     renderTodos(todos);
// }

// const getFromLocalStorage = () => {
//     const reference = localStorage.getItem('todos');
//     if (reference) {
//         todos = JSON.parse(reference);
//         renderTodos(todos);
//     }
// }

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
    // addToLocalStorage(todos);
}

// getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if(event.target.type==='checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('delete-btn')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
})