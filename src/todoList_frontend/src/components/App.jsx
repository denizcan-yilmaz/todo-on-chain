import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { todoList_backend } from "../../../declarations/todoList_backend";
import Navbar from "../components/Navbar";
import TodoEdit from "../components/TodoEdit";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { APIManager } from "../helpers/APIManager";
import "../index.css";

import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import { ConnectDialog, Connect2ICProvider } from "@connect2ic/react";
import { useBalance, useWallet } from "@connect2ic/react";

import "@connect2ic/core/style.css";
import * as todoCanister from "../../../../.dfx/local/canisters/todoList_backend";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useWallet();
  const balance = useBalance();

  useEffect(() => {
    console.log("wallet: ", wallet);
    console.log("balance: ", balance);
  }, [wallet]);

  return (
    <>
      <Navbar />
      <ConnectDialog />
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

// export default App;
const client = createClient({
  canisters: {
    todoCanister,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: true,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
