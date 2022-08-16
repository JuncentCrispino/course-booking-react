import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Stepper, Group } from '@mantine/core';

export default function Register() {
  const [email, setEmail] = useState({ style: 'outline-hb outline outline-1 focus:outline-2', value: '', error: '' });
  const [confirmEmail, setConfirmEmail] = useState({ style: 'outline-hb outline outline-1 focus:outline-2', value: '', error: '' });
  const [password, setPassword] = useState({ style: 'outline-hb outline outline-1 focus:outline-2', value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ style: 'outline-hb outline outline-1 focus:outline-2', value: '', error: '' });
  const [active, setActive] = useState(0);

  const inputClass = `
    mb-2
    block 
    p-1
    indent-1
    rounded
    w-full `
  const noErrorInput = 'outline-hb outline outline-1 focus:outline-2'
  const errorInput = 'outline-red-500 outline outline-1 focus:outline-2'
  const errorMessage = 'text-red-500 text-xs text-right'

  const nextStep = () => {
    let error = false;
    if (active === 0) {
      if (email.value === '') {
        error = true
        setEmail({ ...email, error: 'Email is required', style: errorInput });
      }
      if (confirmEmail.value === '') {
        error = true
        setConfirmEmail({ ...confirmEmail, error: 'Confirm Email is required', style: errorInput });
      }
      if (email.value !== confirmEmail.value) {
        error = true
        setEmail({ ...email, error: 'Emails do not match', style: errorInput });
        setConfirmEmail({ ...confirmEmail, error: 'Emails do not match', style: errorInput });
      }
      if (password.value === '') {
        error = true
        setPassword({ ...password, error: 'Password is required', style: errorInput });
      }
      if (confirmPassword.value === '') {
        error = true
        setConfirmPassword({ ...confirmPassword, error: 'Confirm Password is required', style: errorInput });
      }
      if (password.value !== confirmPassword.value) {
        error = true
        setPassword({ ...password, error: 'Passwords do not match', style: errorInput });
        setConfirmPassword({ ...confirmPassword, error: 'Passwords do not match', style: errorInput });
      }
      return (error) ? setActive(active) : setActive((current) => (current < 2 ? current + 1 : current))
    }
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const submit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='grid place-items-center h-screen max-w-md mx-auto px-4'>
      <div className='max-h-min  grid place-items-center w-full rounded-lg bg-primary shadow-shadow-1'>
        <form className='w-full px-8 py-8' onSubmit={e => submit(e)}>
          <h1 className='text-lg font-bold mb-2 text-hb'>Sign Up</h1>
          <Stepper color='green' active={active} onStepClick={setActive} breakpoint="sm" size='sm' iconSize={32}>
            <Stepper.Step label="Credentials" description="email/password">
              <label for='email' className='text-xs'>Email</label>
              <input
                id='email'
                type='text'
                placeholder='email@example.com'
                className={inputClass + email.style}
                onChange={(e) => {
                  setEmail({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
                value={email.value}
              />
              {email.error && <p className={errorMessage}>{email.error}</p>}
              <label for='confirm-email' className='text-xs'>Confirm Email</label>
              <input
                id='confirm-email'
                type='text'
                placeholder='email@example.com'
                className={inputClass + confirmEmail.style}
                onChange={(e) => {
                  setConfirmEmail({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
                value={confirmEmail.value}
              />
              {confirmEmail.error && <p className={errorMessage}>{confirmEmail.error}</p>}
              <label for='password' className='text-xs'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='********'
                className={inputClass + password.style}
                onChange={(e) => {
                  setPassword({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
                value={password.value}
              />
              {password.error && <p className={errorMessage}>{password.error}</p>}
              <label for='confirm-password' className='text-xs'>Confirm Password</label>
              <input
                id='confirm-password'
                type='password'
                placeholder='********'
                className={inputClass + confirmPassword.style}
                onChange={(e) => {
                  setConfirmPassword({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
              />
              {confirmPassword.error && <p className={errorMessage}>{confirmPassword.error}</p>}
            </Stepper.Step>
            <Stepper.Step label="Account" description="Personal Info">
              <section className='flex'>
                <div className='mr-2'>
                  <label for='firstName' className='text-xs'>First Name</label>
                  <input type='text' placeholder='John' className={inputClass} id='firstName' />
                </div>
                <div>
                  <label for='lastName' className='text-xs'>Last Name</label>
                  <input type='text' placeholder='Doe' className={inputClass} id='lastName' />
                </div>
              </section>
              <label for='mobile' className='text-xs'>Mobile Number</label>
              <input type='text' placeholder='09123456789' className={inputClass} id='mobile' />
            </Stepper.Step>
          </Stepper>
          <h6 className='text-xs'>Already have an account? <Link to='/login' className='font-bold text-hb'>Click Here</Link></h6>
          <Group position="center" mt="xl">
            <button className='bg-hb text-white py-[5px] px-[10px] rounded-lg font-normal outline-hb text-[14px]' onClick={prevStep}>Back</button>
            <button className='bg-hb text-white py-[5px] px-[10px] rounded-lg font-normal outline-hb text-[14px]' onClick={nextStep} type='submit'>Next</button>
          </Group>

          {/* <section className='flex justify-end'>
            <button className='bg-hb text-white py-2 px-4 rounded-lg font-normal outline-hb'>
              submit
            </button>
          </section> */}
        </form>
      </div>
    </div>
  )
}
