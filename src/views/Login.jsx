import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import userStore from '../store/userStore';
import { toast } from 'react-toastify';

const inputClass = 'mb-2 block  p-1 indent-1 rounded w-full '
const noErrorInput = 'outline-hb outline outline-1 focus:outline-2'
const errorInput = 'outline-red-500 outline outline-1 focus:outline-2'
const errorMessage = 'text-red-500 text-xs text-right'

export default function Login() {
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: '', style: noErrorInput, error: '' });
  const [password, setPassword] = useState({ value: '', style: noErrorInput, error: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    setLoading(true);
    if (!email.value) {
      error = true;
      setEmail({ ...email, style: errorInput, error: 'Email is required' });
    }
    if (!password.value) {
      error = true;
      setPassword({ ...password, style: errorInput, error: 'Password is required' });
    }
    if (error) {
      return;
    } else {
      try {
        const data = await login({ email: email.value, password: password.value });
        if (!data) {
          return setLoginError('Email or Password incorrect');
        }
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data);
        toast.success('Login Successfully');
        return navigate('/');
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className='grid place-items-center h-screen max-w-md mx-auto px-4'>
      <div className='max-h-80 grid place-items-center w-full rounded-lg bg-primary shadow-shadow-1'>
        <form className='w-full px-8 py-8' onSubmit={handleSubmit}>
          <h1 className='text-lg font-bold mb-2 text-hb'>Sign In</h1>
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
              });
              setLoginError('');
            }}
            value={email.value}
          />
          {email.error && <p className={errorMessage}>{email.error}</p>}
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
              });
              setLoginError('');
            }}
            value={password.value}
          />
          {password.error && <p className={errorMessage}>{password.error}</p>}
          {loginError && <p className={errorMessage}>{loginError}</p>}
          <h6 className='text-xs'>Dont have an account yet? <Link to='/register' className='font-bold text-hb' >Click Here</Link></h6>
          <section className='flex justify-end'>
            <button className='bg-hb text-white py-2 px-4 rounded-lg font-normal outline-hb'>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </section>
        </form>
      </div>
    </div>
  )
}
