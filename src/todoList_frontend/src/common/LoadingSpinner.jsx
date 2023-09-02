import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="modal-overlay">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}
