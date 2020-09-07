'use strict';

class ToDo{
  constructor(form, input, todoList, todoCompleted){
    this.form = document.querySelector(form),
    this.input = document.querySelector(input),
    this.todoList = document.querySelector(todoList),
    this.todoCompleted = document.querySelector(todoCompleted),
    this.todoContainer = document.querySelector('.todo-container'),
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = item.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
    `);

    if(item.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(event) {
    event.preventDefault();
    console.log(this);
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    } else {
      alert('Заполните поле!');
    }
  }

  generateKey() {
    return Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
  }

  deleteItem(target) {
    target = target.closest('.todo-item');
    this.todoData.forEach((item) => {
      if (target.key === item.key) {
        this.todoData.delete(item.key);
        this.render();
      }
    });
    
  }

  completeItem(target) {
    target = target.closest('.todo-item');
    this.todoData.forEach((item) => {
      if (target.key === item.key) {
        item.completed = !item.completed;
        this.render();
      }
    });
  }

  handler(event) {
    const target = event.target;
    if (target.matches('.todo-complete')) {
      this.completeItem(target);
    }
    if (target.matches('.todo-remove')) {
      this.deleteItem(target);
    }
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.todoContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}

const toDo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

toDo.init();