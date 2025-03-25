import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FilterListIcon from "../../../assets/images/FilterImg.svg";
import "../../../assets/css/SalesTrendDashboard/FilterBar.css";
import { useSalesContext } from "./SalesContext";

const StyledButton = styled(Button)({
  margin: "3px 3px 2px 3px",
  padding: "0 1px",
  height: "16px",
  lineHeight: "16px",
  width: "calc(50% - 6px)",
  textAlign: "center",
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.8)",
  border: "1px solid transparent",
  borderRadius: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.18)",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(0, 0, 0, 0.12)", // Style for disabled state
    color: "rgba(0, 0, 0, 0.5)",
    boxShadow: "none",
  },
});
const FilterBar = () => {
  const { dropdownDataFilter, updateSalesUnit  } = useSalesContext();
  const dropdownData = dropdownDataFilter["dropdown_data"];
 
  const [filters, setFilters] = useState({
    division: dropdownData["divisions"].map((item) => item["salesDivisionText"]),
    zone: dropdownData["zones"].map((item) => item["plantName"]),
    region: dropdownData["regions"].map((item) => item["salesRegName"]),
    hq: dropdownData["hqs"].map((item) => item["salesGroupName"]),
    hierarchy: dropdownData["hierarchies"][0]["designation"],
    employees: dropdownData["employees"][0]["employeeName"],
    salesIn: dropdownData["sales"][0],
  });
  useEffect(()=>{
    if (dropdownDataFilter.dropdown_data.sales.length > 0) {
      updateSalesUnit(dropdownData["sales"][0]); // Set first value
    }
  },[dropdownData["sales"]])

  const [openStates, setOpenStates] = useState({
    division: false,
    zone: false,
    region: false,
    hq: false,
  });

  const [tempFilters, setTempFilters] = useState({
    division: [],
    zone: [],
    region: [],
    hq: [],
  });

  const filterLabels = {
    division: "Division",
    zone: "Zone",
    region: "Region",
    hq: "HQ",
    hierarchy: "Hierarchy",
    employees: "Employees",
    salesIn: "Sales In",
  };

  const filterOptions = {
    division: dropdownData["divisions"].map((item) => item["salesDivisionText"]),
    zone: dropdownData["zones"].map((item) => item["plantName"]),
    region: dropdownData["regions"].map((item) => item["salesRegName"]),
    hq: dropdownData["hqs"].map((item) => item["salesGroupName"]),
    hierarchy: dropdownData["hierarchies"].map((item) => item["designation"]),
    employees: dropdownData["employees"].map((item) => item["employeeName"]),
    salesIn: dropdownData["sales"],
  };

  const handleChange = (event, key) => {
    const value = event.target.value;
    // console.log(`Key: ${key}, Value: ${value}`); // Debug log to check all changes

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: typeof value === "string" ? value.split(",") : value,
    }));
    if (key === "salesIn") {
      updateSalesUnit(value); 
      console.log("Sales In: Lacs selected",value);
    }
  };

  const handleTempChange = (key, value) => {
    setTempFilters((prevTempFilters) => ({
      ...prevTempFilters,
      [key]: value,
    }));
    
  };

  const handleSelectAll = (key) => (event) => {
    event.stopPropagation();
    const allOptions = filterOptions[key].filter((option) => option !== "All");
    const allSelected = tempFilters[key].length === allOptions.length;

    handleTempChange(key, allSelected ? [] : allOptions);
  };

  const handleApply = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: tempFilters[key],
    }));
  };

  const handleCancel = (key) => {
    setTempFilters((prevTempFilters) => ({
      ...prevTempFilters,
      [key]: filters[key], // Reset to the current applied filters
    }));
  };

  const handleOpen = (key) => {
    // When the dropdown opens, initialize tempFilters with the current filters
    setTempFilters((prevTempFilters) => ({
      ...prevTempFilters,
      [key]: filters[key],
    }));
  };

    // Helper function to compare two arrays for equality
    const arraysEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      const sortedArr1 = [...arr1].sort();
      const sortedArr2 = [...arr2].sort();
      return sortedArr1.every((value, index) => value === sortedArr2[index]);
    };
  return (
    <div className="filter-container">
      <img
        src={FilterListIcon}
        alt="Filter Icon"
        className="filter-icon"
        onClick={() => console.log("Filter icon clicked!")}
      />
      {Object.keys(filters).map((key, index) => (
        <FormControl key={index} className="filter-selector" sx={{padding: "0 !important",   }}>
          <Typography className="filter-label">{filterLabels[key]}</Typography>
          <Select
            multiple={["division", "zone", "region", "hq"].includes(key)}
            value={filters[key]}
            // onChange={(event) => {
            //   if (!["division", "zone", "region", "hq"].includes(key)) {
            //     handleChange(event, key);
            //   }
            // }}


            onChange={(event) => handleChange(event, key)} // Simplified to always call handleChange
            open={openStates[key]}
            // onOpen={() => handleOpen(key)}
            onOpen={() => {
    handleOpen(key);
    setOpenStates((prev) => ({ ...prev, [key]: true }));
  }}
  onClose={() => setOpenStates((prev) => ({ ...prev, [key]: false }))}
            size="small"
            className="filter-dropdown"
            displayEmpty
                       renderValue={(selected) => {
  if (Array.isArray(selected)) {
    if (selected.length === filterOptions[key].length) {
      return "All"; // All options are selected
    } else if (selected.length > 0) {
      return selected.join(", "); // Some options are selected
    } else {
      return "None"; // No options are selected
    }
  } else {
    return selected; // For single-select fields
  }
}}
            sx={{
              
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "16px",
              
              textTransform: "uppercase",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  padding: "4px 0px 0 0 ", // Set top/bottom padding to 4px, left/right to 8px
                  "& .MuiList-root": {
                    padding: "0", // Keep <ul> padding at 0
                  },
                },
              },
            }}
          >
            {["division", "zone", "region", "hq"].includes(key) && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAll(key)(e);
                }}
                sx={{ fontSize: "10px !important", padding: "0 !important", }}
              >
                <Checkbox
                  checked={tempFilters[key].length === filterOptions[key].length}
                  onChange={handleSelectAll(key)}
                  indeterminate={
                    tempFilters[key].length > 0 &&
                    tempFilters[key].length < filterOptions[key].length
                  }
                  sx={{
                    
                    transform: "scale(0.8)",
                    padding: "0 !important",
                    "& .MuiSvgIcon-root": { fontSize: "19px" },
                  }}
                />
                <ListItemText
                  primary="All"
                  primaryTypographyProps={{ fontSize: "12px !important" }}
                  sx={{ padding: "0 !important", textTransform: "uppercase" }}
                />
              </MenuItem>
            )}
            {filterOptions[key].map((option, i) => (
              <MenuItem
                key={i}
                value={option}
                sx={{ fontSize: "10px !important",
                padding: ["division", "zone", "region", "hq"].includes(key)
        ? "0 !important" // 0 padding for division, zone, region, hq
        : "0 0 0 5px !important", // 10px left padding for hierarchy, employees, salesIn
     
                // padding: "0 !important" 
                }}
                onClick={(e) => {
                  if (["division", "zone", "region", "hq"].includes(key)) {
                    e.stopPropagation();
                    const newValue = tempFilters[key].includes(option)
                      ? tempFilters[key].filter((item) => item !== option)
                      : [...tempFilters[key], option];
                    handleTempChange(key, newValue);
                  }
                }}
              >
                {["division", "zone", "region", "hq"].includes(key) && (
                  <Checkbox
                    checked={tempFilters[key].includes(option)}
                    sx={{
                      transform: "scale(0.8)",
                      padding: "0 !important",
                      "& .MuiSvgIcon-root": { fontSize: "19px" },
                    }}
                  />
                )}
                <ListItemText
                  primary={option}
                  primaryTypographyProps={{ fontSize: "12px !important" }}
                  sx={{ padding: "0 !important", textTransform: "uppercase" }}
                />
              </MenuItem>
            ))}
            {["division", "zone", "region", "hq"].includes(key) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                   padding: "2px",
                 // borderTop: "1px solid #e0e0e0",
                }}
              >
                <StyledButton
                  variant="outlined"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel(key);
                    setOpenStates((prev) => ({ ...prev, [key]: false }));
                  }}
                  className="dropdown-button"
                  sx={{ textTransform:  "uppercase", backgroundColor:"pink" }}
                  // sx={{ fontSize: "12px", textTransform: "none" }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(key);
                    setOpenStates((prev) => ({ ...prev, [key]: false }));
                  }}
                  // disabled={arraysEqual(tempFilters[key], filters[key])} // Disable if no changes
                  disabled={tempFilters[key].length === 0 || arraysEqual(tempFilters[key], filters[key])}
                  className="dropdown-button"
                  sx={{ textTransform:  "uppercase", }} // Ensure MUI doesn't override textTransform
                  // sx={{ fontSize: "12px", textTransform: "none" }}
                >
                  Apply
                </StyledButton>
              </div>
            )}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default FilterBar;