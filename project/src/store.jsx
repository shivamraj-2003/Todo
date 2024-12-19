import { configureStore, createSlice } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

// Create todos slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    setEmployees: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export const { setEmployees } = employeesSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    employees: employeesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
