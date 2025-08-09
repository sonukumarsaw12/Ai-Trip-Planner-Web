import React, { useEffect, useState } from "react";
import {Button} from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";


// const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({ trip }) {
    

    const[PhotoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
           console.log(resp.data.places[0].photos[1].name)

           const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[6].name);
           setPhotoUrl(PhotoUrl);

        })
    }
    return (
        <div>
            <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className="h-[300px] w-full object-cover rounded-xl mt-20 ml-40" />

            <div className="flex justify-between items-center">
                <div className="mx-40 my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location.label || "Location not available "}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🗓️ {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💸 {trip.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🫂 No. Of Traveler: {trip.userSelection?.traveler} Days</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
            
        </div>
    );
}

export default InfoSection;
