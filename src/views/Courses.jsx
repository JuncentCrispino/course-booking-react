import React from 'react';
import Course from '../components/Course/Course';
import courseStore from '../store/courseStore';
import { Pagination, createStyles } from '@mantine/core'

export default function Courses() {
  const courses = courseStore(state => state.courses);
  const page = courseStore(state => state.page);
  const setPage = courseStore(set => set.setPage);
  const totalResults = courseStore(state => state.totalResults);
  const totalPages = courseStore(state => state.totalPages);

  return (
    <div className='max-w-screen-lg m-auto pt-[150px]'>
      <div className='flex flex-wrap justify-items-start gap-4 m-2'>
        {courses.length > 0 ? (
          courses.map(course => (
            <Course key={course.id} className='lg:w-[300px] m-auto' course={course} />
          ))
        ) : (
          <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary'>
            <h5 className='mb-2 text-2xl font-semibold tracking-tight text-hb'>
              No Courses Found
            </h5>
          </div>
        )}
      </div>
      <section className='py-5 flex justify-center'>
        <Pagination
          page={page}
          total={totalPages}
          radius='xl'
          onChange={(e) => setPage(e)}
          color="indigo"
        />
      </section>
    </div>
  )
}
