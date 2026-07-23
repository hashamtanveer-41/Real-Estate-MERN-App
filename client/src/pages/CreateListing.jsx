import React, {useState} from 'react'

const CreateListing = () => {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({ imageUrls: [] });
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            try {
                const urls = await Promise.all(promises);
                console.log("Uploaded URLs:", urls);
                setFormData((prev) => ({
                    ...prev,
                    imageUrls: prev.imageUrls.concat(urls),
                }));
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Image upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        }
        else {
            alert("Please select between 1 and 6 images.");
        }
    };
    const storeImage = async (file) => {
        return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    resolve(data.url);
                } else {
                    reject(data.message || "Failed to upload image");
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const handleRemoveImage = (index)=>{
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1 gap-4 ">
                    <input type='text' placeholder="Name" className="border p-3 rounded-lg" id='name' max='62' minLength='10' required/>
                    <textarea placeholder="Description" className="border p-3 rounded-lg" id='description' required/>
                    <input type='text' placeholder="Address" className="border p-3 rounded-lg" id='address' max='62' minLength='10' required/>
                    {/*CheckBoxes*/}
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type='checkbox' id='sale' className='w-5'/><span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type='checkbox' id='rent' className='w-5'/><span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type='checkbox' id='parking' className='w-5'/><span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type='checkbox' id='furnished' className='w-5'/><span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type='checkbox' id='offer' className='w-5'/><span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input type='number' id='bathrooms' max='10' min='1' required className="border border-gray-300 p-3 rounded-lg" />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type='number' id='regularPrice' max='10' min='1' required className="border border-gray-300 p-3 rounded-lg" />
                            <div className="flex items-center flex-col">
                                <p>Regular Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type='number' id='discountPrice' max='10' min='1' required className="border border-gray-300 p-3 rounded-lg" />
                            <div className="flex items-center flex-col">
                                <p>Discount Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 flex-1 ">

                    <p className="font-semibold">Images:
                        <span className="font-normal text-gray-500 ml-2">The first image will be cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full  " type='file' id='images' accept='image/*' multiple/>
                        <button type='button' disabled={uploading} onClick={handleImageUpload} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-95 ">{uploading?"Uploading...":"Upload"}</button>
                    </div>
                    {
                        formData.imageUrls.length >0 && formData.imageUrls.map((url, index) =>
                            (
                                <div className="" key={index}>
                                    <img className="w-20 h-20 object-cover rounded-lg" src={url} alt='listing image'/>
                                    <button type='button' onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75" >Delete</button>
                                </div>
                            ))
                    }
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
                </div>
            </form>
        </main>
    )
}
export default CreateListing
