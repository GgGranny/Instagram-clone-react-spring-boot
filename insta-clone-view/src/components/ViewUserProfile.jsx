import React from 'react'
import Profile from "../profileComponents/Profile"
export default function ViewUserProfile() {
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
