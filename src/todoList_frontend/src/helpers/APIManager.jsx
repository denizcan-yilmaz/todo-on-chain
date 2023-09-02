import { todoList_backend } from "../../../declarations/todoList_backend";

export const APIManager = {
  fetchAll: async () => {
    const todos = await todoList_backend.fetch_all();
    return todos;
  },

  get: async (key) => {
    const todoItem = await todoList_backend.get(key);
    return todoItem;
  },

  create: async (key, newTodoItem) => {
    const todoItem = await todoList_backend.create(key, newTodoItem);
    return todoItem;
  },

  update: async (key, newTodoItem) => {
    const todoItem = await todoList_backend.update(key, newTodoItem);
    return todoItem;
  },

  delete: async (key) => {
    const todoItem = await todoList_backend.delete(key);
    return todoItem;
  },
};
