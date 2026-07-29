import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import ListingCard from "../components/ListingCard.jsx";

const Search = () => {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        offer: false,
        furnished: false,
        sort: 'createdAt',
        order: 'desc'
    })
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    console.log(sideBarData);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm') ;
        const type = urlParams.get('type');
        const parking = urlParams.get('parking');
        const offer = urlParams.get('offer')
        const furnished = urlParams.get('furnished') ;
        const sort = urlParams.get('sort') ;
        const order = urlParams.get('order');

        if (searchTerm || type || parking || offer || furnished || sort || order) {
            setSideBarData({
                searchTerm: searchTerm || '',
                type: type || 'all',
                parking: parking === 'true',
                offer: offer === 'true',
                furnished: furnished === 'true',
                sort: sort || 'createdAt',
                order: order || 'desc'
            });
        }

        const fetchListings = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const response = await fetch(`/api/listing/?${searchQuery}`);
                const data = await response.json();
                setListings(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setLoading(false);
            }
        }
        fetchListings();
    }, [location.search]);
    const handleChange = (e)=>{
        if (e.target.id === 'all'||e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarData({...sideBarData, type: e.target.id})
        }
        if (e.target.id === 'searchTerm') {
            setSideBarData({...sideBarData, searchTerm: e.target.value})
        }
        if (e.target.id==='parking'|| e.target.id==='offer'|| e.target.id==='furnished') {
            setSideBarData({...sideBarData, [e.target.id]:
                    !!(e.target.checked || e.target.checked === 'true')
            })
        }
        if (e.target.id==='sort_order') {
            const sort = e.target.value.split('_')[0]||'created_at';
            const order = e.target.value.split('_')[1]||'desc';

            setSideBarData({...sideBarData, sort, order})
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term: </label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className="border rounded-lg p-3 w-full "
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <label className='font-semibold'>Type:</label>
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={sideBarData.type==='all'}
                                type='checkbox' id='all' className="w-5"/>
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sideBarData.type==='rent'} type='checkbox' id='rent' className="w-5"/>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sideBarData.type==='sale'} type='checkbox' id='sale' className="w-5"/>
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sideBarData.offer===true} type='checkbox' id='offer' className="w-5"/>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <label className='font-semibold'>Amenities:</label>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sideBarData.parking===true} type='checkbox' id='parking' className="w-5"/>
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input  onChange={handleChange} checked={sideBarData.furnished} type='checkbox' id='furnished' className="w-5"/>
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select onChange={handleChange} defaultValue={'createdAt_desc'} id='sort_order' className='border p-3 rounded-lg'>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
                <div className="flex flex-wrap gap-4">
                    {!loading && listings.length===0 && <p className='text-xl text-slate-700'>No listings found</p>}
                    {loading && <p className='text-xl text-slate-700 w-full text-center'>Loading...</p>}
                    {
                        !loading && listings?.map((listing)=>(
                            <ListingCard key={listing._id} listing={listing}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Search
