import { create } from 'zustand';

const signupStore = create<{
  email: string;
  setEmail: (email: string) => void;
}>((set) => ({
  email: '',
  setEmail: (input: string) => {
    set(() => ({
      email: input,
    }));
  },
}));

export { signupStore };
