import "./App.css";
import React from "react";

import Container from "./components/Container";
import { Routes, Route } from "react-router-dom";
import Answers from "./components/Answers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Container />} />
        <Route path="answers" element={<Answers />} />
      </Routes>
    </div>
  );
}

export default App;
