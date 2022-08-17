import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Stepper, Group } from '@mantine/core';
import { signup, checkEmail } from '../services/auth';
import userStore from '../store/userStore';
import { useEffect } from 'react';

const inputClass = 'mb-2 block  p-1 indent-1 rounded w-full '
const noErrorInput = 'outline-hb outline outline-1 focus:outline-2'
const errorInput = 'outline-red-500 outline outline-1 focus:outline-2'
const errorMessage = 'text-red-500 text-xs text-right'

export default function Register() {
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState({ style: noErrorInput, value: '', error: '' });
  const [confirmEmail, setConfirmEmail] = useState({ style: noErrorInput, value: '', error: '' });
  const [password, setPassword] = useState({ style: noErrorInput, value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ style: noErrorInput, value: '', error: '' });
  const [firstName, setFirstName] = useState({ style: noErrorInput, value: '', error: '' });
  const [lastName, setLastName] = useState({ style: noErrorInput, value: '', error: '' });
  const [phone, setPhone] = useState({ style: noErrorInput, value: '', error: '' });
  const [address, setAddress] = useState({ style: noErrorInput, value: '', error: '' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const nextStep = async (e) => {
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
      if (await checkEmail(email.value) === 409) {
        error = true
        setEmail({ ...email, error: 'Email is already in use', style: errorInput });
      }
      return (error) ? setActive(active) : setActive((current) => (current < 2 ? current + 1 : current))
    }
    if (active === 1) {
      if (firstName.value === '') {
        error = true
        setFirstName({ ...firstName, error: 'First Name is required', style: errorInput });
      }
      if (lastName.value === '') {
        error = true
        setLastName({ ...lastName, error: 'Last Name is required', style: errorInput });
      }
      if (phone.value === '') {
        error = true
        setPhone({ ...phone, error: 'Phone is required', style: errorInput });
      }
      if (address.value === '') {
        error = true
        setAddress({ ...address, error: 'Address is required', style: errorInput });
      }
      if (error) {
        return setActive(active)
      } else {
        const data = await signup({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          address: address.value
        })
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('accessToken', data.accessToken)
        setUser(data)
        return setActive((current) => (current < 2 ? current + 1 : current))
      }
    }
  };

  return (
    <div className='grid place-items-center h-screen max-w-md mx-auto px-4'>
      <div className='max-h-min  grid place-items-center w-full rounded-lg bg-primary shadow-shadow-1'>
        <form className='w-full px-8 py-8' onSubmit={e => e.preventDefault()}>
          <h1 className='text-lg font-bold mb-2 text-hb'>Sign Up</h1>
          <Stepper color='green' active={active} onStepClick={setActive} breakpoint="sm" size='sm' iconSize={32}>
            <Stepper.Step label="Credentials" description="email/password">
              <label htmlFor='email' className='text-xs'>Email</label>
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
              <label htmlFor='confirm-email' className='text-xs'>Confirm Email</label>
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
              <label htmlFor='password' className='text-xs'>Password</label>
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
              <label htmlFor='confirm-password' className='text-xs'>Confirm Password</label>
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
                value={confirmPassword.value}
              />
              {confirmPassword.error && <p className={errorMessage}>{confirmPassword.error}</p>}
            </Stepper.Step>
            <Stepper.Step label="Account" description="Personal Info">
              <section className='flex'>
                <div className='mr-2'>
                  <label htmlFor='firstName' className='text-xs'>First Name</label>
                  <input
                    id='firstName'
                    type='text'
                    placeholder='John'
                    className={inputClass + firstName.style}
                    onChange={(e) => {
                      setFirstName({
                        value: e.target.value,
                        style: noErrorInput,
                        error: ''
                      })
                    }}
                    value={firstName.value}
                  />
                  {firstName.error && <p className={errorMessage}>{firstName.error}</p>}
                </div>
                <div>
                  <label htmlFor='lastName' className='text-xs'>Last Name</label>
                  <input
                    id='lastName'
                    type='text'
                    placeholder='Doe'
                    className={inputClass + lastName.style}
                    onChange={(e) => {
                      setLastName({
                        value: e.target.value,
                        style: noErrorInput,
                        error: ''
                      })
                    }}
                    value={lastName.value}
                  />
                </div>
              </section>
              <label htmlFor='phone' className='text-xs'>Mobile Number</label>
              <input
                id='phone'
                type='text'
                placeholder='09123456789'
                className={inputClass + phone.style}
                onChange={(e) => {
                  setPhone({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
                value={phone.value}
              />
              <label htmlFor='address' className='text-xs'>Address</label>
              <input
                id='address'
                type='text'
                placeholder='123 Main St.'
                className={inputClass + address.style}
                onChange={(e) => {
                  setAddress({
                    value: e.target.value,
                    style: noErrorInput,
                    error: ''
                  })
                }}
                value={address.value}
              />
            </Stepper.Step>
            <Stepper.Completed>
              <p className='text-center text-lg font-bold'>
                <span role='img' aria-label='check'>✅</span>
              </p>
            </Stepper.Completed>
          </Stepper>
          <h6 className='text-xs'>Already have an account? <Link to='/login' className='font-bold text-hb'>Click Here</Link></h6>
          <Group position="center" mt="xl">
            <button className='bg-hb text-white py-[5px] px-[10px] rounded-lg font-normal outline-hb text-[14px]' onClick={prevStep}>Back</button>
            <button className='bg-hb text-white py-[5px] px-[10px] rounded-lg font-normal outline-hb text-[14px]' onClick={nextStep} type='submit'>Next</button>
          </Group>
        </form>
      </div>
    </div>
  )
}
