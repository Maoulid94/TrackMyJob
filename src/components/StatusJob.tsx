import React from "react";

interface Props {
  filterStatus: string;
  setfilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const StatusJob = ({ filterStatus, setfilterStatus }: Props) => {
  return (
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
  );
};
