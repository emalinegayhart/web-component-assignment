class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .todo-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        .todo-item:last-child {
          border-bottom: none;
        }
        .todo-item input[type="checkbox"] {
          margin-right: 10px;
        }
        .completed {
          text-decoration: line-through;
        }
      </style>
      <h1>Todo List</h1>
      <ul class="todo-list" id="todoList"></ul>
      <input type="text" id="newTodo" placeholder="Add new todo">
      <button id="addTodo">Add</button>
    `;
    this.todoList = this.shadowRoot.querySelector('#todoList');
    this.newTodoInput = this.shadowRoot.querySelector('#newTodo');
    this.addTodoButton = this.shadowRoot.querySelector('#addTodo');

    this.addTodoButton.addEventListener('click', this.addTodo.bind(this));
  }

  static get observedAttributes() {
    return ['initial-todos'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'initial-todos') {
      const initialTodos = JSON.parse(newValue);
      initialTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''}>
          <span ${todo.completed ? 'class="completed"' : ''}>${todo.text}</span>
          <button class="delete">Delete</button>
        `;
        todoItem.querySelector('button.delete').addEventListener('click', () => {
          this.todoList.removeChild(todoItem);
          this.dispatchEvent(new CustomEvent('todo-deleted', { detail: todo.text }));
        });
        todoItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
          todoItem.querySelector('span').classList.toggle('completed');
        });
        this.todoList.appendChild(todoItem);
      });
    }
  }

  addTodo() {
    const newTodo = this.newTodoInput.value.trim();
    if (newTodo) {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
        <input type="checkbox">
        <span>${newTodo}</span>
        <button class="delete">Delete</button>
      `;
      todoItem.querySelector('button.delete').addEventListener('click', () => {
        this.todoList.removeChild(todoItem);
        this.dispatchEvent(new CustomEvent('todo-deleted', { detail: newTodo }));
      });
      todoItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        todoItem.querySelector('span').classList.toggle('completed');
      });
      this.todoList.appendChild(todoItem);
      this.newTodoInput.value = '';
      this.dispatchEvent(new CustomEvent('todo-added', { detail: newTodo }));
    }
  }
}

customElements.define('todo-list', TodoList);
