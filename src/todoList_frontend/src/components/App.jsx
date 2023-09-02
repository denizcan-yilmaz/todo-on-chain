import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { todoList_backend } from "../../../declarations/todoList_backend";
import Navbar from "../components/Navbar";
import TodoEdit from "../components/TodoEdit";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { APIManager } from "../helpers/APIManager";
import "../index.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar />
      <TodoList
        setEditModal={setEditModal}
        showModal={showModal}
        setShowModal={setShowModal}
        setRefreshData={setRefreshData}
        refreshData={refreshData}
        setSelectedItem={setSelectedItem}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <TodoForm
        showModal={showModal}
        setShowModal={setShowModal}
        setRefreshData={setRefreshData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <TodoEdit
        editModal={editModal}
        setEditModal={setEditModal}
        setRefreshData={setRefreshData}
        selectedItem={selectedItem}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default App;
