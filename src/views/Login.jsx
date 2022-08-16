import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState({style: 'outline-hb outline outline-1 focus:outline-2', error: '', value: ''});
  const inputClass = `
    mb-2
    block 
    p-1
    rounded
    w-full ` + email.style;
  return (
    <div className='grid place-items-center h-screen max-w-md mx-auto px-4'>
      <div className='max-h-80 grid place-items-center w-full rounded-lg bg-primary shadow-shadow-1'>
          <form className='w-full px-8 py-8'>
            <h1 className='text-lg font-bold mb-2 text-hb'>Sign In</h1>
            <label for='email' className='text-xs'>Email</label>
            <input type='text' placeholder='email@example.com' className={inputClass} id='email' />
            <label for='password' className='text-xs'>Password</label>
            <input type='password' placeholder='********' className={inputClass} id='password' />
            <h6 className='text-xs'>Dont have an account yet? <Link to='/register' className='font-bold text-hb' >Click Here</Link></h6>
            <section className='flex justify-end'>
            <button className='bg-hb text-white py-2 px-4 rounded-lg font-normal outline-hb'>
              Login
            </button>
            </section>
          </form>
      </div>
    </div>
  )
}
