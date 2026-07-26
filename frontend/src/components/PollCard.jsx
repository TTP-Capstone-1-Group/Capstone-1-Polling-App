import { Link } from "react-router-dom";
import { useEffect } from "react";
import ResultsList from "./ResultsList";

function PollCard({
  poll,
  mode = "summary",
  selectedOptionId = null,
  onOptionSelect = () => { },
  onVote = () => { },
  isSubmitting = false,
}) {
  useEffect(() => {
    if (poll) {
      console.log("Current Poll:", poll);
    }
  }, [poll]);

  if (!poll) {
    return <p className="empty-state">Poll data is unavailable.</p>;
  }

  const options = Array.isArray(poll.options) ? poll.options : [];
  const isSummaryMode = mode === "summary";
  const isVoteMode = mode === "vote";
  const isResultsMode = mode === "results";

  const descriptionText =
    poll.description?.trim() || "No description was added for this poll yet.";

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedOptionId === null || isSubmitting) {
      return;
    }

    onVote();
  }

  return (
    <article className="poll-card">
      <header className="poll-card__header">
        <h2>{poll.title}</h2>
        <p>{descriptionText}</p>
      </header>

      {isVoteMode && (
        <form className="poll-card__vote-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Select one option</legend>

            <div className="poll-card__options">
              {options.length === 0 ? (
                <p className="empty-state">This poll has no options.</p>
              ) : (
                options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`poll-card__option-button ${selectedOptionId === option.id ? "is-selected" : ""
                      }`}
                    onClick={() => onOptionSelect(option.id)}
                    aria-pressed={selectedOptionId === option.id}
                  >
                    {option.text}
                  </button>
                ))
              )}
            </div>
          </fieldset>

          <div className="poll-card__actions">
            <button
              type="submit"
              className="poll-card__action"
              disabled={
                selectedOptionId === null ||
                isSubmitting ||
                options.length === 0
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Vote"}
            </button>

            <Link className="poll-card__action"
              to={`/polls/${poll.id}/results`}
            >
              View Results
            </Link>
          </div>
        </form>
      )}

      {isResultsMode && <ResultsList options={options} />}

      <footer className="poll-card__actions">
        {isSummaryMode && (
          <>
            <Link className="poll-card__action" to={`/polls/${poll.id}`}>
              Vote
            </Link>

            <Link className="poll-card__action" to={`/polls/${poll.id}/results`}>
              View Results
            </Link>
          </>
        )}
        {isResultsMode && (
          <Link className="poll-card__action" to={`/polls/${poll.id}`}>
            Back to Poll
          </Link>
        )}
      </footer>
    </article>
  );
}

export default PollCard;