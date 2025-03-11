import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function Posts() {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/getUserPosts", { withCredentials: true })
            .then((response) => {
                let posts = response.data;
                setUserPosts(posts);
            })
            .catch((error) => {
                console.log("failed to load content: ", error)
            })
    }, []);
    return (
        <div className='flex justify-center'>
            <div className="w-[80%] columns-3">
                {userPosts !== null && userPosts.length > 0 ?
                    (userPosts.map((post) => {
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
