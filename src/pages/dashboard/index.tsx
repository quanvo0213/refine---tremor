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
        "key": "Team.id",
        "operator": "=",
        "value": "2"
      }
    ],
    "functions": [],
    "pagination": {
      "page": 0,
      "size": 30,
      "sorts": [
        "startTime,desc"
      ]
    },
    "groupBys": []
  });
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/api/v1/search',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsia2l0Il0sImthdE9uZUp3dCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSWdPaUFpU2xkVUlpd2lhMmxrSWlBNklDSnFXVnBZU3pCV1VIUk9jRFJwYVZKemNVbGZUM1E0TFc1Nk5VUkNSWE5sTTBWRmQyUkhTRVpmVWpaVkluMC5leUpsZUhBaU9qRTNNREUwTkRFNE5qRXNJbWxoZENJNk1UY3dNVEkyT1RBMk1Td2lhblJwSWpvaVlqZGhZVFUxWmpNdE5XSXhaUzAwTVRjeUxXRXhOamt0TkdKaU1qRm1ZV1l6WkRObUlpd2lhWE56SWpvaWFIUjBjSE02THk5c2IyZHBiaTV4WVM1cllYUmhiRzl1TG1OdmJTOXlaV0ZzYlhNdmEyRjBZV3h2YmlJc0ltRjFaQ0k2SW1GalkyOTFiblFpTENKemRXSWlPaUkzTW1ZMU9XUmlNUzAzWlRReUxUUXdaakV0WWpVNVppMDRNVGN3WW1JM05EUmtOV1VpTENKMGVYQWlPaUpDWldGeVpYSWlMQ0poZW5BaU9pSnJZWFJoYkc5dUxXRmtiV2x1SWl3aWMyVnpjMmx2Ymw5emRHRjBaU0k2SW1JME5UZGtaR0l5TFRVMU9ESXROREl5WkMwNU1tRmhMVE15WW1RNU9ESmpPRE16TnlJc0ltRmpjaUk2SWpFaUxDSmhiR3h2ZDJWa0xXOXlhV2RwYm5NaU9sc2lhSFIwY0hNNkx5OWhaRzFwYmk1eFlTNXJZWFJoYkc5dUxtTnZiU0lzSW1oMGRIQnpPaTh2YlhrdWNXRXVhMkYwWVd4dmJpNWpiMjBpWFN3aWNtVmhiRzFmWVdOalpYTnpJanA3SW5KdmJHVnpJanBiSW5WdFlWOWhkWFJvYjNKcGVtRjBhVzl1SWl3aVpHVm1ZWFZzZEMxeWIyeGxjeTFyWVhSaGJHOXVJbDE5TENKeVpYTnZkWEpqWlY5aFkyTmxjM01pT25zaVlXTmpiM1Z1ZENJNmV5SnliMnhsY3lJNld5SnRZVzVoWjJVdFlXTmpiM1Z1ZENJc0ltMWhibUZuWlMxaFkyTnZkVzUwTFd4cGJtdHpJaXdpZG1sbGR5MXdjbTltYVd4bElsMTlmU3dpYzJOdmNHVWlPaUp2Y0dWdWFXUWdjSEp2Wm1sc1pTQmxiV0ZwYkNJc0luTnBaQ0k2SW1JME5UZGtaR0l5TFRVMU9ESXROREl5WkMwNU1tRmhMVE15WW1RNU9ESmpPRE16TnlJc0ltVnRZV2xzWDNabGNtbG1hV1ZrSWpwMGNuVmxMQ0oxY0dSaGRHVmtYM1JwYldWemRHRnRjQ0k2TVRZNU1qTXpOVFV3TURRNE5Dd2liR0Z6ZEY5c2IyZHBiaUk2TVRjd01USTJOelV3TmpVMU9Td2libUZ0WlNJNklsRjFZVzRpTENKamNtVmhkR1ZrWDNScGJXVnpkR0Z0Y0NJNk1UWTJPVGsxTURJd05qa3dOQ3dpY0hKbFptVnljbVZrWDNWelpYSnVZVzFsSWpvaWNYVmhiaTUyYjBCcllYUmhiRzl1TG1OdmJTSXNJbWRwZG1WdVgyNWhiV1VpT2lKUmRXRnVJaXdpWm1GdGFXeDVYMjVoYldVaU9pSWlMQ0psYldGcGJDSTZJbkYxWVc0dWRtOUFhMkYwWVd4dmJpNWpiMjBpZlEuVC1QaGV3ZUNrSnl2V3FLa1JkX2Y4LXJXTEM2LWF0M09LNk9Yam83c3NIbE9NckdiUXF1TWJTWE5VcUpvejN5endDNDhXNzlucG1pNDZYRHY2eXhBY1JaR09yN04xbHpQSF94ZWtjQnZENXN4Ym9FVU5YZmNYenhNRWxjUkxIUjJDMTNHaU9SbjZydi1sRzlER3I0TlplTHNiRDdJNjNVTWw1MlhLX0R1NjJvcDZFRFVGMjlzWEUxNnl3YlppSzUtZmVJREZJcFdweUlRSjNjaURYV3dSaW84Wm5idWZXX29yMFB0NnQtSDlleGZCTG9GN3A3anhUZGI4OXNHenBMTXJZSDViT0VYNGpEb0FPUkFOUGVReThuVTdGckM1Rk05M0hCUFBLaU9iMGVtMlRuX0NzbDZVMWlZaktKS3hHd0xYcWdzNG9wSmNpcFBndlkycTdQc05BIiwidXNlcl9uYW1lIjoicXVhbi52b0BrYXRhbG9uLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJrYXRPbmVVc2VySWQiOjU4LCJleHAiOjE3MDE0NDE4NjEsImp0aSI6ImJkYmM5OGMwLTViZTgtNGMyZi1iNTU3LTBjNTM5NmQ3Mjk5NSIsImNsaWVudF9pZCI6ImtpdCJ9.ScGJiScTlWJvJwawjI6r7TSoERSjGCyNB-QTFNyCEtBkM1cUCpOJza3MLEB923GBG1BKwzxu5dFTQ4NnTDK8bMZ9XJk3ShPzw4TCvHLHm0bZNUG9VcWVnwIYDLfuf4fYM5i55v5FlY6a1QsWnCY-pr-Zr9P7or5wobWcf-z0-K4Oo5D0jfch2x1SGlz8vGIsFZTx9InJZXovQrtJP5ahd6nuUvIXSIDkKX8G_2hjhJH1UCmr_Y0p_gpHy9_5P_7EZXa1OxdTYXk3C2hFxyKJzfnsTG0G3dVAl5T9LCkWat8pZAZRGXJ-KOctZoXep256X9hBhqkqxkdHxZU6JhASRg',
      'Cookie': 'segment-write-key=WvksC99SSzdqHZtCsnlZK2Iyh7KW3Tmk'
    },
    data : data
  };
  

  useEffect(() => {
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
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