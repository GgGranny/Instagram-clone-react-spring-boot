import React, { useState, useEffect } from 'react'
import Profile from '../profileComponents/Profile'
import Buttons from "../configuration/profileButton"
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserProfile() {
    const [buttonTitle, setButtonTitle] = useState("POSTS")
    const navigate = useNavigate();


    const setTitle = (title) => {
        setButtonTitle(title)
        if (title === "POSTS") {
            navigate("posts")
        } else if (title === "TAGS") {
            navigate("tags")
        }
    }
    useEffect(() => {
        navigate(`${buttonTitle}`);
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="pl-5 py-4 border-b border-gray-600 ">
                <Profile />
            </div>
            <div className="flex justify-center gap-5 py-4">
                {Buttons.map((Button, index) => (
                    <div key={index} className={buttonTitle === Button.title ? "border-t-2 border-amber-500" : ""}>
                        <button
                            onClick={() => setTitle(Button.title)}
                            className="flex items-center gap-2 text-sm hover:cursor-pointer"
                        >
                            <Button.icon className='text-xs' />
                            <span>{Button.title}</span>
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex-grow overflow-auto p-5">
                <Outlet />
            </div>
        </div>
    )
}
