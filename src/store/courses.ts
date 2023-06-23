import { create } from 'zustand';
import { ICourse } from '@/interfaces';
import { api } from '@/libs';

const coursesStore = create<{
  courses: ICourse[];
  fetchCourses: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>((set) => ({
  courses: [],
  isLoading: true,
  fetchCourses: async () => {
    await api
      .get('/courses')
      .then((res) => {
        set(() => ({
          courses: res.data,
          isLoading: false,
        }));
      })
      .catch(() => {
        set(() => ({
          isLoading: false,
        }));
      });
  },
  setIsLoading: (isLoading) => {
    set(() => ({ isLoading }));
  },
}));

export { coursesStore };
