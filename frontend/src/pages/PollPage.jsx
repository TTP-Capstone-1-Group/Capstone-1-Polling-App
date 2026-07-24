import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollCard from "../components/PollCard";


function PollPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  async function getPoll() {
    const API_URL = "https://capstone-1-polling-app.onrender.com";
    let response = await fetch(`${API_URL}/polls/${pollId}`);
    let data = await response.json();

    setPoll(data);
  }

  useEffect(() => {
    getPoll();
  }, [pollId]);

  async function handleVote() {
    if (selectedOptionId === null) {
      return;
    }
    const API_URL = "https://capstone-1-polling-app.onrender.com";
    await fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId: selectedOptionId }),
    });

    navigate(`/polls/${poll.id}/results`);
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-hero__eyebrow">Cast Your Vote</p>
        <h1>Choose your favorite option.</h1>
        <p>
          Select one answer below, submit your vote, and then see the results.
        </p>
      </section>

      <section className="home-catalog">
        {!poll ? (
          <p className="empty-state">Loading poll...</p>
        ) : (
          <div className="poll-list">
            <PollCard
              poll={poll}
              mode="vote"
              selectedOptionId={selectedOptionId}
              onOptionSelect={setSelectedOptionId}
              onVote={handleVote}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default PollPage;
