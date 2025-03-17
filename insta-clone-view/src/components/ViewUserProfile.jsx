import React, { useEffect, useState } from 'react';
import OtherUserProfile from "./viewProfileComponents/OtherUserProfile";
import axios from 'axios';
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom';
import Buttons from '../configuration/profileButton';

export default function ViewUserProfile() {
    const location = useLocation();
    const [title, setTitle] = useState("POSTS");
    const { id: paramId } = useParams();
    const navigate = useNavigate();
    const userId = location.state?.id || paramId;

    useEffect(() => {
        if (!userId) {
            console.error("No user ID provided!");
            return;
        }
    })
    useEffect(() => {
        if (title === "POSTS") {
            navigate(`posts`);
        } else if (title === "TAGS") {
            navigate("tags");
        }
    }, [title, navigate]);

    return (
        <div className="h-full flex flex-col">
            <div className="pl-5 py-4 border-b border-gray-600">
                <OtherUserProfile userId={userId} />
            </div>
            <div className="flex justify-center gap-5 py-4">
                {Buttons.map((Button, index) => (
                    <div key={index} className={title === Button.title ? "border-t-2 border-amber-500" : ""}>
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

            {/* Content Section */}
            <div className="flex-grow overflow-auto p-5">
                <Outlet context={{ userId }} />
            </div>
        </div>
    );
}
