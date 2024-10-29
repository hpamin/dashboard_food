import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { RiDashboardHorizontalFill, RiShoppingBag2Fill } from 'react-icons/ri';
import { MdDeliveryDining } from 'react-icons/md';
import { FaHamburger } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';

const NavSide = () => {

  const location = useLocation();
  const links = [
    {
      id: 0,
      to: "/dashboard",
      title: "Dashboard",
      icon: <RiDashboardHorizontalFill size={20}/>,
    },
    {
      id: 1,
      to: "/orders",
      title: "Orders",
      icon: <RiShoppingBag2Fill size={20}/>,
    },
    {
      id: 2,
      to: "/products",
      title: "Products",
      icon: <FaHamburger size={20}/>,
    },
    {
      id: 3,
      to: "/restaurants",
      title: "Restaurants",
      icon: <FaLocationDot size={20}/>,
    },
    {
      id: 4,
      to: "/drivers",
      title: "Drivers",
      icon: <MdDeliveryDining size={20}/>,
    },
  ]
  
  const handelMMd = (item, location) => {
    console.log("location :", location);
    console.log("item :", item);
  }
  return (
    <nav className='w-72 h-[100vh] py-5 flex flex-col gap-10 justify-between pr-0'>

      <div className='flex flex-col gap-10 pl-5' style={{width:"inherit"}}>
            <p className='text-3xl font-bold text-center'>HP<span className='text-secondary'>amin</span></p>
        <div className='w-full flex items-start justify-center gap-4 flex-col '>

          {links.map((item) => (
            
            <Link to={item.to}  className='w-full flex items-center gap-3 h-12 hover:opacity-70 relative' key={item.id} onClick={() => handelMMd(item.to, location.pathname)}> 
            
              {item.icon} {item.title}
            {
              item.to === "/orders" &&
              <span className='py-1 px-3 rounded-full font-bold text-xs' style={{color: "white", background: "linear-gradient(90deg, rgba(38,195,122,1) 0%, rgba(166,222,147,1) 100%)"}}> 12 </span>
            } 
            {location.pathname === item.to &&
              <div className='w-1 h-full bg-secondary absolute right-0 rounded-full' style={{background: "linear-gradient(90deg, rgba(38,195,122,1) 0%, rgba(166,222,147,1) 100%)"}} />
            }
            
            </Link>
          ))}
        </div>
      </div>

        <div className='w-full flex flex-col items-center justify-center gap-5 pl-5'>
            <div className='w-full flex items-center justify-center flex-col gap-2'>
              <p className='text-sm'>Done for the day?</p>
              <button className='flex items-center justify-center gap-2 py-4 px-7  bg-secondary text-sm rounded-xl shadow-md duration-100 hover:opacity-90' style={{color: "white", background: "linear-gradient(90deg, rgba(38,195,122,1) 0%, rgba(166,222,147,1) 100%)"}} > <IoSend color='white' /> Send daily report </button>
            </div>
            
            <div className='w-full h-[2px] bg-bg_primary' />

            <div className='w-full flex items-center justify-between'>
              <div className='w-14'>
                <img src="https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp2_11cfcec183.webp" className='rounded-full' alt="" />
              </div>
              <p className='text-xs'>Mohammad Amin</p>
              
              <button className='hover:opacity-80'>
                <IoMdMore size={30} />
              </button>
            </div>
        </div>

    </nav>
  )
}

export default NavSide