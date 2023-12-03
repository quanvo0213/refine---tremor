import React, { useState } from "react";
import {
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  DateRangePickerValue,
} from "@tremor/react";

import { useCustom } from "@refinedev/core";
import { BarChartExample3 } from "./chartView";
import { DateRangePickerCustom } from "../../components/dateRangePicker";
import { TableExample } from "./table";


const data = {
  "type": "Execution",
  "conditions": [
    {
      "key": "startTime",
      "operator": ">=",
      "value": "2023-11-27T00:00:00Z"
    },
    {
      "key": "startTime",
      "operator": "<",
      "value": "2023-12-04T00:00:00Z"
    },
    {
      "key": "Project.id",
      "operator": "=",
      "value": "3071"
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
      "function": "group_by_day",
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
};

const dataTable = {
  "type": "Execution",
  "conditions": [
    {
      "key": "startTime",
      "operator": ">=",
      "value": "2023-11-27T00:00:00Z"
    },
    {
      "key": "startTime",
      "operator": "<",
      "value": "2023-12-04T00:00:00Z"
    },
    {
      "key": "Project.id",
      "operator": "=",
      "value": "3071"
    }
  ],
  "functions": [],
  "pagination": {
    "page": 0,
    "size": 30,
    "sorts": [
      "order,desc"
    ]
  },
  "groupBys": []
};

export const DashboardPage: React.FC = () => {

  const buildChartQuery = (from?: Date, to?: Date) => ({
    "type": "Execution",
    "conditions": [
      {
        "key": "startTime",
        "operator": ">=",
        "value": from,
      },
      {
        "key": "startTime",
        "operator": "<",
        "value": to,
      },
      {
        "key": "Project.id",
        "operator": "=",
        "value": "3071"
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
        "function": "group_by_day",
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

  const buildTableQuery = (from?: Date, to?: Date) => ({
    "type": "Execution",
    "conditions": [
      {
        "key": "startTime",
        "operator": ">=",
        "value": from,
      },
      {
        "key": "startTime",
        "operator": "<",
        "value": to,
      },
      {
        "key": "Project.id",
        "operator": "=",
        "value": "3071"
      }
    ],
    "functions": [],
    "pagination": {
      "page": 0,
      "size": 30,
      "sorts": [
        "order,desc"
      ]
    },
    "groupBys": []
  });

  const [executionsGroupByQuery, setExecutionsGroupByQuery] = useState<any>(data);
  const [executionsQuery, setExecutionsQuery] = useState<any>(dataTable);
  const [date, setDate] = useState<DateRangePickerValue>({
    from: new Date(2023, 10, 28),
    to: new Date(),
  });

  const setData = (v: any) => {
    if (v === null) {
      setExecutionsQuery(buildTableQuery(date.from, date.to));
    }
    setExecutionsQuery(buildTableQuery(new Date(v.date), new Date(v.endDate)));
  };

  const setDataDate = (date: DateRangePickerValue) => {
    setDate(date);
    setExecutionsQuery(buildTableQuery(date.from, date.to));
    setExecutionsGroupByQuery(buildChartQuery(date.from, date.to));
  };

  const { data: executionsChart, isFetching: isFetchingChart } = useCustom({
    url: `/api/v1/search`,
    method: "post",
    config: {
      payload: executionsGroupByQuery,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic bmhpLmx5QGthdGFsb24uY29tOkFiYyFAIyQlXjA0MDQ=',
        'Cookie': 'segment-write-key=WvksC99SSzdqHZtCsnlZK2Iyh7KW3Tmk'
      }
    },
  });

  const { data: executionsTable, isFetching: isFetchingDataTable } = useCustom({
    url: `/api/v1/search`,
    method: "post",
    config: {
      payload: executionsQuery,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic bmhpLmx5QGthdGFsb24uY29tOkFiYyFAIyQlXjA0MDQ=',
        'Cookie': 'segment-write-key=WvksC99SSzdqHZtCsnlZK2Iyh7KW3Tmk'
      }
    },
  });

  if (!executionsChart || !executionsTable) return null;
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
            <div className="mt-6">
              <DateRangePickerCustom
                date={date}
                setDate={setDataDate}
              />
            </div>
            {
              !isFetchingChart ? 
              <div className="mt-6">
                <BarChartExample3
                  data={executionsChart.data.content}
                  date={date}
                  setData={setData}
                />
              </div>
             : <>Loading....</>
            }
            {
              !isFetchingDataTable ? 
              <div className="mt-6">
              <TableExample
                data={executionsTable.data.content}
              />
            </div> : <>Loading....</>
            }
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