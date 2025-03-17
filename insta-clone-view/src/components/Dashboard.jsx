import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState([]);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/checkUserSession", { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("sessionId", response.data);
            })
            .catch((error) => {
                navigate("/");
            })
    }, []); // Add dependency array here

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllUsers', { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/getContent", { withCredentials: true })
            .then(response => {
                let posts = response.data.map((post) => {
                    return {
                        id: post.id,
                        imageType: post.imageType,
                        imageName: post.imageName,
                        imageData: `data:image/jpeg;base64,${post.imageData}`,
                        userId: post.user.id,
                        username: post.user.username
                    }
                });
                console.log("posts from dashboard: ", posts);
                setContent(posts);
            })
            .catch(error => {
                console.log("error fetching content: " + error);
            })
    }, []);

    return (
        <div className=' w-4/5 flex justify-center'>
            <div className='grid h-[80%] grid-cols-1 gap-3'>
                {content.map((post) => {
                    let filteredUser = user.filter((u) => post.userId === u.id);
                    console.log(" filtered user", filteredUser)
                    return (
                        <Card key={post.id} post={post} filteredUser={filteredUser} onClick={() => navigate(`/profile/${filteredUser[0].id}`, { state: { id: filteredUser[0].id } })} />
                    )
                })}
            </div>
        </div>
    );
}

