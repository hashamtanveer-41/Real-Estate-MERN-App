import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInFailure, signInStart, signInSuccess} from "../store/slices/userSlice.js";

const SignIn = () => {
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {error, loading} = useSelector((state) => state.user);
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(signInStart())
        const res = await fetch('api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        try {
            const data =  await res.json();
            if (data.success === false){
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
            navigate("/")
        }catch (err){
            dispatch(signInFailure(err))
        }
    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
                <input type="email" className=" bg-white p-3 rounded-lg" placeholder="email" id="email" onChange={handleChange}/>
                <input type="password" className="bg-white p-3 rounded-lg" placeholder="password" id="password" onChange={handleChange} />
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase cursor-pointer">{loading?"Loading...":"Sign Up"}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't ave an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700 ">Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    )
}
export default SignIn
