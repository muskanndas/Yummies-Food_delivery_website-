import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCity} from '../redux/userSlice'

const useGetCity = () => {
  const dispatch = useDispatch();
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const {userdata} = useSelector((state) => state.userinfo);
  useEffect(() => {
    
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
         const result = await axios.get(
  `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
);
           //fetching city data 
        //  console.log("City Data:", result?.data?.results[0].city);
          dispatch(setCity(result?.data?.results[0].city));
          
          
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      });
   
  }, [userdata]);
};

export default useGetCity;