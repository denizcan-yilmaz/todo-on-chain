import { todoList_backend } from "../../../declarations/todoList_backend";

export const APIManager = {
  fetchAll: async () => {
    const todos = await todoList_backend.fetch_all();
    console.log("todos: ", todos);
    return todos;
  },

  get: async (key) => {
    const todoItem = await todoList_backend.get(key);
    console.log("get: ", todoItem);
    return todoItem;
  },

  create: async (key, newTodoItem) => {
    const todoItem = await todoList_backend.create(key, newTodoItem);
    console.log("create: ", todoItem);
    return todoItem;
  },

  update: async (key, newTodoItem) => {
    const todoItem = await todoList_backend.update(key, newTodoItem);
    console.log("update: ", todoItem);
    return todoItem;
  },

  delete: async (key) => {
    const todoItem = await todoList_backend.delete(key);
    console.log("delete: ", todoItem);
    return todoItem;
  },
};
