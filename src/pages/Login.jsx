import React from 'react';
import { culturatiLogo, loginPage } from '../assets';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (

    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-24 w-24 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img src={culturatiLogo} alt='logo' className='h-fit w-fit bg-white'/>
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={loginPage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
        <div className='absolute inset-0 flex flex-col' >
          <p className='absolute bottom-28 right-9 text-white text-6xl roboto font-semibold'>CULTURATI</p>
          <p className='absolute w-xs h-1 bottom-24 right-9 bg-white'></p>
          <p className='absolute bottom-16 right-9 text-white text-md font-medium'>Copyright © 2025 CULTURATI.EU, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
