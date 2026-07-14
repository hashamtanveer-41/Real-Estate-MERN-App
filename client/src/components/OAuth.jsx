import React from 'react'
import {app} from "../../firebase.jsx";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {signInSuccess} from "../store/slices/userSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const  handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: result.user.email, username: result.user.displayName, photo: result.user.photoURL}),
            });
            console.log(res)
            const data =  await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
            } catch (err){
            console.log("Could not authorize with Google", err)
        }
    }
    return (
        <button
            className="bg-red-700 text-white p-3 rounded-lg uppercase cursor-pointer hover:bg-red-600"
            type='button'
            onClick={handleGoogleClick}
        >
            Continue with Google
        </button>
    )
}
export default OAuth
