import { create } from 'zustand';
import { ICourse } from '@/interfaces';
import { api } from '@/libs';

const courseStore = create<{
  course: ICourse | null;
  fetchCourse: (instructor: string, course_id: string) => void;
}>((set) => ({
  course: null,
  fetchCourse: async (instructor, course_id) => {
    await api
      .get(`/courses/${instructor}/${course_id}`)
      .then((res) => {
        set(() => ({
          course: res.data,
        }));
      })
      .catch((err) => console.log(err));
  },
}));

export { courseStore };
