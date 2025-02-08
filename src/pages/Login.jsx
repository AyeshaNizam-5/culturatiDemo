import React from 'react'
import { culturatiLogo } from '../assets';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className='w-dvw h-dvh bg-[linear-gradient(90deg,rgba(2,1,19,1)_0%,rgba(9,9,30,1)_70%,rgba(21,153,222,1)_100%)]'>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[50%] h-full flex flex-col justify-start items-start'>
                <img src={culturatiLogo} alt='' className='w-52 mx-28 mt-32' />
                <h1 className='text-white text-7xl roboto font-bold italic px-28 leading-[80px]'>Management Dashboard</h1>
            </div>
            <LoginForm />
        </div>
    </div>
  )
}

export default Login;