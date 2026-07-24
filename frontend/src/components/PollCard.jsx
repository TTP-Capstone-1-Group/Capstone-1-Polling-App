import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ResultsList from "./ResultsList";

function PollCard({
  poll,
  mode = "summary",
  selectedOptionId = null,
  onOptionSelect = () => {},
  onVote = () => {},
  isSubmitting = false,
}) {
  useEffect(() => {
      if (poll) {
        console.log("Current Poll:", poll);
      }
    }, [poll]);
  
    // 2. Perform the guard clause check AFTER the hook
    if (!poll) {
      return <p className="empty-state">Poll data is unavailable.</p>;
    }

  const options = Array.isArray(poll.options) ? poll.options : [];

  const isSummaryMode = mode === "summary";
  const isVoteMode = mode === "vote";
  const isResultsMode = mode === "results";

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

        {poll.description && <p>{poll.description}</p>}
      </header>

      {isVoteMode && (
        <form
          className="poll-card__vote-form"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend>Select one option</legend>

            {options.length === 0 ? (
              <p className="empty-state">This poll has no options.</p>
            ) : (
              options.map((option) => (
                <label key={option.id} className="poll-card__option">
                  <input
                    type="radio"
                    name={`poll-${poll.id}-option`}
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={() => onOptionSelect(option.id)}
                  />

                  <span>{option.text}</span>
                </label>
              ))
            )}
          </fieldset>

          <button
            type="submit"
            disabled={
              selectedOptionId === null ||
              isSubmitting ||
              options.length === 0
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </button>
        </form>
      )}

      {isResultsMode && <ResultsList options={options} />}

      <footer className="poll-card__actions">
        {isSummaryMode && (
          <>
            <Link className= "pollCardLink" to={`/polls/${poll.id}`}>Vote</Link>

            <Link className="pollCardLink" to={`/polls/${poll.id}/results`}>
              View Results
            </Link>
          </>
        )}

        {isVoteMode && (
          <Link to={`/polls/${poll.id}/results`}>
            View Results
          </Link>
        )}

        {isResultsMode && (
          <Link to={`/polls/${poll.id}`}>Back to Poll</Link>
        )}
      </footer>
    </article>
  );
}

export default PollCard;
