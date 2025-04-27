import React from "react";
import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  openMenuItem: number | null;
  handleFilterJob: any[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleMenuClick: (id: number) => void;
}

export const ListCart = ({
  handleFilterJob,
  openMenuItem,
  handleEdit,
  handleDelete,
  handleMenuClick,
}: Props) => {
  return (
    <div className="card">
      {handleFilterJob.length === 0 && <p>No cards found.</p>}
      {handleFilterJob.map((item) => (
        <div key={item.id} className="card-item">
          <div className="EllipsisH-icon">
            <FaEllipsisH
              size={16}
              onClick={() => {
                handleMenuClick(item.id);
              }}
            />
          </div>
          {/*  Dropdown Menu for updated and deleted */}
          {openMenuItem === item.id && (
            <div className="dropdown-menu">
              <button onClick={() => handleEdit(item.id)}>
                <FaEdit style={{ marginRight: "8px" }} />
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                <FaTrash style={{ marginRight: "8px" }} />
                Delete
              </button>
            </div>
          )}
          <div className="card-logo-title">
            <div className="card-logo">
              <img src={item.logo} alt="logo of company" />
            </div>
            <div className="card-text">
              <h3 className="job-title">{item.title}</h3>
              <p className="text">{item.company}</p>
              <p className="text">{item.location}</p>
              <p className="card-status-time">
                <strong>{item.status}</strong> <br />
                <small>{item.time}</small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
