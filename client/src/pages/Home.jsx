import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/bundle";
import {Navigation} from "swiper/modules";
import ListingCard from "../components/ListingCard.jsx";

const Home = () => {
    const [offerListings, setOfferListings] = useState([])
    const [saleListings, setSaleListings] = useState([])
    const [rentListings, setRentListings] = useState([])
    console.log(offerListings)
    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const response = await fetch('/api/listing/?offer=true&limit=4');
                const data = await response.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        }
        const fetchRentListings = async () => {
            try {
                const response = await fetch('/api/listing/?type=rent&limit=4');
                const data = await response.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        }

        const fetchSaleListings = async () => {
            try {
                const response = await fetch('/api/listing/?type=sale&limit=4');
                const data = await response.json();
                setSaleListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        }
        fetchOfferListings();
    }, []);
    return (
        <div>
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your <span className="text-slate-500">perfect</span>
                    <br/>
                    place with ease
                </h1>
                <div className="text-gray-400 text-xl sm:text-sm">
                    Hasham Estate is the best place to find your dream home.
                    <br />
                    We offer a wide range of properties to suit every budget and lifestyle.
                </div>
                <Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
                    <button>Let's get started</button>

                </Link>
            </div>
            <Swiper navigation modules={[Navigation]}>
                {
                    offerListings?.length > 0 && offerListings.map((listing) => (
                        <SwiperSlide>
                            <div key={listing._id} className="h-[500px]"
                                 style={{
                                background: `url('${listing.imageUrls[0]}') center no-repeat`,
                                backgroundSize: "cover"
                            }}></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {
                    offerListings?.length > 0 && (
                        <div>
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
                                <Link  to={"/search?offer=true"} className="text-sm text-blue-800 font-semibold hover:underline">
                                    Show more offers
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    offerListings.map((listing) => (
                                        <ListingCard key={listing._id} listing={listing}/>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    rentListings?.length > 0 && (
                        <div>
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
                                <Link  to={"/search?type=rent"} className="text-sm text-blue-800 font-semibold hover:underline">
                                    Show more places for rent
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    rentListings.map((listing) => (
                                        <ListingCard key={listing._id} listing={listing}/>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    saleListings?.length > 0 && (
                        <div>
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
                                <Link  to={"/search?type=sale"} className="text-sm text-blue-800 font-semibold hover:underline">
                                    Show more places for sale
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    saleListings.map((listing) => (
                                        <ListingCard key={listing._id} listing={listing}/>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Home
