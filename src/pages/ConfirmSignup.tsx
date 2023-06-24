import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Error, H3, Input, Label } from '@/components';
import { Auth } from 'aws-amplify';
import { signupStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import notify from '@/components/notify';
import { RiErrorWarningFill } from 'react-icons/ri';
import { AiFillCheckCircle } from 'react-icons/ai';
import SmLoader from '@/components/SmLoader';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  code: yup.string().required('Code is required.'),
});
export default function ConfirmSignup() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    code: string;
  }>({
    defaultValues: {
      email: signupStore((state) => state.email),
      code: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email, code }: { email: string; code: string }) => {
    Auth.confirmSignUp(email, code.split(' ').join(''))
      .then((data) => {
        if (data === 'SUCCESS') {
          navigate('/signin');

          notify({
            message: 'Successfully confirmed email.',
            icon: <AiFillCheckCircle size={30} />,
            status: 'Success',
          });
        }
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
      .finally(() => setIsConfirming(false));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex max-h-fit min-h-[90vh] max-w-md items-center p-5"
    >
      <section className="flex w-full flex-col gap-3 rounded-lg border-2 border-primary/75 px-6 py-8 shadow-lg md:px-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <H3>CONFIRM SIGN UP</H3>
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
            name="code"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Label htmlFor="code">
                Code
                <Input
                  id="code"
                  placeholder="*****"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.code)}
                />
                <Error
                  message={errors.code?.message}
                  show={Boolean(errors.code)}
                />
              </Label>
            )}
          />
          <div className="flex flex-col">
            <Button type="submit" className="mt-5">
              {!isConfirming ? (
                'CONFIRM'
              ) : (
                <div className="flex items-center gap-3">
                  CONFIRMING
                  <SmLoader />
                </div>
              )}
            </Button>
          </div>
        </form>
      </section>
    </motion.main>
  );
}
