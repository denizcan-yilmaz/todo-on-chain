import React, { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { APIManager } from "../helpers/APIManager";

const TodoList = ({
  showModal,
  setShowModal,
  editModal,
  setEditModal,
  refreshData,
  setRefreshData,
  setSelectedItem,
  isLoading,
  setIsLoading,
}) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  const handleDelete = (e) => {
    const tr = e.target.closest("tr");
    const key = tr.getAttribute("data-key");
    setIsLoading(true);
    APIManager.delete(Number(key)).then((res) => {
      console.log(res);
      setRefreshData((prev) => !prev);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    APIManager.fetchAll().then((res) => {
      setFetchedData(res);
      console.log(res);
    });
  }, [refreshData]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="new-todo-wrapper">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="btn-add-new-todo"
        >
          Add New Todo
        </button>
      </div>
      <div className="table-wrapper">
        {!fetchedData?.[0]?.[0]?.length && <p>No entries found.</p>}
        {fetchedData?.[0]?.[0]?.length && (
          <table className="todo-list-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Assignee</th>
                <th>Description</th>
                <th>Duration(Days)</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fetchedData?.[0].map((d) => {
                console.log("d: ", d);
                return (
                  <tr key={d[0]} data-key={d[0]}>
                    <td>{d[1].is_active ? "Not Done" : "Done"}</td>
                    <td>{d[1].assignee}</td>
                    <td>{d[1].description}</td>
                    <td>{d[1].duration}</td>
                    <td>{d[1].updated_at}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedItem({ key: d[0], data: d[1] });
                          setEditModal(true);
                        }}
                        style={{ padding: "5px", marginRight: "5px" }}
                      >
                        Edit
                      </button>
                      <button onClick={handleDelete} style={{ padding: "5px" }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TodoList;
