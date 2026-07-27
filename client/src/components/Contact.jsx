import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                if (data.success===false){
                    return;
                }
                setLandlord(data);
            }catch (err){
                console.log(err)
            }
        }
        fetchLandlord();
    }, [listing.userRef]);
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact
                        <span>{landlord.username}</span>
                        <span>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea name="message" id="message" rows="2" value={message} onChange={handleChange} placeholder="Enter your message here..." className='w-full p-3 border rounded-lg '>
                    </textarea>
                    <Link to={`mailto:${landlord.email}?Subject=Regarding ${listing.name}&body=${message}`}
                          className='bg-slate-700 uppercase text-white p-3 hover:opacity-95 rounded-lg text-center'
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    )
}
export default Contact
