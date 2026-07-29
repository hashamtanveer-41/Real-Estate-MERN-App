import React from 'react'
import {Link} from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

const ListingCard = ({listing}) => {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-lg overflow-hidden w-full sm:w-[320px]'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0] || "https://www.themuse.com/_next/image?url=https%3A%2F%2Fcms-assets.themuse.com%2Fmedia%2Flead%2Fwhat-is-real-estate.png&w=3840&q=75"}
                     alt='listting cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in-out'
                />
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-slate-700 '>{listing.name}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700"/>
                        <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600 ">{listing.address}</p>
                    <p className="text-slate-500 mt-2 font-semibold">
                        $ {listing.offer?listing.discountPrice.toLocaleString('en-US'):listing.regularPrice.toLocaleString('en-US')}
                        {listing.type==='rent'&&'/ month'}
                    </p>
                    <div className="text-slate-700 flex gap-4">
                        <div className="font-bold text-xs">
                            {listing.bedrooms >1? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
                        </div>
                        <div className="font-bold text-xs">
                            {listing.bathrooms >1? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}
                        </div>
                    </div>
                </div>

            </Link>
        </div>
    )
}
export default ListingCard
