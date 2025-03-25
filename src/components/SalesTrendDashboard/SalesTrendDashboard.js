import React from "react";
import "../../assets/css/SalesTrendDashboard/SalesTrendDashboard.css";
import SalesTrendHeader from "./components/SalesTrendHeader.js";
import FilterBar from "./components/FiterBar.js";
import SaleDataComponent from "./components/SaleDataComponent.js";
import QuaterlyPerformance from "./components/QuaterlyPerformance.js";
import MonthlyPerformance from "./components/MonthlyPerformance.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSalesContext } from "./components/SalesContext";

function SalesTrendDashboard() {
  const { username, password } = useParams(); // Get values from URL
  const { setKpiData  } = useSalesContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!username || !password) {
      navigate("/dashboard/admin/1234", { replace: true });
    }
  }, [username, password, navigate]);
  // useEffect(() => {
  //   if (username && password) {
  //     fetchSalesData(username, password);
  //   }
  // }, [username, password]);
  // const fetchSalesData = async (user, pass) => {
  //   try {
  //     const response = await fetch(`https://your-api.com/sales/${user}/${pass}`);
  //     const data = await response.json();
  //     console.log("Sales Data:", data);
  // setKpiData(data)
  //     // Handle response data as needed
  //   } catch (error) {
  //     console.error("Error fetching sales data:", error);
  //   }
  // };
  return (
    <div className="sales-trend-dashboard">
      <div className="dashboard-container">
        <SalesTrendHeader />
        <FilterBar />
        <SaleDataComponent />
        <QuaterlyPerformance />
        <MonthlyPerformance />
      </div>
    </div>
  );
}

export default SalesTrendDashboard;


