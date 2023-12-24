interface ITodo {
    id: number;
    title: string;
    addDate: string;
}

class TodoApp {
    private _todoList: ITodo[];
    private _deletedTodoList: ITodo[];

    constructor(private todoAppName: string) {
        this._initTodoApp();
    }

    private _getTodoListFromLS():void {
        this._todoList = JSON.parse(localStorage.getItem(this.todoAppName)) || [];
    }

    private _setTodoListToLS():void {
        localStorage.setItem(this.todoAppName, JSON.stringify(this._todoList));
        this._initTodoApp();
        this._initDeletedTodoList();
    }

    private _initTodoApp(): void {
        this._initAddTodoForm();
        this._initTodoList();

        document.onreadystatechange = () => {
            if (document.readyState === 'interactive') {
                this._initTodoList();
                this._initDeletedTodoList();
            }
        }
    };

    private _initTodoList(): void {
        this._getTodoListFromLS();
        const todoOl = document.getElementById('todo-ol') as HTMLOListElement;
        todoOl.innerHTML = '';
        this._todoList.forEach(({id, title, addDate}) => {
            const todoLi = document.createElement('li');
            const todoItemContainer = document.createElement('div');
            todoItemContainer.classList.add('todoItem-container');
            const todoP = document.createElement('p');
            todoP.innerText = `${title}`;
            const todoAddDateP = document.createElement('p');
            todoAddDateP.innerText = `${addDate}`;
            const deleteTodoLiButton = document.createElement('button') as HTMLButtonElement;
            deleteTodoLiButton.innerText = 'Delete';
            deleteTodoLiButton.classList.add('deleteTodoItem-button');
            deleteTodoLiButton.onclick = () => {
                this._deletedTodoList.push(this._todoList.filter(item => item.id === id)[0]);
                this._setDeletedTodoListToLS();
                this._todoList = this._todoList.filter(item => item.id !== id);
                this._setTodoListToLS();

            }
            todoItemContainer.append(todoP, todoAddDateP, deleteTodoLiButton);
            todoLi.appendChild(todoItemContainer);
            todoOl.appendChild(todoLi);

        })
    }

    private _initAddTodoForm() {
        const todoForm = document.forms['addTodo-form'] as HTMLFormElement;
        todoForm.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const todoInput = e.target['addTodo-input'] as HTMLInputElement;
            const id: number = this._todoList.slice(-1)[0]?.id + 1 || 1;
            const addDate: string = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            const newTodo: ITodo = {id, title: todoInput.value, addDate};
            this._todoList.push(newTodo);
            this._setTodoListToLS();
            todoForm.reset();
        };
    }


    private _initDeletedTodoList():void {
        this._getDeletedTodoListFromLS();
        const deletedTodoOl = document.getElementById('deletedTodo-ol') as HTMLOListElement;
        deletedTodoOl.innerHTML = '';
        this._deletedTodoList.forEach(({id, title}) => {
            const deletedTodoLi = document.createElement('li');
            const deletedTodoItemContainer = document.createElement('div');
            deletedTodoItemContainer.classList.add('todoItem-container');
            const deletedTodoP = document.createElement('p');
            deletedTodoP.innerText = `${title}`;
            deletedTodoP.classList.add('todoItem-deleted');

            const deletedTodoLiButtons = document.createElement('div');
            deletedTodoLiButtons.style.display = 'flex';
            deletedTodoLiButtons.style.flexDirection = 'column';

            const restoreTodoLiButton = document.createElement('button');
            restoreTodoLiButton.innerText = 'Restore';
            restoreTodoLiButton.classList.add('todo-button', 'deletedTodoItem-button');
            restoreTodoLiButton.onclick = () => {
                this._todoList.push(this._deletedTodoList.filter(item => item.id === id)[0]);
                this._deletedTodoList = this._deletedTodoList.filter(item => item.id !== id);

                this._setDeletedTodoListToLS();
                this._setTodoListToLS();
            }

            const removeTodoLiButton = document.createElement('button');
            removeTodoLiButton.innerText = 'Remove';
            removeTodoLiButton.classList.add('todo-button', 'deletedTodoItem-button');
            removeTodoLiButton.onclick = () => {
                this._deletedTodoList = this._deletedTodoList.filter(item => item.id !== id);

                this._setDeletedTodoListToLS();
                this._setTodoListToLS();
            }

            deletedTodoLiButtons.append(restoreTodoLiButton, removeTodoLiButton);
            deletedTodoItemContainer.append(deletedTodoP, deletedTodoLiButtons);
            deletedTodoLi.appendChild(deletedTodoItemContainer);
            deletedTodoOl.appendChild(deletedTodoLi);
        })
    }

    private _getDeletedTodoListFromLS():void {
        this._deletedTodoList = JSON.parse(localStorage.getItem(`${this.todoAppName}-deleted`)) || [];
    }

    private _setDeletedTodoListToLS():void {
        localStorage.setItem(`${this.todoAppName}-deleted`, JSON.stringify(this._deletedTodoList));
    }
}

new TodoApp('todo-list-1');