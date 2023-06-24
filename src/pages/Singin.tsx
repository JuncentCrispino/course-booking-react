import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Auth } from 'aws-amplify';
import { executeRecaptcha } from '../captcha';
import { H3, Label, Input, Error, Button } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import notify from '@/components/notify';
import { RiErrorWarningFill } from 'react-icons/ri';
import { AiFillCheckCircle } from 'react-icons/ai';
import SmLoader from '@/components/SmLoader';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required.'),
  password: yup.string().required('Email is required.'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useCognito();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    Auth.signIn({
      username: email,
      password,
      validationData: {
        recaptcha: await executeRecaptcha(),
      },
    })
      .then((data) => {
        setUser(data);
        navigate('/courses');
        notify({
          message: 'Welcome to Course Booking Demo App!',
          icon: <AiFillCheckCircle size={30} />,
          status: 'Success',
        });
      })
      .catch((err) => {
        let message: string;
        if (typeof err === 'string') {
          message = err;
        } else if (typeof err?.message === 'string') {
          message = err.message;
        } else {
          message = 'Sorry. Something went wrong. Please try again later.';
        }
        notify({
          message,
          icon: <RiErrorWarningFill size={30} />,
          status: 'Error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex max-h-fit min-h-[100vh] max-w-md items-center p-5"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3 rounded-lg border-2 border-primary/75 px-6 py-8 shadow-lg md:px-12"
      >
        <H3>SIGN IN</H3>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="email">
              Email
              <Input
                id="email"
                placeholder="email@example.com"
                value={value}
                onChange={onChange}
                error={Boolean(errors.email)}
              />
              <Error
                message={errors.email?.message}
                show={Boolean(errors.email)}
              />
            </Label>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="password">
              Password
              <Input
                autoComplete="current-password"
                type="password"
                id="password"
                placeholder="Password"
                value={value}
                onChange={onChange}
                error={Boolean(errors.password)}
              />
              <Error
                message={errors.password?.message}
                show={Boolean(errors.password)}
              />
            </Label>
          )}
        />

        <Button type="submit" className="mt-5">
          {!isLoading ? (
            'SIGN IN'
          ) : (
            <div className="flex items-center gap-3">
              SIGNING IN
              <SmLoader />
            </div>
          )}
        </Button>

        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-bold text-primary/75">
            Click here
          </Link>
        </p>
      </form>
    </motion.main>
  );
}
