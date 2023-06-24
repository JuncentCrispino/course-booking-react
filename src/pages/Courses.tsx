import { Button, Pagination } from '@/components';
import { coursesStore } from '@/store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WithLoader from '@/components/WithLoader';
import { motion } from 'framer-motion';

export default function Courses() {
  const [courses, fetchCourses, isLoading] = coursesStore((state) => [
    state.courses,
    state.fetchCourses,
    state.isLoading,
  ]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-7xl overflow-hidden px-6 py-28 md:px-8 md:py-32"
    >
      <WithLoader isLoading={isLoading}>
        {currentItems.length > 0 ? (
          <>
            <section className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((course) => (
                <div
                  key={course.course_name}
                  className="relative min-h-[200px] w-full rounded-lg border-2 border-primary p-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
                >
                  <p className="text-lg font-bold">{course.course_name}</p>
                  <p className="text-sm font-medium">{course.instructor}</p>
                  <br />
                  <p className="text-sm">{course.description}</p>
                  <br />
                  <br />
                  <div className="absolute bottom-5 right-5">
                    <Link
                      to={`/courses/${course.instructor}/${course.course_name}`}
                    >
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </section>
            <br />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </>
        ) : (
          <div className="grid min-h-[80vh] place-content-center">
            <p className="text-2xl font-bold">No Courses Found.</p>
          </div>
        )}
      </WithLoader>
    </motion.div>
  );
}
