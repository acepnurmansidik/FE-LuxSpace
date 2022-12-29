import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import Details from "pages/Details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:idc" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
