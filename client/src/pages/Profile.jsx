import React, {useRef} from 'react'
import {useSelector} from "react-redux";

const Profile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const fileRef = useRef(null);
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className="flex flex-col gap-2">
                <input type='file' hidden ref={fileRef}/>
                <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "/>
                <input className="border bg-gray-200 p-3 rounded-lg" type="text" id="username" placeholder="usernmae"/>
                <input className="border p-3 rounded-lg bg-gray-200" type="text" id="email" placeholder="email"/>
                <input className="border p-3 rounded-lg bg-gray-200" type="text" id="password" placeholder="password"/>
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-slate-600 disabled:opacity-95">Update</button>
            </form>
            <div className="flex justify-between mt-3">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    )
}
export default Profile
