// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const LoginForm = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    
    const { loading, error, role, isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(credentials));
    };

    // Use useEffect to navigate after role is set
    useEffect(() => {
        if (isAuthenticated && role) {
            // Debugging: Confirm the role before navigating
            console.log('Navigating with role:', role);

            // Navigate based on role
            switch (role) {
                case 'super_admin':
                    navigate('/dashboard');
                    break;
                case 'admin':
                    navigate('/dashboard/admin');
                    break;
                case 'content_creator':
                    navigate('/dashboard/content-creator');
                    break;
                case 'editor':
                    navigate('/dashboard/editor');
                    break;
                case 'data_entry_operator':
                      navigate('/dashboard/data-entry-operator');
                      break;
                default:
                    navigate('/unauthorized');
                    break;
            }
        }
    }, [isAuthenticated, role, navigate]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className={cn("flex flex-col gap-6 -mt-16", props.className)} {...props} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-center w-fit text-sm text-muted-foreground">
                  Enter your username to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username" 
                    required 
                    className=""
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder='Password'
                    required 
                  />
                </div>
                <Button type="submit" //className="w-full bg-[#5ec5f1] text-white"
                  disabled={loading}
                  className={`
                      cursor-pointer text-left mt-5 pl-5 
                      group border-2 border-[#50c2f3] 
                      hover:border-blue-200 
                      relative bg-[#cde4ed] h-12 w-full
                      p-3 text-black text-base font-bold 
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
                      hover:text-white
                  `}
                >
                  Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Forgot your password?{" "}
                <a href="#" className="underline underline-offset-4">
                  Reset
                </a>
            </div>
        </form>
    );
}

export default LoginForm;
