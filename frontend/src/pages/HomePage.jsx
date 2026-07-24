import PollCard from "../components/PollCard";
import { useState, useEffect } from "react";


function HomePage() {
  const [polls, setPolls] = useState([])


  async function allPolls() {

    const API_URL = "https://capstone-1-polling-app.onrender.com";
    let response = await fetch(`${API_URL}/polls`);
    let data = await response.json();
    console.log(data)
    setPolls(data);

  }
  useEffect(() => {
    allPolls();
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-hero__eyebrow">Capstone Project</p>
        <h1>Build polls, collect votes, and watch the results update.</h1>
        <p>
          This app lets visitors create a poll, vote on options, and see who is
          winning right away.
        </p>
      </section>

      <section className="home-catalog">
        {polls.length === 0 ? (
          <p className="empty-state">No polls have been created.</p>
        ) : (
          <div className="poll-list">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} mode="summary" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default HomePage;
