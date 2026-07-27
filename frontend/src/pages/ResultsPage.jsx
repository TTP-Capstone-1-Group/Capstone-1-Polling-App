import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PollCard from "../components/PollCard";

function ResultsPage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

  async function getPoll() {
    const API_URL = import.meta.env.VITE_API_URL; 
    let response = await fetch(`${API_URL}/polls/${pollId}`);
    let data = await response.json();
    setPoll(data);
  }

  useEffect(() => {
    getPoll();
  }, []);

  if (!poll) {
    return (
      <main className="page-container">
        <h1>Poll Not Found</h1>
        <p className="empty-state">The requested poll does not exist.</p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1>Poll Results</h1>
      <PollCard poll={poll} mode="results" />
    </main>
  );
}

export default ResultsPage;
