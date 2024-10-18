// components/Filters.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface FiltersProps {
  startDate: Date | null;
  endDate: Date | null;
  age: string;
  gender: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onAgeChange: (age: string) => void;
  onGenderChange: (gender: string) => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  startDate,
  endDate,
  age,
  gender,
  onStartDateChange,
  onEndDateChange,
  onAgeChange,
  onGenderChange,
  onReset,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
      <Select value={age} onValueChange={onAgeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Age Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ages</SelectItem>
          <SelectItem value="15-25">15-25</SelectItem>
          <SelectItem value=">25">&gt;25</SelectItem>
        </SelectContent>
      </Select>
      <Select value={gender} onValueChange={onGenderChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  );
};

export default Filters;
