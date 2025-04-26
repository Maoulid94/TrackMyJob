import React, { use, useEffect, useState } from "react";
import ActionButton from "./actionButton";
interface Props {
  setShowModal: (values: boolean) => void;
  editingJob?: DataType | null;
  clearEditingJob: () => void;
}
interface DataType {
  id: number | null;
  logo: string;
  title: string;
  company: string;
  location: string;
  time: string;
  status: string;
}
const AddModalForm = ({ setShowModal, editingJob, clearEditingJob }: Props) => {
  const [form, setForm] = useState<DataType>({
    id: 0,
    logo: "",
    title: "",
    company: "",
    location: "",
    time: "",
    status: "applied",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Handle Input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = () => {
    const newError: { [key: string]: boolean } = {};
    if (!form.logo) newError.logo = true;
    if (!form.title) newError.title = true;
    if (!form.company) newError.company = true;
    if (!form.location) newError.location = true;
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    const existing = localStorage.getItem("FormData");
    const job = existing ? JSON.parse(existing) : [];
    if (editingJob) {
      // Update existing job
      const updatedJob = job.map((item: DataType) =>
        item.id === editingJob.id
          ? { ...form, time: new Date().toLocaleDateString() }
          : item
      );
      localStorage.setItem("FormData", JSON.stringify(updatedJob));
    } else {
      // Add new job
      const lastId =
        job.length > 0 ? Math.max(...job.map((i: DataType) => i.id)) : 0;
      const newJob = {
        ...form,
        id: lastId + 1,
        time: new Date().toLocaleDateString(),
      };
      const updateJob = [...job, newJob];
      localStorage.setItem("FormData", JSON.stringify(updateJob));
    }
    // Reset from
    setForm({
      id: 0,
      logo: "",
      title: "",
      company: "",
      location: "",
      time: "",
      status: "",
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (editingJob) {
      setForm(editingJob);
    }
  }, [editingJob]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Job Application</h2>
        <label htmlFor="Logo">Logo*</label>
        <input
          name="logo"
          value={form.logo}
          onChange={handleChange}
          placeholder="Logo"
          style={{ borderColor: errors.logo ? "red" : "" }}
        />
        {errors.logo && <p className="error-text">This field is required</p>}
        <label htmlFor="title">Title*</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          style={{ borderColor: errors.title ? "red" : "" }}
        />
        {errors.title && <p className="error-text">This field is required</p>}
        <label htmlFor="company">Company*</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          style={{ borderColor: errors.company ? "red" : "" }}
        />
        {errors.company && <p className="error-text">This field is required</p>}
        <label htmlFor="location">Location*</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          style={{ borderColor: errors.location ? "red" : "" }}
        />
        {errors.location && (
          <p className="error-text">This field is required</p>
        )}
        <label htmlFor="status">Status*</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="applied">Applied</option>
          <option value="in progress">In Progress</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="action-btn">
          <ActionButton
            title="Cancel"
            handleClick={() => {
              clearEditingJob();
              setShowModal(false);
            }}
          />
          <ActionButton
            title="Save"
            handleClick={() => {
              handleSave();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddModalForm;
