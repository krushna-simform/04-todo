import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "@/types/type";

const TODO_STORAGE_KEY = "todos";

interface TodoState {
  todos: Array<Todo>;
}

const savedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || "[]");

const initialState: TodoState = {
  todos: Array.isArray(savedTodos) ? savedTodos : [],
};

const saveToLocalStorage = (todos: Array<Todo>) => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveToLocalStorage(state.todos);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      saveToLocalStorage(state.todos);
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
