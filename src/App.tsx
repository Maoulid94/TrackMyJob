import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "./styles/App.css";
import "./styles/ListCard.css";
import AddModalForm from "./components/AddModalForm";
import { ListCart } from "./components/ListCard";
import { StatusJob } from "./components/StatusJob";

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
  // Fetch Data from localStorage
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
        <StatusJob
          filterStatus={filterStatus}
          setfilterStatus={setfilterStatus}
        />
      ) : null}
      <button
        className="add-btn"
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
      <ListCart
        openMenuItem={openMenuItem}
        handleFilterJob={handleFilterJob}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleMenuClick={handleMenuClick}
      />
    </div>
  );
};
const App = () => {
  return <Card />;
};
export default App;
