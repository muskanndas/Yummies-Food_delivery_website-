import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { setItemsInMyCity } from '../redux/userSlice'

const useGetItemsByCity = () => {
 const dispatch=useDispatch()
    const {currentCity}=useSelector(state=>state.userinfo)
    // console.log("Hook running with city:", currentCity);

  useEffect(()=>{
     if (!currentCity) return; 
  const fetchItems=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
            dispatch(setItemsInMyCity(result.data))
           console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}
fetchItems();
 
  },[currentCity])
}

export default useGetItemsByCity;