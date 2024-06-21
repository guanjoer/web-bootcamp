// Vanilla Js
const todoFormElement = document.querySelector('#todo-management form');
const todosListElement = document.getElementById('todos-list');

let editedTodoElement;

async function loadTodos() {
  let response;
  try {
    response = await fetch('http://localhost:3000/todos'); // GET Request
  } catch (error) {
    alert('할 일을 불러오는데 실패하였습니다!');
    return;
  }

  if (!response.ok) {
    alert('할 일을 불러오는데 실패하였습니다!');
    return;
  }

  const responseData = await response.json(); // json 데이터 디코딩
  const todos = responseData.todos; // [{"text": "...", "id": "..."}, {...}]

  for (const todo of todos) {
    createTodoListItem(todo.text, todo.id);
  }
}

function createTodoListItem(todoText, todoId) {
  const newTodoItemElement = document.createElement('li');
  newTodoItemElement.dataset.todoid = todoId; // data-todoid

  const todoTextElement = document.createElement('p'); // 할 일 표현
  todoTextElement.textContent = todoText;

  const editTodoButtonElement = document.createElement('button'); // 업데이트 버튼
  editTodoButtonElement.textContent = 'Edit';
  editTodoButtonElement.addEventListener('click', startTodoEditing);

  const deleteTodoButtonElement = document.createElement('button'); // 삭제 버튼
  deleteTodoButtonElement.textContent = 'Delete';
  deleteTodoButtonElement.addEventListener('click', deleteTodo);

  const todoActionsWrapperElement = document.createElement('div'); // 버튼 수납 공간
  todoActionsWrapperElement.appendChild(editTodoButtonElement);
  todoActionsWrapperElement.appendChild(deleteTodoButtonElement);

  newTodoItemElement.appendChild(todoTextElement); // li 안에 p 태그
  newTodoItemElement.appendChild(todoActionsWrapperElement); // li 안에 div

  todosListElement.appendChild(newTodoItemElement); // ul에 li 삽입

  // 최종 구조: 
  // <ul> <li> <p> ...</p> <div> <button>...</button> </div> </li> </ul>
}

async function createTodo(todoText) {
  let response;

  try {
    response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
        text: todoText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('할 일을 전송하는데 실패하였습니다.');
    return;
  }

  if (!response.ok) {
    alert('할 일을 전송하는데 실패하였습니다.');
    return;
  }

  const responseData = await response.json();
  const todoId = responseData.createdTodo.id;

  createTodoListItem(todoText, todoId);
}

async function updateTodo(newTodoText) {
  const todoId = editedTodoElement.dataset.todoid; // data-todoid
  let response;

  try {
    response = await fetch('http://localhost:3000/todos/' + todoId, {
      method: 'PATCH',
      body: JSON.stringify({
        newText: newTodoText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('업데이트에 실패하였습니다.');
    return;
  }

  if (!response.ok) {
    alert('업데이트에 실패하였습니다.');
    return;
  }

  editedTodoElement.firstElementChild.textContent = newTodoText; // <p>

  todoFormElement.querySelector('input').value = '';
  editedTodoElement = null;
}

async function deleteTodo(event) {
  const clickedButtonElement = event.target;
  const todoElement = clickedButtonElement.closest('li');
  const todoId = todoElement.dataset.todoid;

  let response;

  try {
    response = await fetch('http://localhost:3000/todos/' + todoId, {
      method: 'DELETE',
    });
  } catch (error) {
    alert('삭제 중 문제가 발생하였습니다.');
    return;
  }

  if (!response.ok) {
    alert('삭제 중 문제가 발생하였습니다.');
    return;
  }

  todoElement.remove();
}

function saveTodo(event) {
  event.preventDefault(); // 브라우저가 자동으로 Http 요청 보내는 것을 방지

  const formInput = new FormData(event.target); // get method를 통해 form 태그 내 값에 접근 가능(접근 키는 "name")
  const enteredTodoText = formInput.get('text');

  if (!editedTodoElement) { // edit 버튼을 누르지 않은 것. 즉 <li>가 존재하지 않을 때
    // Todo 추가
    createTodo(enteredTodoText);
  } else {
    // Todo 업데이트
    updateTodo(enteredTodoText);
  }
}

function startTodoEditing(event) {
  const clickedButtonElement = event.target; // edit 버튼
  editedTodoElement = clickedButtonElement.closest('li'); // the <li>
  const currentText = editedTodoElement.firstElementChild.textContent; // <p>.textContent

  todoFormElement.querySelector('input').value = currentText;
}

todoFormElement.addEventListener('submit', saveTodo);

loadTodos();