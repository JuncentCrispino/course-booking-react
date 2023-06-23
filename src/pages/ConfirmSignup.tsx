import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Error, H3, Input, Label } from '@/components';
import { Auth } from 'aws-amplify';
import { signupStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  code: yup.string().required('Code is required.'),
});
export default function ConfirmSignup() {
  const navigate = useNavigate();
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
    try {
      const data = await Auth.confirmSignUp(email, code.split(' ').join(''));
      if (data === 'SUCCESS') {
        return navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mx-auto flex max-h-fit min-h-[90vh] max-w-md items-center p-5">
      <section className="flex w-full flex-col gap-3 rounded-lg border-2 border-primary/75 px-12 py-8 shadow-lg">
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
          <Button type="submit" className="mt-5">
            CONFIRM
          </Button>
        </form>
      </section>
    </main>
  );
}
