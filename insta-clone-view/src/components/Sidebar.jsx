import React from 'react'
import Items from '../configuration/Sidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleOnClick = (title) => {
        setTitle(title);
        console.log(title);
        if (title === "Profile") {
            navigate("/Profile")
        } else if (title === "Home") {
            navigate("/Home")
        }
    }
    return (
        <div className="flex justify-evenly flex-col h-screen text-white  border-r border-r-amber-50 w-full sticky top-0">
            <div className='text-center text-2xl'>
                <h1>Instagram</h1>
            </div>
            {Items.map((item, index) => {
                return (
                    <div key={index} onClick={() => handleOnClick(item.title)} className="flex hover:bg-gray-700 hover:cursor-pointer p-2 mx-2 rounded-md">
                        <item.icon className={`text-2xl mx-2 ${title === item.title ? <item.isActive className="font-extrabold" /> : ""}`} />
                        <div><p className={`${title === item.title ? "font-bold" : ""}`}>{item.title}</p></div>
                    </div>
                )
            })}
        </div >
    )
}
