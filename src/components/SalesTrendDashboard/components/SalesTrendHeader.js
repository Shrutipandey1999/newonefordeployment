import React from "react";
import { Box, Typography } from "@mui/material";
 
import "../../../assets/css/SalesTrendDashboard/SalesTrendHeader.css";
const SalesTrendHeader = () => {
  return (
<Box className="trends">
      <Box className="header-container">
        {/* Header Section */}
        <Box className="header-title">
          <Typography variant="h6" className="title-text">
            Sales Trend Dashboard
          </Typography>
        </Box>
        <Box className="header-info">
          <Typography variant="body2" className="info-text">
            <strong className="info-strong">Dharmendra Singh Rawat</strong> | Prashant Vihar (Delhi)
          </Typography>
          <Typography variant="body2" className="info-text-right">
            <strong>Last refresh</strong> 11-Feb 11:52pm
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
 
export default SalesTrendHeader;
 