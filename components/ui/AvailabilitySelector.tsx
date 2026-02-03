"use client";

import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./Checkbox";

interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

interface AvailabilitySelectorProps {
  value: Record<string, DaySchedule>;
  onChange: (value: Record<string, DaySchedule>) => void;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function AvailabilitySelector({
  value,
  onChange,
}: AvailabilitySelectorProps) {
  const [defaultTime, setDefaultTime] = useState({
    openTime: "09:00",
    closeTime: "22:00",
  });

  const toggleDay = (day: string) => {
    onChange({
      ...value,
      [day]: {
        ...value[day],
        enabled: !value[day]?.enabled,
        openTime: value[day]?.openTime || defaultTime.openTime,
        closeTime: value[day]?.closeTime || defaultTime.closeTime,
      },
    });
  };

  const updateTime = (
    day: string,
    field: "openTime" | "closeTime",
    time: string,
  ) => {
    onChange({
      ...value,
      [day]: {
        ...value[day],
        [field]: time,
      },
    });
  };

  const applyDefaultToAll = () => {
    const newValue: Record<string, DaySchedule> = {};
    DAYS.forEach((day) => {
      newValue[day] = {
        enabled: true,
        openTime: defaultTime.openTime,
        closeTime: defaultTime.closeTime,
      };
    });
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      {/* Set Default Times */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Default Hours
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="defaultOpen"
              className="text-xs">
              Open Time
            </Label>
            <Input
              id="defaultOpen"
              type="time"
              value={defaultTime.openTime}
              onChange={(e) =>
                setDefaultTime({ ...defaultTime, openTime: e.target.value })
              }
            />
          </div>
          <div>
            <Label
              htmlFor="defaultClose"
              className="text-xs">
              Close Time
            </Label>
            <Input
              id="defaultClose"
              type="time"
              value={defaultTime.closeTime}
              onChange={(e) =>
                setDefaultTime({ ...defaultTime, closeTime: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="button"
          onClick={applyDefaultToAll}
          className="mt-3 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium">
          Apply to all days
        </button>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 min-w-[120px]">
              <Checkbox
                id={`day-${day}`}
                checked={value[day]?.enabled || false}
                onChange={() => toggleDay(day)}
              />
              <Label
                htmlFor={`day-${day}`}
                className="text-sm font-medium cursor-pointer">
                {day}
              </Label>
            </div>

            {value[day]?.enabled && (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-1">
                  <Input
                    type="time"
                    value={value[day]?.openTime || "09:00"}
                    onChange={(e) =>
                      updateTime(day, "openTime", e.target.value)
                    }
                    className="h-9"
                  />
                </div>
                <span className="text-gray-500 dark:text-gray-400">to</span>
                <div className="flex-1">
                  <Input
                    type="time"
                    value={value[day]?.closeTime || "22:00"}
                    onChange={(e) =>
                      updateTime(day, "closeTime", e.target.value)
                    }
                    className="h-9"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
