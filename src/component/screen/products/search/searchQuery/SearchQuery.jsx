import React, { useContext } from 'react'
import { UserContext } from '../../../../context/UserProvider'
import { IoFastFoodSharp } from 'react-icons/io5'

const SearchQuery = ({item}) => {
    const {handelShowModal} = useContext(UserContext)

  return (
    <div className='w-full h-20 flex items-start justify-between cursor-pointer duration-200 ' onClick={() => handelShowModal(item)}>
      {item.photo !== "null" ? 
          <div className='w-16 h-full flex items-center justify-center'>
            <img src={item.photo} alt="product image" className='mix-blend-multiply w-full h-full object-contain' />
          </div>
          :
          <div className='w-16 h-full flex items-center justify-center'>
            <IoFastFoodSharp size={40} />
          </div>
      }
        <div className='w-full h-full flex items-center
         justify-between pl-5'>
          <div className='flex flex-col items-start justify-center'>
            <p className='font-bold text-nowrap'> {item.name} </p>
              {item.vegan &&
                <p className='text-sm' style={{color: 'green'}}> vegan </p>
              }
          </div>
          {JSON.parse(item.ingredients).length !== 0 &&
            <div className='w-full flex flex-col gap-2 flex-wrap'>
              <div className='w-full flex flex-wrap items-center justify-start gap-2 px-3'>
                {JSON.parse(item.ingredients).map((item) => (
                  <p className='py-1 px-2 text-nowrap bg-bg_primary rounded-full text-[0.7rem]'> {item.label} </p>
                ))}
              </div>
            </div>
          }
          <div>
            <p className=' font-bold'> ${item.price} </p>
          </div>
        </div>
    </div>
  )
}

export default SearchQuery