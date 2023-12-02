import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { useState } from "react";
import {
  startOfToday,
  sub
} from "date-fns";

export function DateRangePickerCustom() {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={value}
      onValueChange={setValue}
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