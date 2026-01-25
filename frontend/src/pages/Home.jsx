import React from 'react'
import { useSelector } from 'react-redux';
import UserDashBoard from '../components/UserDashBoard';
import DeliveryBoyDashBoard from '../components/DeliveryBoyDashBoard';
import AdminDashBoard from '../components/AdminDashBoard';

const Home = () => {
  const {userdata} = useSelector((state) => state.userinfo);
  // console.log(userdata);
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6] '>
      {userdata?.role == "user" && <UserDashBoard/>}
      {userdata?.role == "admin" && <AdminDashBoard/>}
      {userdata?.role == "deliveryboy" && <DeliveryBoyDashBoard/>} 
    </div>
  )
}

export default Home;