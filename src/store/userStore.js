import create from 'zustand';

const userStore = create(set => ({
  user: null,
  setUser: () => set((user) => ({ user }))
}));

export default userStore;