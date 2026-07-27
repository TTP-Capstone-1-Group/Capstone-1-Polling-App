import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PollCard from "../components/PollCard";


function PollPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [copied, setCopied] = useState(false);

  async function getPoll() {
    const API_URL = import.meta.env.VITE_API_URL;
    let response = await fetch(`${API_URL}/polls/${pollId}`);
    let data = await response.json();

    setPoll(data);
  }

  useEffect(() => {
    getPoll();
  }, [pollId]);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true)
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false)
    }
  }

  if (!poll) {
    return (
      <main className="page-container">
        <p>Loading Poll...</p>
      </main>
    );
  }

  async function handleVote() {
    if (selectedOptionId === null) {
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL;
    await fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId: selectedOptionId }),
    });

    navigate(`/polls/${poll.id}/results`);
  }

  return (
    <main className="poll-page">
      <section className="poll-page__hero">
        <p className="poll-page__eyebrow">Cast Your Vote</p>
        <h1>Poll Page</h1>
        <p>Choose one option below and submit your vote.</p>


        <div className="poll-page__hero-actions">
          <button
            type="button"
            className="poll-page__share-button"
            onClick={handleShare}
          >
            Share this Poll
          </button>

          {copied && (
            <p className="poll-page__share-status">Link copied!</p>
          )}
        </div>
      </section>

      <section className="poll-page__content">
        <div className="poll-page__card-wrap">
          <PollCard
            poll={poll}
            mode="vote"
            selectedOptionId={selectedOptionId}
            onOptionSelect={setSelectedOptionId}
            onVote={handleVote}
          />
        </div>

      </section>
    </main >
  );
}

export default PollPage;
