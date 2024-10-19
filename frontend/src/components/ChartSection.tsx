import React from "react";
import FeatureChart from "./FeatureChart";
import TrendChart from "./TrendChart";

interface ChartSectionProps {
  startDate: Date | null;
  endDate: Date | null;
  age: string;
  gender: string;
  selectedFeature: string | null;
  onFeatureSelect: (feature: string | null) => void;
  token: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  startDate,
  endDate,
  age,
  gender,
  selectedFeature,
  onFeatureSelect,
  token,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FeatureChart
        startDate={startDate}
        endDate={endDate}
        age={age}
        gender={gender}
        onFeatureSelect={onFeatureSelect}
        token={token}
      />
      {selectedFeature && (
        <TrendChart
          feature={selectedFeature}
          startDate={startDate}
          endDate={endDate}
          age={age}
          gender={gender}
          token={token}
        />
      )}
    </div>
  );
};

export default ChartSection;
