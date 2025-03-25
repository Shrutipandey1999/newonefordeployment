import "./App.css";
import SalesTrendDashboard from "./components/SalesTrendDashboard/SalesTrendDashboard";
import { SalesProvider } from "./components/SalesTrendDashboard/components/SalesContext";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}


function App() {
  return (
    
    <SalesProvider>  
      <Router>
        <div className="App">
          <Routes>
            {/* Route with username and password in the path */}
            <Route path="/dashboard/:username/:password" element={<SalesTrendDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </SalesProvider>

  );
}

export default App;