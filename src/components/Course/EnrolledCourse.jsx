import React from 'react'
import { Link } from 'react-router-dom'

export default function EnrolledCourse({ className, course }) {
  return (
    <div className={className}>
      <div className="p-6 rounded-lg border border-gray-200 shadow-md bg-primary relative">
        <Link to={`/course/${course.id}`}>
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-hb">{course.name}</h5>
        </Link>
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
          </span>
        </section>
      </div>
    </div>
  )
}
