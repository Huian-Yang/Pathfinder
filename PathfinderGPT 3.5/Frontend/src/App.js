import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Careerfinder from './Careerfinder';
import Form from './Form';
import Roadmap from './Roadmap';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/careerfinder" element={<Careerfinder />} />
          <Route path="/form" element={<Form />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

