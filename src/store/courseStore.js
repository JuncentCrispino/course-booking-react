import create from 'zustand';

const courseStore = create(set => ({
  courses: [],
  setCourses: (courses) => set(() => ({ courses: [...courses] })),
  course: {},
  setCourse: (course) => set(() => ({ course: {...course} })),
  sortBy: '',
  setSortBy: (sortBy) => set(() => ({ sortBy })),
  limit: 9,
  setLimit: (limit) => set(() => ({ limit })),
  page: 1,
  setPage: (page) => set(() => ({ page })),
  totalResults: 0,
  setTotalResults: (totalResults) => set(() => ({ totalResults })),
  totalPages: 0,
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  emptyCourses: () => set(() => ({ courses: [] }))
}));

export default courseStore;