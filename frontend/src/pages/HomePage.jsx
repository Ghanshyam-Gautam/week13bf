import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home">
      <div className="job-list">
        {loading && <p>Loading jobs…</p>}

        {!loading && jobs.length === 0 && <p>No jobs found</p>}

        {!loading &&
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobListing key={job._id} id={job._id} {...job} />
          ))}
      </div>
    </div>
  );
};

export default Home;