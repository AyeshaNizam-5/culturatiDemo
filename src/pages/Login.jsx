import React from 'react';
import { culturatiLogo } from '../assets';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className='w-dvw h-dvh bg-[linear-gradient(90deg,#f9fafa_0%,#e8f3f7_30%,#cde4ed_60%,#b5dbe3_100%)]'>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[50%] h-full flex flex-col justify-start items-start'>
                <img src={culturatiLogo} alt='' className='w-52 mx-28 mt-32' />
                <h1 className='text-[#5ec5f1] text-6xl roboto font-semibold px-28 leading-[80px]'>Management Dashboard</h1>
            </div>
            <LoginForm />
        </div>
    </div>
  );
}

export default Login;
