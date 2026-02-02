import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCity, setCurrentAddress, setCurrentState, setUserData} from '../redux/userSlice'

const useGetCity = () => {
  const dispatch = useDispatch();
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const {userdata} = useSelector((state) => state.userinfo);
  useEffect(() => {
    
      navigator.geolocation.getCurrentPosition(async (position) => {
        // console.log(position);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
         const result = await axios.get(
  `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
);
           //fetching city data 
        // console.log("City Data:", result?.data?.results[0].city);
         dispatch(setCurrentCity(result?.data?.results[0].city));
         dispatch(setCurrentState(result?.data?.results[0].state));
         dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1));
        //  console.log("Address Data:", result?.data);
          
          
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      });
   
  }, [userdata]);
};

export default useGetCity;