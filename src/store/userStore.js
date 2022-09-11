import create from 'zustand';

const userStore = create(set => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
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
}));

export default userStore;