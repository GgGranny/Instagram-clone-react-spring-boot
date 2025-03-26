import React from 'react';

export default function Card({ user, onClick }) {
    return (
        <>
            {user?.content?.map((u, index) => (
                <div key={index} className="card w-80 text-white flex flex-col rounded overflow-hidden border border-red-300">
                    <div className="flex items-center justify-between px-3 py-2 bg-black/50">
                        <div className="flex gap-x-2 items-center">
                            <img
                                className="rounded-full w-8 h-8 object-cover"
                                src={user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : "/default-avatar.png"}
                                alt="Avatar"
                            />
                            <button onClick={() => onClick(user)} className="text-sm hover:cursor-pointer">
                                <h2>{user.username || "Unknown User"}</h2>
                                <p className="text-xs">{user.caption || ""}</p>
                            </button>
                        </div>

                        <button
                            className="border rounded px-3 py-1 text-sm hover:bg-white hover:text-black transition"
                            onClick={() => alert("Followed!")} // Replace with a real handler
                        >
                            Follow
                        </button>
                    </div>
                    <div className="w-full min-h-80 bg-black flex items-center justify-center">
                        <img
                            className="w-full h-full object-cover"
                            src={`data:image/jpeg;base64,${u.imageData}` || "/default-image.png"} // Fix: Use `u.imageData`
                            alt="Post"
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
