import React from 'react'

export default function ProfileButtons({ onClick, label, backgroundColor }) {
    return (
        <div>
            <button onClick={onClick} className={`rounded-md px-4 py-2 ${backgroundColor} text-xs font-bold`}>
                {label}
            </button>
        </div>
    )
}
