import { createContext, useState, useContext } from 'react';


const initialDropdownData  = {
    "dropdown_data": {
      "divisions": [
        {
          "salesDivision": "03",
          "salesDivisionText": "FERTILITY",
        },
        {
          "salesDivision": "36",
          "salesDivisionText": "Maharashtra",
        },
        {
          "salesDivision": "39",
          "salesDivisionText": "Punjab",
        },
      ],
      "zones": [
        {
          "plantCode": "W001",
          "plantName": "Ahmedabad CFA",
        },
        {
          "plantCode": "W004",
          "plantName": "Nagpur CFA",
        },
      ],
      "regions": [
        {
          "salesRegCode": 6,
          "salesRegName": "Gujarat",
        },
        {
          "salesRegCode": 13,
          "salesRegName": "Maharashtra",
        },
      ],
      "hqs": [
        {
          "salesGroupCode": "G01",
          "salesGroupName": "Ahmedabad",
        },
        {
          "salesGroupCode": "G61",
          "salesGroupName": "Nagpur",
        },
      ],
      "hierarchies": [
        {
          "designation": "MR",
        },
        {
          "designation": "FLM",
        },
        {
          "designation": "SLM",
        },
      ],
      "employees": [
        {
          "employeeId": 23189,
          "employeeName": "PROSENJIT NAG",
        },
        {
          "employeeId": 23190,
          "employeeName": "KALAMUDDIN GYASUDDIN CHAUDHARY",
        },
      ],
      "sales": ["Lac", "Crore"],
    },
  };
// Your KPI data
const initialKpiData = {
    
    "kpi_data": {
        "cards_data": {
            "card1_year_sale": {
                "LYTD": 84.91,
                "Target": 38.81,
                "Percentage_Archive": -55,
                "CYTD": 97.81,
                "Growth": "15.65"
            },
            "card2_quarter_sale": {
                "LYQTD": 84.91,
                "Target": 38.81,
                "CQTD": 0,
                "Percentage_Archive": +97.81,
                "Growth": "15.65"
            },
            "card3_month_sale": {
                "LYMTD": 84.91,
                "Target": 38.81,
                "CMTD": 0,
                "Percentage_Archive": 97.81,
                "Growth": "-15.65"
            }
        },
        "card4_data": {
            "Q1": {
                "FY23": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY24": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY25": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                }
            },
            "Q2": {
                "FY23": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY24": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY25": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                }
            },
            "Q3": {
                "FY23": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY24": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY25": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                }
            },
            "Q4": {
                "FY23": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY24": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                },
                "FY25": {
                    "target_value": 20.5,
                    "actual_value": 19.5
                }
            }
        },
        "card5_data": 
        {
            "Q1": {
              "Apr": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "May": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "June": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Total": {
                "LLY": 26.70,
                "LY": 30.90,
                "LY_Grw": 47.1,
                "Target": 4.20,
                "CY": 33.42,
                "Per_Ach": 49.62,
                "CY_Growth": 24.3,
                "CAGR": 49.62,
                "Balance": 49.62
              }
            },
            "Q2": {
              "Jul": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Aug": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Sept": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Total": {
                "LLY": 26.70,
                "LY": 30.90,
                "LY_Grw": 47.1,
                "Target": 4.20,
                "CY": 33.42,
                "Per_Ach": 49.62,
                "CY_Growth": 24.3,
                "CAGR": 49.62,
                "Balance": 49.62
              }
            },
            "Q3": {
              "Oct": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Nov": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Dec": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Total": {
                "LLY": 26.70,
                "LY": 30.90,
                "LY_Grw": 47.1,
                "Target": 4.20,
                "CY": 33.42,
                "Per_Ach": 49.62,
                "CY_Growth": 24.3,
                "CAGR": 49.62,
                "Balance": 49.62
              }
            },
            "Q4": {
              "Jan": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Feb": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Mar": {
                "LLY": 8.90,
                "LY": 10.30,
                "LY_Grw": 15.7,
                "Target": 1.40,
                "CY": 11.14,
                "Per_Ach": 16.54,
                "CY_Growth": 8.1,
                "CAGR": 16.54,
                "Balance": 16.54
              },
              "Total": {
                "LLY": 26.70,
                "LY": 30.90,
                "LY_Grw": 47.1,
                "Target": 4.20,
                "CY": 33.42,
                "Per_Ach": 49.62,
                "CY_Growth": 24.3,
                "CAGR": 49.62,
                "Balance": 49.62
              }
            },
            "Grand_Total": {
              "LLY": 106.80,
              "LY": 123.60,
              "LY_Grw": 188.4,
              "Target": 16.80,
              "CY": 133.68,
              "Per_Ach": 198.48,
              "CY_Growth": 97.2,
              "CAGR": 198.48,
              "Balance": 198.48
            }
          }
    }
};

// Create the context
const initialSalesUnit = "";
const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [kpiData, setKpiData] = useState(initialKpiData);
  const [dropdownDataFilter, setDropdownData] = useState(initialDropdownData);
  const [salesUnit, setSalesUnit] = useState(initialSalesUnit); // New state

  const updateKpiData = (newData) => {
    setKpiData(prev => ({
      ...prev,
      kpi_data: {
        ...prev["kpi_data"],
        ...newData
      }
    }));
  };
  const updateDropdownData = (newDropdownData) => {
    setDropdownData((prev) => ({
      ...prev,
      "dropdown_data": {
        ...prev["dropdown_data"],
        ...newDropdownData,
      },
    }));
  };

  const updateSalesUnit = (newUnit) => {
    setSalesUnit(newUnit);
  };
  const contextValue = {
    dropdownDataFilter,
    kpiData,
    salesUnit,
    updateDropdownData,
    updateKpiData,
    updateSalesUnit,
    setDropdownData, 
    setKpiData,      
    setSalesUnit
  };

  return (
    <SalesContext.Provider value={contextValue}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSalesContext = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSalesContext must be used within a SalesProvider');
  }
  return context;
};

export default SalesContext;