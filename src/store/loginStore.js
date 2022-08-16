import create from 'zustand';

const loginStore = create(set => ({
  isLoggedIn: false,
  setIsLoggedIn: async () => set(state => ({ isLoggedIn: state }))
}));

export default loginStore;