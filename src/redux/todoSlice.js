import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

			if (!response.ok) {
				throw new Error('server is not worker');
			}

			return response.json(); // нужно ли вынести в отдельную перменную data

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)
export const fetchDeleteTodo = createAsyncThunk(
	'todos/fetchDeleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
				{ method: 'DELETE' }
			);

			if (!response.ok) {
				throw new Error('Не удалось удалить задачу!');
			}

			dispatch(removeTask({ id }));

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const fetchToggelStatus = createAsyncThunk(
	'todos/fetchToggelStatus',
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find((todo) => todo.id === id);

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					completed: !todo.completed,
				})
			});

			if (!response.ok) {
				throw new Error('Не получилось обновить статус задачи. Server error')
			}

			dispatch(toggelTask({ id }));

			return todo;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const fetchAddTask = createAsyncThunk(
	'todos/fetchAddTask',
	async function (_, { rejectWithValue, dispatch, getState }) {
		try {
			const todo = {
				title: getState().todos.text,
				userId: 1,
				completed: false,
			};

			const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(todo)
			});

			if (!response.ok) {
				throw new Error('Не удалось добавить задачу!');
			}
			dispatch(addTask())

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)


const setError = (state, actions) => {
	state.status = 'rejected';
	state.error = actions.payload;
}

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		title: '',
		status: null,
		error: null,
	},
	reducers: {
		addTask(state, actions) {
			state.todos.push({
				id: new Date().toISOString(),
				title: state.title,
				completed: false,
			})
			state.title = ''
		},
		updateText(state, actions) {
			state.title = actions.payload.title;
		},

		removeTask(state, actions) {
			state.todos = state.todos.filter((todo) => todo.id !== actions.payload.id)
		},
		toggelTask(state, actions) {
			const todo = state.todos.find((todo) => todo.id === actions.payload.id);
			todo.completed = !todo.completed;
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state, actions) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchTodos.fulfilled]: (state, actions) => {
			state.status = 'resolved';
			state.todos = actions.payload;
		},
		[fetchTodos.rejected]: setError,
		[fetchDeleteTodo.rejected]: setError,
		[fetchToggelStatus.rejected]: setError,

	}
});

export default todoSlice.reducer;
export const { addTask, removeTask, toggelTask, updateText } = todoSlice.actions;