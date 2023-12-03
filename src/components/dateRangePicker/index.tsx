import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { useState } from "react";
import {
  setDate,
  startOfToday,
  sub
} from "date-fns";

interface DateRangePickerCustomProps {
  date: any;
  setDate: any;
}

export function DateRangePickerCustom(props: DateRangePickerCustomProps) {

  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={props.date}
      onValueChange={props.setDate}
    >
      <DateRangePickerItem value="tdy" from={startOfToday()}>
        Today
      </DateRangePickerItem>
      <DateRangePickerItem value="w" from={sub(startOfToday(), { days: 7 })}>
        Last 7 days
      </DateRangePickerItem>
    </DateRangePicker>
  );
}