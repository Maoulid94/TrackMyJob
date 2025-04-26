import React, { useState, useEffect } from "react";
import { FaPlus, FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";
import AddModalForm from "./components/AddModalForm";

interface DataType {
  id: number;
  logo: string;
  title: string;
  company: string;
  location: string;
  time: string;
  status: string;
}

const Card = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [openMenuItem, setOpenMenuItem] = useState<number | null>(null);
  const [editingJob, setEditingJob] = useState<DataType | null>(null);
  const [filterStatus, setfilterStatus] = useState<string>("applied");
  // Handle Filter
  const handleFilterJob = data.filter(
    (job) => job.status.toLowerCase() === filterStatus
  );

  const fetchData = () => {
    try {
      const saved = localStorage.getItem("FormData");
      console.log("Saved : ", saved);

      const result = saved ? JSON.parse(saved) : null;
      if (Array.isArray(result)) {
        setData(result);
        console.log("infos : ", result);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error parsing localStorage data : ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [showModal]);
  // Handle Dropdown Menu
  const handleMenuClick = (id: number) => {
    if (openMenuItem === id) {
      setOpenMenuItem(null);
    } else {
      setOpenMenuItem(id);
    }
  };
  // // Handle Delete
  const handleDelete = (id: number) => {
    try {
      const existingJob = localStorage.getItem("FormData");
      const jobList = existingJob ? JSON.parse(existingJob) : [];
      const updatedJob = jobList.filter((JOB: DataType) => JOB.id !== id);
      localStorage.setItem("FormData", JSON.stringify(updatedJob));
      setData(updatedJob);
      setOpenMenuItem(null);
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };
  // Handle Edit
  const handleEdit = (id: number) => {
    const jobToEdit = data.find((job) => job.id === id);
    if (jobToEdit) {
      setEditingJob(jobToEdit);
      setShowModal(true);
      setOpenMenuItem(null);
    }
  };
  // clearEditingJob
  const clearEditingJob = () => {
    setEditingJob(null);
  };
  return (
    <div className="container-card">
      <h2 className="title">My Jobs</h2>
      {data.length > 0 ? (
        <div className="filter-btn">
          <button
            className={filterStatus === "applied" ? "active" : ""}
            onClick={() => setfilterStatus("applied")}
          >
            Applied
          </button>
          <button
            className={filterStatus === "in progress" ? "active" : ""}
            onClick={() => setfilterStatus("in progress")}
          >
            In Progress
          </button>
          <button
            className={filterStatus === "offer" ? "active" : ""}
            onClick={() => setfilterStatus("offer")}
          >
            Offer
          </button>
          <button
            className={filterStatus === "rejected" ? "active" : ""}
            onClick={() => setfilterStatus("rejected")}
          >
            Rejected
          </button>
        </div>
      ) : null}

      <button
        className="btn"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <FaPlus />
      </button>
      {showModal && (
        <AddModalForm
          setShowModal={setShowModal}
          editingJob={editingJob}
          clearEditingJob={clearEditingJob}
        />
      )}
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

            {/* Dropdown Menu for updated and deleted */}
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
              <img src={item.logo} alt="logo of company" />
              <h3 className="job-title">{item.title}</h3>
            </div>
            <p>{item.company}</p>
            <p>{item.location}</p>
            <p className="card-status-time">
              <strong>{item.status}</strong> <br />
              <small>{item.time}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Card />
    </>
  );
};

export default App;
