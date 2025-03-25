import React from "react";
import { Box, Stack, Typography, Card } from "@mui/material";
import "../../../assets/css/SalesTrendDashboard/SaleDataComponent.css";
import ArrowUpwardIcon from "../../../assets/images/ArrowUpwardIcon_green.svg";
import ArrowDownwardIcon from "../../../assets/images/ArrowDownwardIcon_red.svg";
import { useSalesContext } from "./SalesContext";
// 
const SaleDataComponent = () => {
  const { kpiData ,salesUnit} = useSalesContext();
  console.log(salesUnit)

 

  const cardConfig = [
    { 
      title: `Year Sale (${salesUnit})`, 
      color: "#F2F6E5",
      data: kpiData.kpi_data.cards_data.card1_year_sale,
      keys: ["LYTD", "Target", "CYTD", "Percentage_Archive", "Growth"],
      displayKeys: ["LYTD", "Target", "CYTD", "%Ach", "Grw"]
    },
    { 
      title: `Quarter Sale  (${salesUnit})`, 
      color: "#E5ECF6",
      data: kpiData.kpi_data.cards_data.card2_quarter_sale,
      keys: ["LYQTD", "Target", "CQTD", "Percentage_Archive", "Growth"],
      displayKeys: ["LYQTD", "Target", "CQTD", "%Ach", "Grw"]
    },
    { 
      title: `Month Sale  (${salesUnit})`, 
      color: "#E6F6FF",
      data: kpiData.kpi_data.cards_data.card3_month_sale,
      keys: ["LYMTD", "Target", "CMTD", "Percentage_Archive", "Growth"],
      displayKeys: ["LYMTD", "Target", "CMTD", "%Ach", "Grw"]
    },
  ];

  const formatValue = (value, displayKey) => {
    const numValue = Number(value);
    const isNegative = numValue < 0;
    
    if (displayKey === "%Ach") {
      return `${value}%`;
    }
    if (displayKey === "Grw") {
      return `${value}%`;
    }
    return value;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box className="header">
        <Box className="title-container">
          <Typography className="Filter-title" sx={{ fontSize: "12px" }}>
            Data Till Date 11-Feb-25
          </Typography>
        </Box>
      </Box>

      <Stack
        className="stack-container"
        direction={{ xs: "column", sm: "row" }}
      >
        {cardConfig.map((sale, index) => (
          <Card
            key={index}
            className="stack-item"
            sx={{
              backgroundColor: sale.color,
              borderRadius: "16px",
              boxShadow: "none",
            }}
          >
            <Box className="stacktitle-container">
              <Typography 
              className="title-text-2"
               fontWeight="bold">
                {sale.title}
              </Typography>
            </Box>
         
<Stack className="stack-content" spacing={1} direction="row">
  {sale.displayKeys.map((item, idx) => {
    const value = sale.data[sale.keys[idx]];
    const numValue = Number(value);
    const isNegative = numValue < 0;
    const formattedValue = formatValue(value, item);
    const isGrowthOrAch = item === "Grw" || item === "%Ach";
    
    return (
      <Box
        key={idx}
        sx={{
          flex: 1,
          height: "44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ 
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {item}
        </Typography>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "center",
        }}>
          {item === "Grw" && (
            <img
              src={isNegative ? ArrowDownwardIcon : ArrowUpwardIcon}
              alt={isNegative ? "down arrow" : "up arrow"}
              style={{ width: "12px", height: "12px",  }}
            />
          )}
          <Typography
            sx={{
              fontSize: "10px",
              color: isGrowthOrAch 
                ? (isNegative ? "red" : "green") 
                : (isNegative ? "red" : "inherit"),
              textAlign: "center",
            }}
            variant="body2"
          >
            {formattedValue}
          </Typography>
        </Box>
      </Box>
    );
  })}
</Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SaleDataComponent;