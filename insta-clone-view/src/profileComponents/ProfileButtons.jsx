import React from 'react'

export default function ProfileButtons({ onClick, label }) {
    return (
        <div>
            <button onClick={onClick} className={`rounded-md px-2 py-1 bg-gray-500 text-xs font-bold`}>
                {label}
            </button>
        </div>
    )
}
