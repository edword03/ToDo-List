'use strict';

const todoControl = document.querySelector('.todo-control'),
    addBtn = document.getElementById('add'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoRemove = document.querySelector('.todo-remove');

let todoData = [];

if (localStorage.getItem('userKey')){
  todoData = JSON.parse(localStorage.getItem('userKey'));
}

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value +'</span>' +
        '<div class="todo-buttons">' + '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' + '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoCompletedBtn = li.querySelector('.todo-complete'),
        todoRemoveBtn = li.querySelector('.todo-remove');

        todoCompletedBtn.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });
        todoRemoveBtn.addEventListener('click', function() {
            let index = todoData.indexOf(item);
            console.log(index);
            todoData.splice(index, 1);
            render();
        });
    });
    localStorage.setItem('userKey', JSON.stringify(todoData));
};



todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value !== '') {
      todoData.push(newTodo);
        render();
        todoControl.reset();
    }
});

render();

