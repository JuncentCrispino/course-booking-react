import create from 'zustand';

const loginStore = create(set => ({
  isLoggedIn: false,
  setIsLoggedIn: async (state) => set(() => ({ isLoggedIn: state }))
}));

export default loginStore;