import React, { useEffect, useState } from 'react';
import Course from '../components/Course/Course';
import courseStore from '../store/courseStore';
import { Pagination, createStyles } from '@mantine/core'
import { getCourses } from '../services/course';
import useFetchCourses from '../hooks/useFetchCourse';
import BreadCrumbs from '../components/BreadCrumbs';


export default function Courses() {
  const page = courseStore(state => state.page);
  const setPage = courseStore(set => set.setPage);
  const totalPages = courseStore(state => state.totalPages);
  const [sortBy, setSortBy] = useState('createAt');
  const [limit, setLimit] = useState(9);
  const [query, setQuery] = useState('')
  const { isLoading, courses, error } = useFetchCourses(query, page, limit, sortBy)

  return (
    <div className='max-w-screen-lg m-auto pt-[100px]'>
      <BreadCrumbs item={{path: '/courses', name: 'Courses'}} className='ml-3'/>
      {!isLoading && (
        <>
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
        </>
      )}
    </div>
  )
}
