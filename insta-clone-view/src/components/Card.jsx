import React from 'react';

export default function Card({ post, filteredUser }) {
    if (!post) return null;
    console.log('user form card: ', filteredUser)
    return (
        <div className="card w-80 text-white flex flex-col rounded overflow-hidden border border-red-300">
            <div className="flex items-center justify-between px-3 py-2 bg-black/50">
                {filteredUser.map((user) => (
                    <div className="flex  gap-x-2 items-center">
                        <img
                            className="rounded-full w-8 h-8 object-cover"
                            src={`data:image/jpeg;base64,${user.profilePicture}`}
                            alt="Avatar"
                        />
                        <a href="#" className="text-sm">
                            <h2>{post.username || "Unknown User"}</h2>
                            <p className="text-xs">{post.caption || ""}</p>
                        </a>
                    </div>
                ))}
                <button className="border rounded px-3 py-1 text-sm hover:bg-white hover:text-black transition">
                    Follow
                </button>
            </div>
            <div className="w-full min-h-80 bg-black flex items-center justify-center">
                <img
                    className="w-full h-full object-cover"
                    src={post.imageData}
                    alt="Post"
                />
            </div>
        </div>
    );
}
