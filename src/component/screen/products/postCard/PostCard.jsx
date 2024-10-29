import React, { useContext } from 'react'
import { IoEyeSharp, IoFastFoodSharp } from 'react-icons/io5'
import { IoIosSettings } from 'react-icons/io'
import { FaLeaf } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../../../context/UserProvider'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/actions/actions'
import Swal from 'sweetalert2'

const PostCard = ({item, handelShowModal}) => {
    
  const {setShowEdit, setEditProductData} = useContext(UserContext)

  const handelShowEdit = (item) => {
    setEditProductData(item)
    setShowEdit(true)
  }

  const dispatch = useDispatch()

  const handelDelete = async () => {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            dispatch(deleteProduct(item.id))
        }
        });
    }
  
  return (
    <div className='w-56 h-[16rem] rounded-xl shadow-md flex items-center flex-col px-5 py-2 pb-4 justify-between relative' style={{backgroundColor: 'white'}} key={item.id}>
      
      {item.photo !== "null" ? 
          <div className='w-24 h-20 flex justify-center items-center'>
            <img src={item.photo} alt="" className='w-full h-full mix-blend-multiply object-contain'/>
          </div>
          :
          <div className='w-24 h-20 flex justify-center items-center'>
            <IoFastFoodSharp size={40} />
          </div>
      }
      {item.vegan === 'true' &&
        <div className='absolute right-4 top-3'>
          <FaLeaf color='green' size={17} /> 
        </div>
      }
      
      <div className='w-full flex items-center justify-center flex-col gap-1'>
        <p className='font-bold capitalize'> {item.name} </p>
        <p className='font-mono' style={{color:'gray'}}> {item.weight}g </p>
        <p className='text-xs text-center'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
      </div>
      <div className='w-full flex justify-between items-center'>
        <p className='font-mono text-lg'> ${item.price} </p>
        <div className='flex gap-2'>
          <button className='text-xl rounded-md p-[0.35rem] shadow-md hover:opacity-65 duration-100' style={{backgroundColor: '#E74C3C', color: 'white'}} onClick={() => handelDelete(item)}>
            <MdDelete />
          </button>
          <button className='text-xl rounded-md p-[0.35rem] shadow-md hover:opacity-65 duration-100' onClick={() => handelShowModal(item)}>
            <IoEyeSharp/> 
          </button>
          <button className='text-xl rounded-md p-[0.35rem] shadow-md hover:opacity-65 duration-100' onClick={() => handelShowEdit(item)}>
            <IoIosSettings/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard