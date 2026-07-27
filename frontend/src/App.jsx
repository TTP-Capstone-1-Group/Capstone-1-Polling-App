import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CreatePollPage from "./pages/CreatePollPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PollPage from "./pages/PollPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

// This function sets up the main page shell and connects each URL path to its page component.
function App() {
  return (
    <>
      {/* This return draws the navigation bar and the page area where route content appears. */}
      <Navbar />
      <main className="pageShell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePollPage />} />
          <Route path="/polls/:pollId" element={<PollPage />} />
          <Route path="/polls/:pollId/results" element={<ResultsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

