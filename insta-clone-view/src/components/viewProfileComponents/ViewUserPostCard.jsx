import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function ViewUserPostCard() {
    const { userId } = useOutletContext();
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/api/getUserContentById/${userId}`, { withCredentials: true })
            .then(response => {
                setPosts(response.data);
                console.log("User data fetched:", response.data);
            })
            .catch(error => console.error("Error fetching user data:", error));
    }, [userId]);

    return (
        <div className='flex justify-center'>
            <div className="w-[80%] columns-3">
                {posts !== null && posts.length > 0 ?
                    (posts.map((post) => {
                        return (
                            <div key={post.id} className="aspect-2/3 mb-2">
                                <NavLink to="#">
                                    <img src={`data:image/jpeg;base64,${post.imageData}`} alt="image" className="h-full w-full rounded object-cover object-center" />
                                </NavLink>
                            </div>

                        )
                    })) : (
                        <div><p>No post</p></div>
                    )}
            </div>
        </div>
    )
}
