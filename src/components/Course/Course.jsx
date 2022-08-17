import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import userStore from '../../store/userStore'
import { toast } from 'react-toastify';
import { enroll } from '../../services/course';

export default function Course({ className, course }) {
  const user = userStore(state => state.user);
  const [loadingEnrolled, setLoadingEnrolled] = useState(false);

  async function handleClick(courseId) {
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
    <div className={className}>
      <div className="p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary relative">
        <a href="#">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-hb">{course.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{course.description.substring(0, 80)}...</p>
        <section className='flex justify-between text-hb'>
          <span className='font-bold text-[20px]'>
            ₱{course.price.toLocaleString("en-US")}
          </span>
          <span>
            <button className='bg-hb text-white py-[6.5px] px-[10.5px] rounded-lg font-normal outline-hb text-[14px] mr-1'>
              <Link to={`/course/${course.id}`}>
              View
              </Link>
            </button>
            {user
              ? <button
                className='bg-hb text-white py-[6.5px] px-[10.5px] rounded-lg font-normal outline-hb text-[14px] mt-2'
                onClick={ (e) => handleClick(course.id)}
              >{loadingEnrolled ? 'Loading...' : 'Enroll'}</button>
              : <button className='bg-hb text-white py-[6.5px] px-[10.5px] rounded-lg font-normal outline-hb text-[14px] mt-2' >
                <Link to='/login'>Enroll</Link>
              </button>
            }
          </span>
        </section>
      </div>
    </div>
  )
}
