import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/authActions';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    
    const { loading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(credentials));
            navigate('/institutions');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='w-[50%] h-full flex flex-col justify-center items-start px-24'>
            <form onSubmit={handleSubmit} className='w-[500px] h-[450px] rounded-[40px] bg-[#040a22] shadow-2xl p-10'>
                <h1 className='text-2xl font-bold text-white roboto mt-5 p-1'>
                    Welcome,<br/>
                    <span className='font-semibold text-[18px]'>login</span>
                    <span className='font-light text-[16px]'> to continue.</span>
                </h1>
                
                {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                )}

                <input 
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder='Username'
                    className='w-full h-14 bg-[#0d0f2a] border-none rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white text-white px-4 mt-6'
                />
                <input 
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className='w-full h-14 bg-[#0d0f2a] border-none rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white text-white px-4 mt-6'
                />
                <p className='w-full text-right text-sm text-white italic mt-5 cursor-pointer hover:text-blue-400 transition-colors'>
                    Forgot your password?
                </p>
                <button 
                    type="submit"
                    disabled={loading}
                    className={`
                        cursor-pointer text-left mt-5 pl-5 
                        group border-2 border-white/20 
                        hover:border-blue-200 
                        relative bg-[#040a22] h-14 w-[250px] 
                        p-3 text-gray-50 text-base font-bold 
                        rounded-2xl overflow-hidden 
                        transition-all duration-300
                        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'}
                        before:absolute before:w-12 before:h-12 
                        before:content-[''] before:right-1 
                        before:top-1 before:z-10 
                        before:bg-blue-500 before:rounded-full 
                        before:blur-lg before:opacity-60
                        after:absolute after:z-10 after:w-20 
                        after:h-20 after:content-[''] 
                        after:bg-blue-400 after:right-8 
                        after:top-3 after:rounded-full 
                        after:blur-lg after:opacity-60
                        hover:before:opacity-100
                        hover:after:opacity-100
                        hover:text-blue-200
                    `}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm