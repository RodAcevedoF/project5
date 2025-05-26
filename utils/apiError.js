export const parseApiError = (error, fallback = "Unknown error") => {
  return error?.response?.data?.error || error?.message || fallback;
};
