import { React, useState, useEffect, useRef } from 'react'
import { IoIosSettings } from "react-icons/io";
import axios from "axios";
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const [profile, setProfile] = useState();
    const [open, setOpen] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const fileUploadRef = useRef(null);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        fullname: '',
        profilePhoto: null,
    });
    const handleUploadProfile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            axios.post("http://localhost:8080/api/uploadProfile", formData, { withCredentials: true })
                .then(response => {
                    setUser({
                        username: response.data.username,
                        profilePhoto: `data:image/jpeg;base64,${response.data.profilePicture}`,
                        fullname: response.data.fullname
                    })
                })
                .catch(error => console.log("error uploading profile: " + error));
        }

    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/user", { withCredentials: true })
            .then((response) => {
                setUser({
                    username: response.data.username,
                    profilePhoto: `data:image/jpeg;base64,${response.data.profilePicture}`,
                    fullname: response.data.fullname
                })
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8080/api/logout", { withCredentials: true })
            .then((response) => {
                console.log("logout successfully");
                navigate("/");
            })
            .catch(error => console.log("logout failed ", error));
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/getPostCount", { withCredentials: true })
            .then((response) => {
                setPostCount(response.data);
            })
            .catch(error => console.log("error", error));
    }, [postCount]);
    return (
        <div className='flex justify-around w-[60%] text-sm gap-x-3 pt-10 text-white'>
            <div className='w-30 h-30 rounded-full border'>
                <button onClick={() => setOpen(true)} className='cursor-pointer h-full w-full'>
                    <img
                        className="rounded-full object-cover h-full w-full"
                        src={`${user ? user.profilePhoto : null}`}
                        alt="Profile"
                    />
                </button>
            </div>
            <ProfileModel open={open} onClose={() => setOpen(false)}>
                <div className='text-center w-80 bg-gray-700 py-4 rounded'>
                    <h1>Change Profile Picture</h1>
                    <div className='flex flex-col gap-y-2 mt-2'>
                        <button className='text-sky-500 focus:bg-gray-800  py-2' onClick={() => fileUploadRef.current.click()}>Upload Picture</button>
                        <button className='text-red-500 focus:bg-gray-800  py-2'>Remove Current Picture</button>
                        <button className='focus:bg-gray-800  py-2' onClick={() => setOpen(false)}>Cancle</button>
                        <button className='focus:bg-gray-800  py-2' onClick={handleLogout}>logout</button>
                    </div>
                    <input ref={fileUploadRef} type="file" className='hidden' onChange={handleUploadProfile} />
                </div>
            </ProfileModel>
            <div className="flex flex-col justify-center gap-y-3 ">
                <div className='flex gap-4'>
                    <div>{user.username}</div>
                    <div className='flex gap-2 justify-center'>
                        <button className="rounded-md px-2 py-1 bg-gray-500 text-xs font-bold " >Edit Profile</button>
                        <button className="rounded-md px-2 py-1 bg-gray-500 text-xs font-bold " >Share Profile</button>
                        <button className="text-white text-2xl">
                            <IoIosSettings />
                        </button>
                    </div>
                </div>
                <div className='flex justify-between gap-2 mt-2'>
                    <div>
                        <p className='text-gray-400'><span className='font-bold mr-1 text-white'>{postCount}</span>Posts</p>
                    </div>
                    <div> <p className='text-gray-400'> <span className='font-bold mr-1 text-white'>115</span>Followers</p></div>
                    <div> <p className='text-gray-400'> <span className='font-bold mr-1 text-white'>105</span>Following</p></div>
                </div>
                <div className="font-bold"><p>{user.fullname}</p></div>
            </div>
        </div >

    )
}
