import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import ImagesPage from "./pages/imagesweb/ImagesPage";

function App() {
  return (
    <div id="home">
      <Router>
        <Routes>
          <Route path="/george-portfolio" element={<PortfolioPage />} />
          <Route path="/images" element={<ImagesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
