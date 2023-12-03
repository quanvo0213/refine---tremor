import { BarChart, Card, Title } from "@tremor/react";
import React from "react";
import moment from 'moment-timezone';
import { groupBy, get } from 'lodash';

interface BarChartExample3Props {
  data: any;
  date: any;
  setData: any;
}

export const startOf: any = (date: any, metric: any) => {
  const d = moment(date);
    if (metric && metric.toLowerCase() === 'week') {
      metric = 'isoWeek';
    }
    return d.startOf(metric);
}

export const timeBetween: any = (dateStart: any, dateEnd: any, metric: any, format = 'YYYY-MM-DD') => {
  let start = moment(dateStart);
  const end = moment(dateEnd);
  const days = [];
  while (end.isSameOrAfter(start)) {
    days.push(start.format(format));
    start = startOf(start.add(1, metric), metric);
  }
  return days;
}

export const BarChartExample3 = (props: BarChartExample3Props) => {
  const convertDataForChart = (data: any) => {
    // extract data
  
    console.log(data);
    const convertedData = data.map((element: any) => element?.content);

    const groupByData = groupBy(convertedData, 'time') || [];
    const timeRange = timeBetween(props.date.from, props.date.to, 'day');
    console.log(groupByData);

    return timeRange.map((time: string | number, index: number) => {
      const newValue: any = {
        date: time,
        endDate: null,
        data: 0,
      };
      if (groupByData[time]) {
        groupByData[time].forEach((value) => {
          newValue.data += value.total;
        });
      }
      if (index === timeRange.length) {
        newValue.endDate = new Date();
      } else {
        newValue.endDate = timeRange[index + 1]
      }

      return newValue;
    });
  };

  const data = convertDataForChart(props.data);

  const setValue = (v: any) => {
    props.setData(v)
  };

  return (
    <>
      <Card>
        <Title>Closed Pull Requests</Title>
        <BarChart
          className="mt-6"
          data={data}
          index="date"
          categories={["data"]}
          colors={["neutral"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </>
  );
};