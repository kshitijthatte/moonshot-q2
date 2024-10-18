export const fetchFeatureData = async (
  startDate: Date | null,
  endDate: Date | null,
  age: string,
  gender: string,
  token: string
) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    if (age && age !== "all") params.append("age", age);
    if (gender && gender !== "all") params.append("gender", gender);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/data?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch feature data");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching feature data:", error);
    throw error;
  }
};
