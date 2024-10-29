import React, { useContext, useEffect, useState } from 'react'
import { IoIosAdd, IoMdMore } from 'react-icons/io'
import { UserContext } from '../../context/UserProvider'
import CreateProduct from './createProduct/CreateProduct'
import Categorys from './categorys/Categorys'
import PostCard from './postCard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import loadingImg from '../../../img/loading.gif'
import { fetchProducts } from '../../redux/actions/actions'

import { useNavigate } from 'react-router-dom'
import ModalProduct from './ModalProduct/ModalProduct'
import EditProduct from './editProduct/EditProduct'
import SearchProduct from './search/SearchProduct'

const Products = () => {
  


  const navigate = useNavigate(); 
  

  // Context
  const {setShowNewProduct, handelShowModal, showModal, setShowModal, activeCategory} = useContext(UserContext)

  // Redux
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  

  const handelHideModal = () => {
    setShowModal(false)
    navigate('', { replace: true });
  }
  

  const filterProduct = items.filter((product) => product.category === activeCategory)
  return (
    <div className='w-full min-h-[100vh] bg-bg_primary py-5 px-7 flex flex-col gap-6 relative overflow-hidden'>

      {loading &&
        <div className='w-full h-full absolute top-0 right-0 z-10' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className='w-full h-full flex items-center justify-center'>
            <img src={loadingImg} alt="loading" className='mix-blend-multiply' />
          </div>
        </div>
      }


      <SearchProduct />

      <div className='w-full h-full'>
        <div className='w-full h-16 rounded-lg flex items-center justify-between px-10 py-5 shadow-md sticky z-10' style={{backgroundColor: 'white'}}>
          {/* categorys */}
          <Categorys />

          <div className='flex-1 flex items-center justify-end'>
            <button className='hover:opacity-65 duration-100'>
              <IoMdMore size={25} />
            </button>
          </div>

        </div>

        <div className='w-fit h-[78vh] py-2 flex flex-wrap gap-3 items-start justify-between overflow-auto'>
          {filterProduct?.map((item) => (
            <>
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            <PostCard item={item} handelShowModal={handelShowModal} key={item.id} />
            </>
          ))}

          {/* <ProductModal /> */}

          {showModal &&
            <ModalProduct handelHideModal={handelHideModal} />
          }

          <button className='w-56 h-[16rem] rounded-xl flex items-center flex-col justify-center border border-dashed decoration-dashed' onClick={() => setShowNewProduct(true)}>
            <IoIosAdd size={30} />
            <p className='capitalize font-bold text-lg'> add new product </p>
          </button>

        </div>
          {/* Create Product */}
          <CreateProduct />


          {/* Edit */}
          <EditProduct />

      </div>

    </div>
  )
}

export default Products