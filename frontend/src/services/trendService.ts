// services/trendService.ts

export const fetchTrendData = async (
    feature: string,
    startDate: Date | null,
    endDate: Date | null,
    age: string,
    gender: string,
    token: string
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("feature", feature);
      if (startDate) params.append("startDate", startDate.toISOString());
      if (endDate) params.append("endDate", endDate.toISOString());
      if (age) params.append("age", age !== "all" ? age : "");
      if (gender) params.append("gender", gender !== "all" ? gender : "");
  
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/trend?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch trend data');
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching trend data:', error);
      throw error;
    }
  };
  