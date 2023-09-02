import React, { useEffect, useState } from "react";
import { APIManager } from "../helpers/APIManager";
import { v4 as uuidv4 } from "uuid"; // Import the v4 version of UUID generation

const TodoForm = ({
  showModal,
  setShowModal,
  setRefreshData,
  setIsLoading,
}) => {
  function getCurrentDate() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Usage example

  if (!showModal) return null;

  const [isActive, setIsActive] = useState(true);
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(10);

  const handleSubmit = () => {
    setIsLoading(true);
    APIManager.create(getRandomInt(1, 100000), {
      assignee: assignee,
      description: description,
      duration: +duration,
      is_active: isActive,
      updated_at: getCurrentDate(),
    }).then((res) => {
      setRefreshData((prev) => !prev);
      setIsLoading(false);
    });
  };

  return (
    <div>
      {showModal ? (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Todo</h2>
            <div className="grid-container-new-form">
              <div className="grid-item-new-form">
                <label htmlFor="assignee"> Assignee </label>
                <input
                  placeholder="assignee"
                  id="assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                ></input>
              </div>
              <div className="grid-item-new-form">
                <label htmlFor="description">Description</label>
                <input
                  placeholder="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="grid-item-new-form">
                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  placeholder="duration"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></input>
              </div>
              <div className="grid-item-new-form">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value === "true")}
                  style={{ height: "100%" }}
                >
                  <option value="true">Not Done</option>
                  <option value="false">Done</option>
                </select>
              </div>
            </div>
            <div className="new-form-control">
              <button
                onClick={() => {
                  handleSubmit();
                  setRefreshData((prev) => !prev);
                  setShowModal(false);
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TodoForm;
