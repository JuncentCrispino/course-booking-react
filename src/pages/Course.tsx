import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components';
import { useCognito } from '@/context/AuthContext';
import { api } from '@/libs';
import notify from '@/components/notify';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { ICourse } from '@/interfaces';
import WithLoader from '@/components/WithLoader';
import { motion } from 'framer-motion';
import SmLoader from '@/components/SmLoader';

export default function Course() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { instructor, course_id } = useParams();
  const { user } = useCognito();
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/courses/${instructor}/${course_id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [instructor, course_id]);

  const onEnroll = async () => {
    if (!user) {
      navigate('/signin');
    }
    setIsEnrolling(true);
    const payload = {
      courseInfo: {
        instructor: course?.instructor,
        course_name: course?.course_name,
      },
      userInfo: {
        email: user?.getUsername(),
      },
    };

    api
      .post('/enroll', payload)
      .then(() => {
        api
          .get(`/courses/${instructor}/${course_id}`)
          .then((res) => setCourse(res.data))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
        notify({
          message: 'Enrolled Succesfully.',
          icon: <BsFillCheckCircleFill />,
          status: 'Success',
        });
      })
      .catch((err) => {
        notify({
          message: err.response.data.message || 'Sorry Something went wrong.',
          icon: <MdError size={30} />,
          status: 'Error',
        });
      })
      .finally(() => setIsEnrolling(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto grid min-h-[100vh] place-content-center px-5 md:w-[600px]"
    >
      <WithLoader isLoading={isLoading}>
        {course ? (
          <div
            key={course.course_name}
            className="relative min-h-[300px] w-full rounded-lg border-2 border-primary p-10 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]"
          >
            <p className="text-xl font-bold">{course.course_name}</p>
            <p className="text-lg font-medium">{course.instructor}</p>
            <br />
            <p className="text-base">{course.description}</p>
            <br />
            <p className="mb-2 font-medium">{course.schedule}</p>
            <p>
              <b>{course.available_slots}</b> available_slots |{' '}
              <b>{course.enrollees.length}</b> enrollees
            </p>
            <br />
            <br />
            <div className="absolute bottom-5 right-5">
              <Button onClick={onEnroll}>
                {!isEnrolling ? (
                  'ENROLL'
                ) : (
                  <div className="flex items-center gap-3">
                    ENROLLING
                    <SmLoader />
                  </div>
                )}
              </Button>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="absolute right-5 top-5 transform rounded-full bg-primary p-1 text-white"
            >
              <BiArrowBack size={25} />
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold">Course Not Found.</p>
        )}
      </WithLoader>
    </motion.div>
  );
}
