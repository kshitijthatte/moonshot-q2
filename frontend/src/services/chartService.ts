export const fetchSharedChart = async (chartId: string, token: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/shared-chart/${chartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shared chart");
      }
      const filters = await response.json();
      return filters;
    } catch (error) {
      console.error("Error fetching shared chart:", error);
      throw error; 
    }
  };
  
  export const shareChart = async (
    filters: any,
    token: string
  ): Promise<{ id: string }> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/share-chart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ filters }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to share chart");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sharing chart:", error);
      throw error;
    }
  };
  