import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../../../assets/css/SalesTrendDashboard/QuaterlyPerformance.css";
import { Box, Typography } from "@mui/material";
import { useSalesContext } from "./SalesContext";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuaterlyPerformance = () => {
  const { kpiData ,salesUnit} = useSalesContext();

 
  const groupedLabels = Object.keys(kpiData.kpi_data.card4_data).map(quarter => ({
    parent: quarter,
    children: Object.keys(kpiData.kpi_data.card4_data[quarter])
  }));

  // Add empty labels between groups for spacing
  const labels = groupedLabels
    .flatMap((group, index) => [
      ...group.children,
      ...(index < groupedLabels.length - 1 ? [""] : []),
    ]);


  const targetValues = [];
  const actualValues = [];

  Object.keys(kpiData.kpi_data.card4_data).forEach(quarter => {
    const quarterData = kpiData.kpi_data.card4_data[quarter];
    Object.keys(quarterData).forEach(fy => {
      targetValues.push(quarterData[fy].target_value);
      actualValues.push(quarterData[fy].actual_value);
    });

    if (quarter !== Object.keys(kpiData.kpi_data.card4_data)[Object.keys(kpiData.kpi_data.card4_data).length - 1]) {
      targetValues.push(null);
      actualValues.push(null);
    }
  });


  const data = {
    labels,
    datasets: [
      {
        label: "Target Value",
        data: targetValues,
        backgroundColor: "#FFDAA9",
        borderColor: "#FFDAA9",
        borderWidth: 1,
        barThickness: 36,
        order: 1,
      },
      {
        label: "Actual Value",
        data: actualValues,
        barThickness: 24,
        backgroundColor: "#4A54A3",
        borderColor: "#4A54A3",
        borderWidth: 1,
        categoryPercentage: 0.5,
        order: 0,
      },
    ],
  };
  const parentLabelsPlugin = {
    id: "parentLabels",
    afterDraw: (chart) => {
      const { ctx, scales } = chart;
      const xAxis = scales.x;
      const yAxisBottom = scales.y.bottom;

      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "bold 14px Arial";
      ctx.fillStyle = "#3B459E";
      ctx.letterSpacing = "0.15px";

      const topPadding = 35;
      const labelPosition = yAxisBottom + topPadding + 14;

      let xStart = xAxis.left;
      groupedLabels.forEach((group) => {
        const childCount = group.children.length + 1;
        const xEnd = xStart + (childCount * xAxis.width) / labels.length;
        const xMiddle = (xStart + xEnd - (xAxis.width / labels.length)) / 2;

        ctx.fillText(group.parent, xMiddle, labelPosition);
        xStart = xEnd;
      });

      ctx.restore();
    },
  };

  const valueLabelsPlugin = {
    id: "valueLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const { datasets } = chart.data;

      ctx.save();
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";

      datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);

        meta.data.forEach((bar, index) => {
          if (bar && bar.y !== null && dataset.data[index] !== null) {
            const value = dataset.data[index];
            const xPos = bar.x;

            if (dataset.label === "Target Value") {
              const yPos = bar.y - 10;
              ctx.fillStyle = "#E88504";
              ctx.fillText(value, xPos, yPos);
            } else if (dataset.label === "Actual Value") {
              const yPos = bar.base -20;
              ctx.fillStyle = "#fff";
              ctx.save();
              ctx.translate(xPos, yPos);
              ctx.rotate(-Math.PI / 2);
              ctx.fillText(value, 0, 0);
              ctx.restore();
            }
          }
        });
      });

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        bottom: 32,
        
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (value, index) => {
            return labels[index] === "" ? "" : labels[index];
          },
          font: {
            weight: "700",
            size: 10,
          },
          color: "#000000",
          lineHeight: 1,
          letterSpacing: "0%",
        },
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: false,
          boxWidth: 15,
          boxHeight: 15,
          padding: 10,
          font: {
            size: 12,
            weight: "bold",
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              lineWidth: dataset.borderWidth,
              hidden: !chart.isDatasetVisible(i),
              index: i,
              fontColor: dataset.label === "Target Value" ? "#E88504" : "#4A54A3",
            }));
          },
        },
      },
      tooltip: {
        enabled: false, 
      }
    },
    categoryPercentage: 0.8,
    barPercentage: 0.9,
  };

  return (
    <Box className="chart">
      <Box className="header">
        <Box className="title-container">
          <Typography className="title">Quarterly Performance ({salesUnit})</Typography>
        </Box>
      </Box>
      <Box className="chartCard">
        <div className="chartBox">
          <Bar data={data} options={options} plugins={[parentLabelsPlugin, valueLabelsPlugin]} />
        </div>
      </Box>
    </Box>
  );
};

export default QuaterlyPerformance;