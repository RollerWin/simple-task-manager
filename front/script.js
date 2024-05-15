const todoItemsTableBody = document.getElementById('todo-items');

function addTodoItemToTable(item) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    const createDateCell = document.createElement('td');
    createDateCell.textContent = item.createDate;
    row.appendChild(createDateCell);

    const isDoneCell = document.createElement('td');
    isDoneCell.textContent = item.isDone ? 'Yes' : 'No';
    row.appendChild(isDoneCell);

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(item.id, row);
    });
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    todoItemsTableBody.appendChild(row);
}

function deleteTodoItem(itemId, row) {
    fetch(`https://localhost:7120/api/ToDoItems/${itemId}`, {
            method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            row.remove(); 
        } else {
            console.error('Failed to delete todo item');
        }
    })
    .catch(error => {
        console.error('Error deleting todo item:', error);
    });
}

const addButton = document.getElementById('add-todo-item-button');
const form = document.getElementById('add-todo-form');
const addToDoButton = document.getElementById('add-todo-button')

addButton.addEventListener('click', () => {
    form.classList.toggle('hidden');
});

addToDoButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const createDate = new Date().toISOString();
    const isDone = false;

    const data = {
    title,
    description,
    createDate,
    isDone
    };

    fetch('https://localhost:7120/api/ToDoItems', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';
        form.classList.add('hidden');
    })
    .catch(error => console.error(error));
});

fetch('https://localhost:7120/api/ToDoItems')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            addTodoItemToTable(item);
        });
    });