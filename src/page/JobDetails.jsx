import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://job-board-backend-efa3.onrender.com/jobs";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

 useEffect(() => {
  if (!id) {
    setError("No job ID provided");
    return;
  }

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      if (res.data?.data?._id) {
        setJob(res.data.data);
      } else {
        setError("Job not found");
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Job not found");
    }
  };

  fetchJob();
}, [id]);


  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!job) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Title</th>
            <th style={{ width: "100px" }}>Company</th>
            <th style={{ width: "100px" }}>Description</th>
            <th style={{ width: "150px" }}>Posted At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td className="tddes">{job.description}</td>
            <td>{new Date(job.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobDetail;
