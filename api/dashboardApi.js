// dashboardApi.js

import axios from "axios";

const API_URL = "https://service.todo-api.site/api/dashboard";

export const getDashboardData = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error obtaining data:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error obtaining data"
    };
  }
};
