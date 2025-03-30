import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState([]);
    const [content, setContent] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/checkUserSession", { withCredentials: true })
            .then((response) => {
                localStorage.setItem("sessionId", response.data);
            })
            .catch((error) => {
                console.log("session is null");
                navigate("/");
                return;
            })
    }, []); // Add dependency array here

    useEffect(() => {
        axios.get('http://localhost:8080/api/getAllUsers', { withCredentials: true })
            .then((response) => {
                console.log("this is userrs: " + response.data);
                const allContent = [];
                response.data.forEach(data => {
                    allContent.push(...data.content);
                });
                setContent(allContent);
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    }, []);



    useEffect(() => {
        console.log("content:", content);
        console.log("user:", user);
    }, [user, content]);

    const handleCardNavigation = (userId) => {
        navigate(`/profile/${userId}`, { state: { id: userId } });
    }

    return (
        <div className=' w-4/5 flex justify-center'>
            <div className='grid h-[80%] grid-cols-1 gap-3'>
                {user.map((u, index) => {
                    return (
                        <Card key={index} user={u} onClick={() => handleCardNavigation(u.id)} />
                    );
                })}
            </div>
        </div>
    );
}

