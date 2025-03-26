import React, { useEffect, useState } from 'react';
import ProfileModal from '../../profileComponents/ProfileModel';
import ProfileButtons from '../../profileComponents/ProfileButtons';
import axios from 'axios';
import icon from '../../assets/react.svg'

export default function OtherUserProfile({ userId }) {
    const [open, setOpen] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [user, setUser] = useState({
        id: '',
        username: '',
        profilePhoto: null,
        fullname: ''
    });

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:8080/api/getUserById/${userId}`, { withCredentials: true })
            .then((response) => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    fullname: response.data.fullname,
                    profilePhoto: response.data.profilePicture
                        ? `data:image/jpeg;base64,${response.data.profilePicture}`
                        : "/default-profile.png"
                });
                getPostCount(response.data.id);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

    const getPostCount = (id) => {
        axios.get(`http://localhost:8080/api/getPostCount/${id}`, { withCredentials: true })
            .then((response) => setPostCount(response.data))
            .catch(error => console.error("Error fetching post count:", error));
    };

    const handleFollowRequest = () => {
        if (!userId) {
            console.error("User ID is missing");
            return;
        }
        axios.get(`http://localhost:8080/api/friendRequest/${userId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error sending follow request:", error);
            });
    };

    return (
        <div className="flex justify-around w-[60%] text-sm gap-x-3 pt-10 text-white">
            <div className="w-30 h-30 rounded-full border">
                <button onClick={() => setOpen(true)} className="cursor-pointer h-full w-full">
                    <img
                        className="rounded-full object-cover h-full w-full"
                        src={user.profilePhoto || icon}
                        alt="Profile"
                    />
                </button>
            </div>
            <ProfileModal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-80 bg-gray-700 py-4 rounded">
                    <h1>Change Profile Picture</h1>
                    <div className="flex flex-col gap-y-2 mt-2">
                        <button className="text-red-500 focus:bg-gray-800 py-2">Remove Current Picture</button>
                        <button className="focus:bg-gray-800 py-2" onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                </div>
            </ProfileModal>
            <div className="flex flex-col justify-center gap-y-3">
                <div className="flex gap-4">
                    <div>{user.username}</div>
                    <div className="flex gap-2 justify-center">
                        <ProfileButtons backgroundColor="bg-blue-500" onClick={handleFollowRequest} label="Follow" />
                        <ProfileButtons backgroundColor="bg-gray-800" onClick={() => console.log("Message Clicked")} label="Message" />
                    </div>
                </div>
                <div className="flex justify-between gap-2 mt-2">
                    <p className="text-gray-400">
                        <span className="font-bold mr-1 text-white">{postCount}</span> Posts
                    </p>
                    <p className="text-gray-400">
                        <span className="font-bold mr-1 text-white">115</span> Followers
                    </p>
                    <p className="text-gray-400">
                        <span className="font-bold mr-1 text-white">105</span> Following
                    </p>
                </div>
                <div className="font-bold">
                    <p>{user.fullname}</p>
                </div>
            </div>
        </div>
    );
}
