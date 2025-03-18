import react, { useEffect, useState } from 'react'
import ProfileModal from '../../profileComponents/ProfileModel';
import ProfileButtons from '../../profileComponents/ProfileButtons';
import axios from "axios"

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
        axios.get(`http://localhost:8080/api/getUserById/${userId}`, { withCredentials: true })
            .then((response) => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    fullname: response.data.fullname,
                    profilePhoto: `data:image/jpeg;base64,${response.data.profilePicture}`
                });
                getPostCount(response.data.id);
            })
            .then((error) => {
                console.error(error);
            })
    }, [])
    const getPostCount = (id) => {
        axios.get(`http://localhost:8080/api/getPostCount/${id}`, { withCredentials: true })
            .then((response) => setPostCount(response.data))
            .catch(error => console.error);
    }
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
            <ProfileModal open={open} onClose={() => setOpen(false)}>
                <div className='text-center w-80 bg-gray-700 py-4 rounded'>
                    <h1>Change Profile Picture</h1>
                    <div className='flex flex-col gap-y-2 mt-2'>
                        <button className='text-red-500 focus:bg-gray-800  py-2'>Remove Current Picture</button>
                        <button className='focus:bg-gray-800  py-2' onClick={() => setOpen(false)}>Cancle</button>
                    </div>
                </div>
            </ProfileModal>
            <div className="flex flex-col justify-center gap-y-3 ">
                <div className='flex gap-4'>
                    <div>{user.username}</div>
                    <div className='flex gap-2 justify-center'>
                        <ProfileButtons backgroundColor="bg-blue-500" onClick={() => console.log('hello')} label={"Follow"}></ProfileButtons>
                        <ProfileButtons backgroundColor="bg-gray-800" onClick={() => console.log('hellp')} label={"Message"}></ProfileButtons>

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