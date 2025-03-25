import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import "../../../assets/css/SalesTrendDashboard/MonthlyPerformance.css";
import ArrowUpwardIcon from "../../../assets/images/ArrowUpwardIcon_green.svg";
import ArrowDownwardIcon from "../../../assets/images/ArrowDownwardIcon_red.svg";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSalesContext } from "./SalesContext";
// Generate dummy data


const MonthlyPerformance = () => {
  const { kpiData, salesUnit } = useSalesContext();
 
  const card5DataArray = [kpiData.kpi_data.card5_data];

  const [viewMode, setViewMode] = useState("monthly");
  const [month, setMonth] = useState("All");
  //const data = generateQuarterlyData();

  // Group data by quarters for rendering
  const quarters = Object.keys(card5DataArray[0]);
  const groupedData = quarters.reduce((acc, quarter) => {
    acc[quarter] = Object.keys(card5DataArray[0][quarter]).map((month) => ({
      quarter,
      month,
      ...card5DataArray[0][quarter][month]
    }));
    return acc;
  }, {});
  const handleViewModeChange = (event) => {
    setViewMode(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

    const handleDownload = () => {
      // Flatten the nested data
      const data = [];
      for (const quarter in card5DataArray[0]) {
        if (quarter !== 'Grand_Total') {
          for (const month in card5DataArray[0][quarter]) {
            const row = { Quarter: quarter, Month: month, ...card5DataArray[0][quarter][month] };
            data.push(row);
          }
        } else {
          const row = { Quarter: 'Grand_Total', Month: '', ...card5DataArray[0][quarter] };
          data.push(row);
        }
      }
  
      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Convert the workbook to a binary array
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      // Save the file
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'monthly_performance.xlsx');
    };

  const renderValueWithIndicator = (value, isPercentage = false) => {
    const color = value >= 0 ? "#4CAF50" : "#F44336";
    const ArrowIcon = value >= 0 ? ArrowUpwardIcon : ArrowDownwardIcon;

    // Format the value to always have exactly 2 decimal places
    const formattedValue = isPercentage
      ? Number(Math.abs(value)).toFixed(2) + "%"
      : Number(Math.abs(value)).toFixed(2);

    return (
      <Box className="valueIndicator" sx={{ color }}>
        <img src={ArrowIcon} alt={value >= 0 ? "Up" : "Down"} />
        <span>{formattedValue}</span>
      </Box>
    );
  };
  const renderValueWithoutIndicator = (value, isPercentage = false) => {
    const color = value >= 0 ? "#4CAF50" : "#F44336";
   

    // Format the value to always have exactly 2 decimal places
    const formattedValue = isPercentage
      ? Number(Math.abs(value)).toFixed(2) + "%"
      : Number(Math.abs(value)).toFixed(2);

    return (
      <Box className="valueIndicator" sx={{ color }}>
       
        <span>{formattedValue}</span>
      </Box>
    );
  };

  return (
    <Box>
      <Box className="header">
        {/* Title Section */}
        <Box className="title-container">
          <Typography className="title">Monthly Performance ({salesUnit})</Typography>
        </Box>

        {/* Controls Section */}
        <Box className="controls">
          <FormControl className="view-mode-control">
            <RadioGroup className="quaterly" col value={viewMode} onChange={handleViewModeChange}>
              <FormControlLabel
                value="quarterly"
                control={<Radio />}
                label={
                  <Typography className="view-mode-label">Quarterly</Typography>
                }
              />
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label={
                  <Typography className="view-mode-label">Monthly</Typography>
                }
              />
            </RadioGroup>
          </FormControl>

          <FormControl className="month-selector">
            <Typography
              id="month-select-label"
              className="month-selector-label"
            >
              Month
            </Typography>
            <Select
              labelId="month-select-label"
              value={month}
              onChange={handleMonthChange}
              size="small"
              className="month-dropdown"
              displayEmpty
              renderValue={(selected) => (selected ? selected : "All")}
            >
              {/* <MenuItem value="" disabled>All</MenuItem> */}
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="October">October</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="December">December</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleDownload} className="download-button">
            Download MIS
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader size="small">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Qtr.</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>LLY</TableCell>
              <TableCell>LY</TableCell>
              <TableCell>LY Grw</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>CY</TableCell>
              <TableCell>%Ach</TableCell>
              <TableCell>CY Grw</TableCell>
              <TableCell>CAGR</TableCell>
              <TableCell>Balance to do</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {quarters.map((quarter) => (
            quarter !== "Grand_Total" && (
              <React.Fragment key={`${quarter}-section`}>
                {groupedData[quarter].length > 0 ? (
                  groupedData[quarter].map((row, index) => (
                    <TableRow key={`${row.quarter}-${row.month}`}>
                      {index === 0 && (
                        <TableCell
                          rowSpan={groupedData[quarter].length.toString()}
                          className="table-quarter-cell"
                        >
                          {row.quarter}
                        </TableCell>
                      )}
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell-2"}`}
                       style={{ fontWeight: row.month === "Total" ? 'bold' : 'bold' }} >
                        {row.month}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {row.LLY}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {row.LY}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {renderValueWithIndicator(row.LY_Grw, true)}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {row.Target}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {row.CY}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {renderValueWithoutIndicator(row.Per_Ach, true)}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {renderValueWithIndicator(row.CY_Growth, true)}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {renderValueWithIndicator(row.CAGR, true)}
                      </TableCell>
                      <TableCell className={`table-cell ${row.month === "Total" ? "total-cell" : "regular-cell"}`}>
                        {renderValueWithoutIndicator(-row.Balance)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={`${quarter}-no-data`}>
                    <TableCell colSpan={11} className="table-cell no-data-cell">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          ))}

          {/* Grand Total Row */}
          <TableRow className="grand-total-row">
            <TableCell colSpan={2} className="table-cell total-cell">
              Grand Total
            </TableCell>
            <TableCell className="table-cell total-cell">
              {card5DataArray[0].Grand_Total.LLY}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {card5DataArray[0].Grand_Total.LY}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {renderValueWithIndicator(card5DataArray[0].Grand_Total.LY_Grw, true)}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {card5DataArray[0].Grand_Total.Target}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {card5DataArray[0].Grand_Total.CY}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {renderValueWithoutIndicator(card5DataArray[0].Grand_Total.Per_Ach, true)}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {renderValueWithIndicator(card5DataArray[0].Grand_Total.CY_Growth, true)}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {renderValueWithIndicator(card5DataArray[0].Grand_Total.CAGR, true)}
            </TableCell>
            <TableCell className="table-cell total-cell">
              {renderValueWithoutIndicator(-card5DataArray[0].Grand_Total.Balance)}
            </TableCell>
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MonthlyPerformance;