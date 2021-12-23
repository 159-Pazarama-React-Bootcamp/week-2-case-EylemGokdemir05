// adding html elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
// const addButton = document.querySelector('.add-btn');
// let inputBox = document.querySelector('#input-box');
// const todoItemsList = document.getElementById('todoList');

var todos=[];


// submit event
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function for current value
});

// var updateHeight = (element) => {
// 	var scroll_height = element.scrollHeight;
// 	element.style.height = scroll_height + 'px';
// };

// inputBox.addEventListener('input', function() {
//     updateHeight(this);
// })

// createTodo function
// function createTodo(item){
//     const itemInput=document.createElement('textarea');
//     itemInput.setAttribute('id', 'display-text');
//     itemInput.classList.add('todo-input');
//     itemInput.addEventListener('input',function() {
//         updateHeight(this);
//     })
//     itemInput.value=item.title;
//     itemInput.addEventListener('blur',(e)=>{
//         item.title=e.currentTarget.value;
//     })
//     return itemInput;
// }

// add Todo function
function addTodo(item){
    if(item!==''){
        const todo={
            id:Date.now(),
            title:item,
            completeStatus:false
        }
        todos.push(todo);
        // renderTodos(todos);
        addToLocalStorage(todos);
        todoInput.value='';
    }
}

function renderTodos(todos){
    todoItemsList.innerHTML = '';

    todos.forEach(function(item) {
        const checked=item.completeStatus ? 'checked' : null;
        const listItem=document.createElement('li');
        listItem.setAttribute('class','item');
        listItem.setAttribute('data-key', item.id);
        // const itemInput = createTodo(item);
		// const checkbox = addCheckbox(item);
		// const deleteBtn = deleteTodo(item);
		// listItem.append(checkbox);
		// listItem.append(deleteBtn);
		// listItem.append(itemInput);
		// todoItemsList.append(listItem);
		// updateHeight(itemInput);
        if(item.completeStatus===true){
            listItem.classList.add('checked');
        }
        listItem.innerHTML=`
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.title}
            <button class="delete-btn">Sil</button>
        `
        todoItemsList.append(listItem);
    });
}

// add checkbox
// function addCheckbox(item){
//     const checkbox=document.createElement('input');
//     checkbox.type='checkbox';
//     checkbox.name='checkbox';
//     checkbox.classList.add('checkbox');
//     checkbox.addEventListener('click',function(e){
//         if(e.target.type==='checkbox'){
//             item.completeStatus=e.currentTarget.checked;
//             e.target.parentElement.classList.toggle('checked');
//         }
//     })
//     return checkbox;
// }

const addToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

const getFromLocalStorage = () => {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// for completed status
function toggle(id){
    todos.forEach(function(item) {
        if(item.id==id){
            item.completeStatus = !item.completeStatus;
        }
    })
    addToLocalStorage(todos);
}

// delete Todo function
function deleteTodo(id){
    // const deleteBtn=document.createElement('button');
    // deleteBtn.className='delete-btn';
    // deleteBtn.innerText='Sil';
    // deleteBtn.addEventListener('click',function(e) {
    //     const div=this.parentElement;
    //     div.style.display='none';
    //     todos=todos.filter((todo)=>todo.id!==item.id);
    // })
    // return deleteBtn;
    todos=todos.filter(function(item) {
        return item.id != id;
    })
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if(event.target.type==='checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('delete-btn')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
})