import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Auth } from 'aws-amplify';
import { executeRecaptcha } from '../captcha';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Label, Error, Button, H3 } from '@/components';
import { signupStore } from '@/store';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required.'),
  given_name: yup.string().required('Given name is required.'),
  family_name: yup.string().required('Family name is required.'),
  phone_number: yup
    .string()
    .matches(/^\+[1-9]\d{1,14}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required.'),
});

interface ISignupPayload {
  email: string;
  password: string;
  family_name: string;
  given_name: string;
  phone_number: string;
}

export default function Singup() {
  const navigate = useNavigate();
  const setEmail = signupStore((state) => state.setEmail);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    given_name: string;
    family_name: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      email: '',
      given_name: '',
      family_name: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async ({
    email,
    password,
    family_name,
    given_name,
    phone_number,
  }: ISignupPayload) => {
    setIsLoading(true);
    try {
      const data = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email,
          family_name,
          given_name,
          phone_number,
        },
        validationData: {
          recaptcha: await executeRecaptcha(),
        },
      });
      setEmail(email);
      if (data.userConfirmed === false) {
        return navigate('/signup/confirm/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex max-h-fit min-h-[90vh] max-w-md items-center p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3 rounded-lg border-2 border-primary/75 px-12 py-8 shadow-lg"
      >
        <H3>SIGN UP</H3>

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
          name="given_name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="given_name">
              Given Name
              <Input
                placeholder="Juan"
                value={value}
                onChange={onChange}
                id="given_name"
                error={Boolean(errors.given_name)}
              />
              <Error
                message={errors.given_name?.message}
                show={Boolean(errors.given_name)}
              />
            </Label>
          )}
        />
        <Controller
          name="family_name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="family_name">
              Family Name
              <Input
                id="family_name"
                placeholder="Dela Cruz"
                value={value}
                onChange={onChange}
                error={Boolean(errors.family_name)}
              />
              <Error
                message={errors.family_name?.message}
                show={Boolean(errors.family_name)}
              />
            </Label>
          )}
        />
        <Controller
          name="phone_number"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="phone_number">
              Phone Number
              <Input
                id="phone_number"
                placeholder="9876543210"
                value={value}
                onChange={onChange}
                error={Boolean(errors.phone_number)}
              />
              <Error
                message={errors.phone_number?.message}
                show={Boolean(errors.phone_number)}
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
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Label htmlFor="confirmPassword">
              Confirm Password
              <Input
                autoComplete="current-password"
                type="password"
                id="confirmPassword"
                placeholder="Password"
                value={value}
                onChange={onChange}
                error={Boolean(errors.confirmPassword)}
              />
              <Error
                message={errors.confirmPassword?.message}
                show={Boolean(errors.confirmPassword)}
              />
            </Label>
          )}
        />

        <Button type="submit" className="mt-5">
          {!isLoading ? 'SIGN UP' : 'SIGNING UP...'}
        </Button>
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-primary/75">
            Click here
          </Link>
        </p>
      </form>
    </main>
  );
}
