import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';
import { getCourse, enroll } from '../services/course';
import userStore from '../store/userStore';
import { toast } from 'react-toastify';
import BreadCrumbs from '../components/BreadCrumbs';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = userStore(state => state.user);
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingEnrolled, setLoadingEnrolled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const course = await getCourse(courseId);
        setCourse(course);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    })();
  }, [])

  async function handleClick() {
    try {
      setLoadingEnrolled(true);
      const status = await enroll(courseId);
      if (status === 200) {
        toast.success("Successfully enrolled to the course");
      } else if (status === 409) {
        toast.warn("You are already enrolled in this course");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingEnrolled(false);
    }
  }

  return (
    <>
      {isLoading ? <Loader /> :
        <div className='grid place-items-center h-screen max-w-lg mx-auto px-4'>
          <div>
            <BreadCrumbs item={{ path: '/courses', name: 'Courses' }} className='mb-2' course={course}/>
            <div className='w-full rounded-lg bg-primary shadow-shadow-1 p-10 relative'>
              <button className='bg-hb text-white py-[5px] px-[10px] rounded-lg font-normal outline-hb text-[14px] absolute right-5 top-5' onClick={() => navigate(-1)}>
                Back
              </button>
              <p className='text-[28px] font-bold text-hb'>{course.name}</p>
              <p className='text-[18px] font-bold text-hb underline decoration-2'>{course.instructor}</p>
              <p className='text-[14px] font-bold mb-2 text-hb pt-0'>INSTRUCTOR</p>
              <p className='text-sm text-hb'>{course.description}</p>
              <p className='text-[14px] font-bold my-2 text-hb pt-0'>Schedule: | {course.schedule.map((day) => day + ' | ')}</p>
              <p className='text-[14px] font-bold my-2 text-hb pt-0'>Availble Slots: {course.availableSlots} seats</p>
              <p className='text-[14px] font-bold my-2 text-hb pt-0'>Total Enrollees: {course.enrollees.length}</p>
              <p className='text-[14px] font-bold my-2 text-hb pt-0'>Price:  ₱{course.price.toLocaleString("en-US")}</p>
              {user
                ? <button
                  className='bg-hb text-white py-[6.5px] px-[10.5px] rounded-lg font-normal outline-hb text-[14px] mt-2'
                  onClick={handleClick}
                >{loadingEnrolled ? 'Loading...' : 'Enroll'}</button>
                : <button className='bg-hb text-white py-[6.5px] px-[10.5px] rounded-lg font-normal outline-hb text-[14px] mt-2' >
                  <Link to='/login'>Enroll</Link>
                </button>
              }
            </div>
          </div>
        </div>
      }
    </>



  )
}
