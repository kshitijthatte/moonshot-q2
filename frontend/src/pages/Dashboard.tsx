import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Filters from "../components/Filters";
import ChartSection from "../components/ChartSection";
import { setCookie, getCookie, deleteCookie } from "../utils/cookies";
import { fetchSharedChart, shareChart } from "../services/chartService"; 

interface DashboardProps {
  onLogout: () => void;
  token: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, token }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2022-10-4"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2022-10-29"));
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sharedChartId = searchParams.get("chart");
    if (sharedChartId) {
      fetchSharedChartData(sharedChartId);
    } else {
      loadPreferencesFromCookies();
    }
  }, [searchParams]);

  const fetchSharedChartData = async (chartId: string) => {
    try {
      const filters = await fetchSharedChart(chartId, token);
      setStartDate(new Date(filters.startDate));
      setEndDate(new Date(filters.endDate));
      setAge(filters.age);
      setGender(filters.gender);
      setSelectedFeature(filters.feature);
    } catch (error) {
      console.error("Error fetching shared chart:", error);
    }
  };

  const handleShare = async () => {
    try {
      const filters = { startDate, endDate, age, gender, feature: selectedFeature };
      const data = await shareChart(filters, token);
      const sharedUrl = `${window.location.origin}${window.location.pathname}?chart=${data.id}`;
      alert(`Share this URL: ${sharedUrl}`);
    } catch (error) {
      console.error("Error sharing chart:", error);
    }
  };

  const loadPreferencesFromCookies = () => {
    const savedStartDate = getCookie("startDate");
    const savedEndDate = getCookie("endDate");
    const savedAge = getCookie("age");
    const savedGender = getCookie("gender");
    const savedFeature = getCookie("feature");

    if (savedStartDate) setStartDate(new Date(savedStartDate));
    if (savedEndDate) setEndDate(new Date(savedEndDate));
    if (savedAge) setAge(savedAge);
    if (savedGender) setGender(savedGender);
    if (savedFeature) setSelectedFeature(savedFeature);
  };

  useEffect(() => {
    if (startDate) setCookie("startDate", startDate.toISOString(), 7);
    if (endDate) setCookie("endDate", endDate.toISOString(), 7);
    if (age) setCookie("age", age, 7);
    if (gender) setCookie("gender", gender, 7);
    if (selectedFeature) setCookie("feature", selectedFeature, 7);
  }, [startDate, endDate, age, gender, selectedFeature]);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setAge("");
    setGender("");
    setSelectedFeature(null);

    deleteCookie("startDate");
    deleteCookie("endDate");
    deleteCookie("age");
    deleteCookie("gender");
    deleteCookie("feature");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Analytics Dashboard</h1>
        <div>
          <Button onClick={handleShare} className="mr-2">
            Share Chart
          </Button>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </div>
      <Filters
        startDate={startDate}
        endDate={endDate}
        age={age}
        gender={gender}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onAgeChange={setAge}
        onGenderChange={setGender}
        onReset={handleReset}
      />
      <ChartSection
        startDate={startDate}
        endDate={endDate}
        age={age}
        gender={gender}
        selectedFeature={selectedFeature}
        onFeatureSelect={setSelectedFeature}
        token={token}
      />
    </div>
  );
};

export default Dashboard;