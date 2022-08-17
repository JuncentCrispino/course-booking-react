import { encodeDataToURL } from "../utils/helper";

export const getCourses = async (sortBy, limit, page) => {
  try {
    const params = encodeDataToURL({ sortBy, limit, page });
    const getCoursesReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    if (getCoursesReq.status === 200) {
      return await getCoursesReq.json();
    } else {
      return false;
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCourse = async (courseId) => {
  try {
    const getCourseReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    if (getCourseReq.status === 200) {
      return await getCourseReq.json();
    } else {
      return false;
    }
  } catch (error) {
    console.log(error)
  }
}

export const enroll = async (courseId) => {
  try {
    const enrollReq = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/enroll/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return enrollReq.status
  } catch (error) {
    console.log(error)
  }
}