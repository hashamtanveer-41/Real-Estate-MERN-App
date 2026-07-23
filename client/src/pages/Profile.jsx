import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteUserFailure,
    deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess
} from "../store/slices/userSlice.js";
import {Link, useNavigate} from "react-router-dom";

const Profile = () => {
    const {currentUser, error , loading} = useSelector(state=>state.user)
    const fileRef = useRef(null);
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate();
    const [showErrorListings, setShowErrorListings] = useState(false)
    const [userListings, setUserListings] = useState([])
    const handleChange = (e) =>{
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

    const handleSignOut= async ()=>{
        try{
            dispatch(signOutUserStart());
            const res = await fetch(`/api/auth/signout`, {
                method: 'GET',
            });
            const data = await res.json();
            if (data.success === false){
                dispatch(deleteUserFailure(data.message))
                return;
            }
            dispatch(deleteUserSuccess())
            navigate("/sign-in")
            dispatch(signOutUserSuccess(data))
        }catch (err){
            dispatch(deleteUserFailure(err.message))
        }
    }

    const handleShowListings = async ()=>{
        try {
            setShowErrorListings(false)
            const res = await fetch(`/api/user/listings/${currentUser._id}`, {
                method: 'GET',
            });
            const data = await res.json();
            if (data.success === false){
                setShowErrorListings(true)
                return;
            }
            setUserListings(data);
        }catch (err){
            setShowErrorListings(true)
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
                <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to="/create-listing">
                    <button>Create Listing</button>
                </Link>
            </form>
            <div className="flex justify-between mt-3">
                <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete Account</span>
                <span  onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
            <p className="text-red-700 mt-5">{error ?error :""}</p>
            <p className="text-green-700 mt-5">{updateSuccess?"User is updated Successfully!":""}</p>
            <button onClick={handleShowListings} className="text-green-700 w-full" >Show Listings</button>
            <p>{showErrorListings?"Error show Listings":""}</p>
            {
                userListings && userListings.length>0 &&
                <div>
                    <h1 className="text-center mt-7 text-2xl font-semibold flex flex-col "></h1>
                {
                    userListings.map((userListing, index) => (
                        <div className="border rounded-lg p-3 flex justify-between items-center gap-4 "
                             key={userListing._id}>
                            <Link to={`/listing/${userListing._id}`}>
                                <img className="w-16 h-16 object-contain" src={userListing.imageUrls[0]}
                                     alt='listing image'/>
                            </Link>
                            <Link className="text-slate-700 font-semibold hover:underline truncate"
                                  to={`/listing/${userListing._id}`}>
                                <p>
                                    {userListing.name}
                                </p>
                            </Link>
                            <div className="flex flex-col items-center">
                                <button className="text-red-700 uppercase">Delete</button>
                                <button className="text-green-700 uppercase">Edit</button>
                            </div>
                        </div>
                    ))
                }
                </div>
            }
        </div>
    )
}
export default Profile
