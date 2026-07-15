import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteUserFailure,
    deleteUserStart, deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess
} from "../store/slices/userSlice.js";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {currentUser, error , loading} = useSelector(state=>state.user)
    const fileRef = useRef(null);
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        console.log(e.target.id, e.target.value)
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false){
                dispatch(updateUserFailure(data.message))
                return;
            }
            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true);
        }catch (err){
            dispatch(updateUserFailure(err.message))
        }
    }
    
    const handleDelete = async () => {
      try{
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/${currentUser._id}`, {
              method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false){
              dispatch(deleteUserFailure(data.message))
              return;
            }
           dispatch(deleteUserSuccess())
            navigate("/sign-in")
      }catch (err){
            dispatch(deleteUserFailure(err.message))
      }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type='file' hidden ref={fileRef}/>
                <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "/>
                <input onChange={handleChange} className="border bg-gray-200 p-3 rounded-lg"  type="text" id="username" placeholder="usernmae"/>
                <input onChange={handleChange} className="border p-3 rounded-lg bg-gray-200" type="text" id="email" placeholder="email"/>
                <input onChange={handleChange} className="border p-3 rounded-lg bg-gray-200" type="password" id="password" placeholder="password"/>
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-slate-600 disabled:opacity-95">{loading?"Loading...":"Update"}</button>
            </form>
            <div className="flex justify-between mt-3">
                <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
            <p className="text-red-700 mt-5">{error ?error :""}</p>
            <p className="text-green-700 mt-5">{updateSuccess?"User is updated Successfully!":""}</p>
        </div>
    )
}
export default Profile
