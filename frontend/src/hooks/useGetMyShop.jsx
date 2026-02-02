import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setMyShopData } from '../redux/adminSlice'

const useGetMyShop = () => {
  const dispatch = useDispatch();
 useEffect(() => {
  const fetchCurrentUser = async () =>{
    try {
       const result = await axios.get(`${serverUrl}/api/shop/get-my-shop`, { withCredentials: true })
        dispatch(setMyShopData(result.data));
        // console.log( "My Shop Data:", result.data);
    } catch (error) {
      dispatch(setMyShopData(null));
    }   
  }
  fetchCurrentUser();
 }, [])
}

export default useGetMyShop;