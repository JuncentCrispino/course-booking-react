
import { encodeDataToURL } from "../utils/helper";

export const getUserCourses = async (sortBy, limit, page) => {
  try {
    const params = encodeDataToURL({ sortBy, limit, page });
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/enrolled-courses?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
