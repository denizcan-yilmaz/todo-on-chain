import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { APIManager } from "../helpers/APIManager";

const TodoEdit = ({
  selectedItem,
  editModal,
  setEditModal,
  setRefreshData,
  setIsLoading,
}) => {
  if (!editModal) return;

  useEffect(() => {
    console.log("selected item: ", selectedItem);
  }, [selectedItem]);

  function getCurrentDate() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
  }

  const [isActive, setIsActive] = useState(selectedItem.data.is_active);
  const [assignee, setAssignee] = useState(selectedItem.data.assignee);
  const [description, setDescription] = useState(selectedItem.data.description);
  const [duration, setDuration] = useState(selectedItem.data.duration);

  const handleUpdate = () => {
    setIsLoading(true);
    APIManager.update(selectedItem.key, {
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
      {editModal ? (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Existing Todo</h2>
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
                  handleUpdate();
                  setRefreshData((prev) => !prev);
                  setEditModal(false);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditModal(false);
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

export default TodoEdit;
