import React, { useState } from 'react'
import "../css/signup.css"
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [status, setStatus] = useState('');
    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);
    const [usernameIsFocused, setUsernameIsFocused] = useState(false);
    const [fullnameIsFocused, setFullnameIsFocused] = useState(false);

    const handleOnChangeEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }
    const handleOnChangePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }
    const handleOnChangeUsername = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }
    const handleOnChangeFullname = (event) => {
        event.preventDefault();
        setFullname(event.target.value);
    }
    const handleFocusEmail = () => {
        setEmailIsFocused(true);
    }
    const handleFocusPassword = () => {
        setPasswordIsFocused(true);
    }
    const handleFocusUsername = () => {
        setUsernameIsFocused(true);
    }
    const handleFocusFullname = () => {
        setFullnameIsFocused(true);
    }

    const handleSubmit = (event) => {
        const formData = { email, password, username, fullname };
        event.preventDefault();
        axios.post('http://localhost:8080/api/register', formData)
            .then(response => {
                console.log(response);
                setStatus(response.status);
            })
            .catch(error => {
                console.log(error);
                setStatus(error.response ? error.response.status : 'error');
            });
    }

    return (
        <div className="text-gray-400 h-screen flex justify-center items-center relative">
            <form action="" className='min-w-80 grid grid-cols-1 gap-5 border-white border rounded p-3.5'>
                <div className='text-5xl text-white text-center'><a href="#"><h1>Instagram</h1></a></div>
                <div className='grid grid-cols-1 gap-2'>
                    <div className='mt-1 relative'>
                        <label htmlFor="fullname" className={` ${fullname.length > 0 ? 'animate-moveUp' : ''}`}>fullname</label>
                        <input type="text" id="fullname" name="fullname" value={fullname} onChange={handleOnChangeFullname} className={fullname.length > 0 ? 'pt-2 text-xs font-normal' : ''} />
                    </div>
                    <div className='mt-1 relative'>
                        <label htmlFor="username" className={` ${username.length > 0 ? 'animate-moveUp' : ''}`}>username</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleOnChangeUsername} className={username.length > 0 ? 'pt-2 text-xs font-normal' : ''} />
                    </div>
                    <div className='mt-1 relative'>
                        <label htmlFor="email" className={` ${email.length > 0 ? 'animate-moveUp' : ''}`}>email</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleOnChangeEmail} className={email.length > 0 ? 'pt-2 text-xs font-normal' : ''} />
                    </div>
                    <div className=' relative'>
                        <label htmlFor="password" className={`${password.length > 0 ? 'animate-moveUp' : ''} `}>password</label>
                        <input type="password" id="password" name="password" onChange={handleOnChangePassword} className={password.length > 0 ? 'pt-2 text-xs' : ''} />
                    </div>
                    <div>
                        <NavLink to='/' className='text-white text-sm'>Already have an account?</NavLink>
                    </div>
                </div>
                <div className='flex justify-center w-full'>
                    <button type="submit" className='bg-blue-400 text-white rounded p-1 w-full hover:bg-blue-300 hover:cursor-pointer' onClick={handleSubmit}>Sign Up</button>
                </div>
            </form >
            {status === 200 && <Alert severity="success" className="absolute bottom-5 left-5">This is a success alert.</Alert>}
            {status !== 200 && status !== '' && <Alert severity="error" className="absolute bottom-5 left-5">There was an error with your submission.</Alert>}
        </div >
    )
}