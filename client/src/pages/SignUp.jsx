import React, {useState} from 'react'
import {Link} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    console.log(formData)
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form action="" className="flex flex-col gap-4">
                <input type="text" className=" bg-white p-3 rounded-lg" placeholder="username" id="username" onChange={handleChange} />
                <input type="email" className=" bg-white p-3 rounded-lg" placeholder="email" id="email" onChange={handleChange}/>
                <input type="password" className="bg-white p-3 rounded-lg" placeholder="password" id="password" onChange={handleChange} />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase ">Sign Up</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/signin">
                    <span className="text-blue-700">Sign In</span>
                </Link>
            </div>
        </div>
    )
}
export default SignUp
