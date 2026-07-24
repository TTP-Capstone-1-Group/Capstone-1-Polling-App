import { useState } from "react";
import { useNavigate } from "react-router-dom";

function createOption(id) {
  return {
    id,
    text: "",

  };
}

function CreatePollPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([
    createOption(1),
    createOption(2),
  ]);
  const [error, setError] = useState("");

  function handleOptionChange(optionId, text) {
    setOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === optionId ? { ...option, text } : option,
      ),
    );
  }
  function handleRemoveOption(optionId) {
    setOptions((currentOptions) => {
      if (currentOptions.length <= 2) {
        return currentOptions
      }
      return currentOptions.filter((option) => option.id !== optionId)
    })
  }

  function handleAddOption() {
    setOptions((currentOptions) => {
      const nextOptionId =
        Math.max(...currentOptions.map((option) => option.id), 0) + 1;

      return [...currentOptions, createOption(nextOptionId)];
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const nonEmptyOptions = options
      .filter((option) => option.text.trim())
      .map((option) => ({ ...option, text: option.text.trim() }));

    if (!trimmedTitle || nonEmptyOptions.length < 2) {
      setError("Enter a title and at least two options.");
      return;
    }

    try {
      setError("");
      const API_URL = "https://capstone-1-polling-app.onrender.com";

      const response = await fetch(`${API_URL}/polls/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          description: description.trim(),
          options: nonEmptyOptions.map((option) => ({
            text: option.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create poll");
      }
      const createdPoll = await response.json()
      navigate(`/polls/${createdPoll.id}`)
    } catch {
      setError("Could not save poll. Please try again.")
    }
  }

  return (
    <main className="create-page">
      <section className="create-page__hero">
        <p className="create-page__eyebrow">Create a poll</p>
        <h1>Build a poll your audience can vote on right away.</h1>
        <p>
          Add a title, optional description, and at least two choices.
        </p>
      </section>

      <section className="create-page__form-card">
        <form className="create-page__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="poll-title">Title</label>

          <input
            id="poll-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="poll-description">Description</label>
          <textarea
            id="poll-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="2"
          />

          <fieldset className="create-page__fieldset">
            <legend>Options</legend>

            {options.map((option, index) => (
              <div className="form-option" key={option.id}>
                <label htmlFor={`option-${option.id}`}>
                  Option {index + 1}
                </label>

                <div className="form-option__row">
                  <input
                    id={`option-${option.id}`}
                    type="text"
                    value={option.text}
                    onChange={(event) =>
                      handleOptionChange(option.id, event.target.value)
                    }
                    required={index < 2}
                  />

                  {options.length > 2 && (
                    <button
                      type="button"
                      className="form-option__remove"
                      onClick={() => handleRemoveOption(option.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </fieldset>
          <div className="create-page__actions">
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>

            <button type="submit">Create Poll</button>
          </div>
          
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

        </form>
      </section>
    </main>
  );
}

export default CreatePollPage;