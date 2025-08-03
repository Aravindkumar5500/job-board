import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import'./Joblist.css'

const API_URL = "https://job-board-backend-efa3.onrender.com/jobs";

function JobList() {
  // job lists
  const [jobs, setJobs] = useState([]);
  const nav = useNavigate();
  
  // add job
  const [form,setForm] = useState({ title:"", company:"", description:""})

// job  List
  useEffect(() => {

    const fetchJobs = async () =>{
      try {
        const res = await axios.get(API_URL);
        console.log("Job data fetched:", res.data.data); 
        setJobs(res.data.data)
        
      } catch (error) {
        console.error("Error fecthing jobs:",error)
      }
    }
     fetchJobs()
  }, []);

// add job

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.company || !form.description) {
    
    alert("All Fields are required")
    return;
  }
  try {
    const res = await axios.post(API_URL,form)
       setJobs(prev => [...prev, res.data.data]); 
    setForm({title:"", company:"",description:""});
    // alert("New Job added")
    
  } catch (error) {
    console.error("Something went wrong!", error)
  }
}

  return (
    <div className='container py-4'>
      <h2>Job Board</h2>
      <div className='row justify-content-center mb-3'>
        <div className='col-12 col-md-8'>
          <form className='jobForm space-y-4' onSubmit={handleSubmit}>
            <h3>Add Job</h3>
            <input className='intitle' type='text' value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder='Title' />
            <input className='incompany' type='text' value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})}  placeholder='Company'/>
            <input className='indescription' type='text' value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}  placeholder='Description'/>
            <div>
              <button className='btn btn-outline-success' type='submit'  >Add Job</button>
            </div>

          </form>
          <div className='table-wrapper'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th >Title</th>
                  <th style={{ width: "100px" }}>Company</th>
                  <th >Description</th>
                  <th style={{ width: "100px"}}>Details</th>
                </tr>
              </thead>
              <tbody>
       {Array.isArray(jobs) && jobs.length > 0 ? (
  jobs.map((e, i) => (
    <tr key={e._id}>
      <td>{i + 1}</td>
      <td>{e.title}</td>
      <td>{e.company}</td>
      <td className='tddes'>{e.description}</td>
      <td>
        <button className="btn btn-outline-primary"type="button" onClick={() => nav("/JobDetail/" + e._id)}> Details </button>
       
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">No jobs found.</td>
  </tr>
)}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobList;
