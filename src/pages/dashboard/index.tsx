import React, { useEffect } from "react";
import {
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import axios from "axios";

const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

import { KpiCard } from "./kpiCard";
import { BarChartExample3 } from "./chartView";
import { DateRangePickerCustom } from "../../components/dateRangePicker";

const calculatePercentage = (total: number, target: number): number => {
  return Math.round((total / target) * 100 * 100) / 100;
};

export const DashboardPage: React.FC = () => {
  const API_URL = useApiUrl("metrics");

  const { data: dailyRevenue } = useCustom({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const data = JSON.stringify({
    "type": "Execution",
    "conditions": [
      {
        "key": "startTime",
        "operator": ">=",
        "value": "2022-12-02T00:00:00Z"
      },
      {
        "key": "startTime",
        "operator": "<",
        "value": "2023-12-02T00:00:00Z"
      },
      {
        "key": "Project.id",
        "operator": "=",
        "value": "68"
      }
    ],
    "functions": [
      {
        "key": "total",
        "function": "count_distinct",
        "parameters": [
          "id"
        ]
      },
      {
        "key": "time",
        "function": "group_by_quarter",
        "parameters": [
          "startTime"
        ]
      }
    ],
    "pagination": {
      "page": 0,
      "size": 300,
      "sorts": [
        "time, desc"
      ]
    },
    "groupBys": [
      "status"
    ]
  });
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/api/v1/search',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic cXVhbi52b0BrYXRhbG9uLmNvbTpRdWFuMTIzKg==',
      'Cookie': 'segment-write-key=WvksC99SSzdqHZtCsnlZK2Iyh7KW3Tmk'
    },
    data : data
  };
  

  useEffect(() => {
    axios.request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const { data: dailyOrders } = useCustom({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { data: newCustomers } = useCustom({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  return (
    <main className="m-2">
      <Title>Dashboard</Title>
      <Text>View core metrics on the state of your company.</Text>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <KpiCard
                title="Weekly Revenue"
                total={`$ ${dailyRevenue?.data.total ?? 0}`}
                trend={dailyRevenue?.data.trend ?? 0}
                target="$ 10,500"
                percentage={calculatePercentage(
                  dailyRevenue?.data.total ?? 0,
                  10_500
                )}
              />
              <KpiCard
                title="Weekly Orders"
                total={`${dailyOrders?.data.total ?? 0}`}
                trend={dailyOrders?.data.trend ?? 0}
                target="500"
                percentage={calculatePercentage(
                  dailyOrders?.data.total ?? 0,
                  500
                )}
              />
              <KpiCard
                title="New Customers"
                total={`${newCustomers?.data.total ?? 0}`}
                trend={newCustomers?.data.trend ?? 0}
                target="200"
                percentage={calculatePercentage(
                  newCustomers?.data.total ?? 0,
                  200
                )}
              />
            </Grid>
            <div className="mt-6">
              <DateRangePickerCustom
              />
            </div>
            <div className="mt-6">
              <BarChartExample3
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};