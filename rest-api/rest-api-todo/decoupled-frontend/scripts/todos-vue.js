// Vue.js

const TodosApp = {
	data() { // like constructor function // default name
		return {
			isLoading: true,
			todos: [],
			enteredTodoText: '',
			selectedTodoId: null
		};
	},
	methods: { // default name
		//Methods 정의
		async saveTodo(event) { // 생성 및 업데이트
			event.preventDefault(); // 브라우저의 자동 HTTP Request 방지

			let response;

			if(this.selectedTodoId) {
				// update
				const todoId = this.selectedTodoId; // findIndex 메서드 내부에서 id를 참조하기 위해

				let response;
				try {
				  response = await fetch('http://localhost:3000/todos/' + todoId, {
					method: 'PATCH',
					body: JSON.stringify({
					  newText: this.enteredTodoText,
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

				// 디스플레이 업데이트
				const todoIndex = this.todos.findIndex((todoElement) => {
					return todoElement.id === todoId; // true or false
				});

				this.todos[todoIndex].text = this.enteredTodoText;
				// const updateTodo = {
				// 	id: this.todos[todoIndex].id,
				// 	text: this.enteredTodoText
				// };

				// this.todos[todoIndex] = updateTodo;
			} else{
				// create
				try {
					response = await fetch('http://localhost:3000/todos', {
					  method: 'POST',
					  body: JSON.stringify({
						text: this.enteredTodoText,
					  }),
					  headers: {
						'Content-Type': 'application/json',
					  },
					});
				  } catch (error) {
					alert('할 일을 전송하는데 실패하였습니다.');
					return;
				  };
				
				  if (!response.ok) {
					alert('할 일을 전송하는데 실패하였습니다.');
					return;
				  };

				  const responseData = await response.json();

				  // 디스플레이 업데이트
				const newTodo = {
					text: this.enteredTodoText,
					id: responseData.createdTodo.id // edit or delete 시 필요
				};

				this.todos.push(newTodo); 
			};

			this.enteredTodoText = ''; // 입력 란 초기화
			this.selectedTodoId = null;
		},
		async editTodo(todoId) { // edit 버튼 클릭 시, 텍스트 미리 가져오고, id 세팅
			this.selectedTodoId = todoId; // 입력한 텍스트를 미리 가져오기 위해
			const todo = this.todos.find((todoElement) => { // id값이 일치하는 todos 내 객체
				return todoElement.id === this.selectedTodoId; // true or false
			});

			this.enteredTodoText = todo.text; // 입력 란 미리 채우기
		},
		async deleteTodo(todoId) {
			// 디스플레이 업데이트, 즉 DOM 업데이트
			this.todos = this.todos.filter((todoElement) => {
				return todoElement.id !== todoId// true이면 유지, false인 요소에 대해서는 삭제
			});

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
		},
		async loadTodo() {
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
			 
			this.todos = responseData.todos;  // [{"text": "...", "id": "..."}, {...}]
			this.isLoading = false; // 데이터 로딩 완료
		}
	},
	created() { // 웹 사이트가 로드 될 때
		this.loadTodo();
	}
};

// main Element 내 모든 Element를 Vue.js가 스캔
Vue.createApp(TodosApp).mount('#todos-app'); // 제어하고 싶은 모든 Element가 들어있는 Element(여기선 id="todos-app")