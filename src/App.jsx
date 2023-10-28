import React from "react";
import "./index.css";
import SIdebar from "./components/SIdebar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <section className="app-container">
      <SIdebar />
      <MainContent />
    </section>
  );
}

export default App;
