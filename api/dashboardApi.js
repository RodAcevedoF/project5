import { authAxios } from "../utils/authAxios";

export const getDashboardData = async () => {
  try {
    const response = await authAxios.get("dashboard");
    return response.data?.data || {};
  } catch (error) {
    console.error(
      "Error obtaining dashboard data:",
      error.response?.data || error.message
    );
    return {
      error:
        error.response?.data?.error || "Unexpected error fetching dashboard"
    };
  }
};
