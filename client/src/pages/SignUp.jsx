import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        const res = await fetch('api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        try {
            const data =  await res.json();
            setError(null)
            navigate("/sign-in")
        }catch (err){
            setError(error)
        }finally {
            setLoading(false)
        }
    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
                <input type="text" className=" bg-white p-3 rounded-lg" placeholder="username" id="username" onChange={handleChange} />
                <input type="email" className=" bg-white p-3 rounded-lg" placeholder="email" id="email" onChange={handleChange}/>
                <input type="password" className="bg-white p-3 rounded-lg" placeholder="password" id="password" onChange={handleChange} />
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase cursor-pointer">{loading?"Loading...":"Sign Up"}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/signin">
                    <span className="text-blue-700 ">Sign In</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    )
}
export default SignUp
