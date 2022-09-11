import { useState, useEffect } from 'react';
import courseStore from '../store/courseStore';
import { encodeDataToURL } from "../utils/helper";
export default function useFetchCourses(query, page, limit, sortBy) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const courses = courseStore(state => state.courses);
  const setCourses = courseStore(state => state.setCourses)
  const setTotalResults = courseStore(set => set.setTotalResults);
  const setTotalPages = courseStore(set => set.setTotalPages);
  const emptyCourses = courseStore(set => set.emptyCourses);

  useEffect(() => {
    emptyCourses()
  }, [query])

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const params = encodeDataToURL({ sortBy, limit, page });
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses?${params}`)
    .then(res => res.json())
    .then(data => {
      setCourses(data.results)
      setTotalResults(data.totalResults)
      setTotalPages(data.totalPages)
    }).catch((err) => {
      console.log(err)
      setError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [query, page, limit, sortBy])

  return { isLoading, courses, error }

}