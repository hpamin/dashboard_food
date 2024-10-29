import React, { useContext } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { FaLeaf } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { UserContext } from '../../../context/UserProvider';
import { IoFastFoodSharp } from 'react-icons/io5';

const ModalProduct = ({handelHideModal}) => {


  const {modalData} = useContext(UserContext)

  return (
    <>
        <div className='w-full h-[100vh] absolute top-0 right-0 z-40' style={{backgroundColor: 'rgba(0,0,0,0.4)'}} onClick={handelHideModal} />

        <div className='w-[40rem] h-96 bg-bg_primary absolute rounded-lg right-1/4 top-1/4 shadow-md p-5 flex flex-row-reverse items-center justify-center z-50'>
          <button className='absolute top-3 right-3 z-50' onClick={handelHideModal}>
            <TiDelete className='hover:opacity-75 cursor-pointer' size={30} />
          </button>
          <div className='w-1/2 h-full flex items-center justify-center relative'>
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {modalData.photo !== "null" ? 
                    <>
                      <SwiperSlide>
                          <img src={modalData.photo} alt="" className='mix-blend-multiply w-60 mb'/>
                      </SwiperSlide>
                      <SwiperSlide>
                          <img src={modalData.photo} alt="" className='mix-blend-multiply w-60 mb'/>
                      </SwiperSlide>
                    </>
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <IoFastFoodSharp size={80} />
                    </div>
                }
              </Swiper>
              {modalData.vegan &&
              <div className='absolute top-0 left-0'>
                <FaLeaf size={30} color='green' />
              </div>
              }
          </div>
          <div className='w-1/2 h-full flex flex-col justify-between'>
            <p className='font-bold text-2xl'> {modalData.name} </p>
            <p className='text-sm'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            
            {JSON.parse(modalData.ingredients).length !== 0 &&
              <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex flex-wrap items-center justify-start gap-2'>
                  {JSON.parse(modalData.ingredients).map((item) => (
                    <p className='py-2 px-3 text-nowrap bg-border-color rounded-full text-sm'> {item.label} </p>
                  ))}
                </div>
              </div>
            }
            {modalData.vegan &&
            <div className='w-full flex gap-2 items-center'>
              <p className='text-sm text-secondary font-bold'> vegan  </p>
            </div>}
            <div className='w-full flex gap-2 items-center'>
              <p className='text-sm'> weight:  </p>
              <p className='font-bold'> {modalData.weight}g </p>
            </div>
            <div className='w-full flex gap-2 items-center'>
              <p className='text-sm'> calories:  </p>
              <p className='font-bold'> {modalData.calories} </p>
            </div>
            
            <button className='w-full bg-secondary py-2 rounded-lg shadow-md capitalize' style={{color: 'white'}}>
              ${modalData.price} add to cart
            </button>
          </div>
        </div>
    </>
  )
}

export default ModalProduct