import React, { useEffect, useState } from 'react'
import { getUserCourses } from '../services/user'
import userStore from '../store/userStore'
import Loader from '../components/Loader'
import EnrolledCourse from '../components/Course/EnrolledCourse'
import { Pagination } from '@mantine/core'

export default function Profile() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = userStore(state => state.user);
  const sortBy = userStore(state => state.sortBy);
  const limit = userStore(state => state.limit);
  const page = userStore(state => state.page);
  const setPage = userStore(set => set.setPage);
  const totalPages = userStore(state => state.totalPages);
  const setTotalResults = userStore(set => set.setTotalResults);
  const setTotalPages = userStore(set => set.setTotalPages)
  console.log(user)
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserCourses(sortBy, limit, page)
        setCourses(data.results)
        setTotalResults(data.totalResults)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })();
  }, [page])

  return (
    <>
      {
        isLoading
          ? <Loader />
          : (
            <div className='max-w-screen-lg m-auto pt-[150px]'>
              <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-2 mb-4'>
                <section className='flex justify-between items-center'>
                  <div>
                    <h5 className='mb-2 text-2xl font-semibold tracking-tight text-hb'>
                      {user.firstName} {user.lastName}
                    </h5>
                    <p className='text-sm text-hb'>{user.isAdmin ? 'Admin' : 'Student'}</p>
                  </div>
                  <div>
                    <h5 className='mb-2 text-xl font-semibold tracking-tight text-hb'>
                      {user.enrollments.length} Courses Enrolled
                    </h5>
                  </div>
                </section>
              </div>
              <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-2 mb-4'>
                <section className='flex justify-between items-center'>
                  <div>
                    <h5 className='mb-2 text-xl font-semibold tracking-tight text-hb'>
                      {user.email}
                    </h5>
                    <h5 className='mb-2 text-md font-semibold tracking-tight text-hb'>
                      {user.phone}
                    </h5>
                    <p className='text-sm text-hb'>{user.address}</p>
                  </div>
                  <div>
                    <h5 className='mb-2 text-xl font-semibold tracking-tight text-hb'>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </h5>
                  </div>
                </section>
              </div>
              <p className='p-2 text-lg max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-2 mb-4 text-hb text-center font-bold'>
                Enrolled Courses
              </p>
              <div className='grid lg:grid-cols-3 sm:grid-col-1 gap-4 m-2'>
                {
                  courses.map(course => (
                    <EnrolledCourse key={course.id} className='col-span-1' course={course} />
                  ))
                }
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
    </>
  )
}
