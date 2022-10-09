import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const intialValue = {
  data: [],
};

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const resp = await fetch(
      "https://63422976ba4478d4783893fc.mockapi.io/api/v1/todos"
    );
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const COMPLETED_TODOAsync = createAsyncThunk(
  "todos/COMPLETED_TODOAsync",
  async (payload) => {
    const resp = await fetch(
      "https://63422976ba4478d4783893fc.mockapi.io/api/v1/todos/${payload.id}",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );
    if (resp.ok) {
      const todo = await resp.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const ADD_TODOAsync = createAsyncThunk(
  "todos/ADD_TODOsAsync",
  async (payload) => {
    const resp = await fetch(
      "https://63422976ba4478d4783893fc.mockapi.io/api/v1/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: payload.title }),
      }
    );
    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const DELETE_TODOAsync = createAsyncThunk(
  "todos/DELETE_TODOAsync",
  async (payload) => {
    const resp = await fetch(
      "https://63422976ba4478d4783893fc.mockapi.io/api/v1/todos/${payload.id}",
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: intialValue,
  reducers: {
    ADD_TODO: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    COMPLETED_TODO: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    DELETE_TODO: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [ADD_TODOAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [COMPLETED_TODOAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.todo.completed;
    },
    [DELETE_TODOAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { ADD_TODO, COMPLETED_TODO, DELETE_TODO } = todoSlice.actions;
export default todoSlice.reducer;
