import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const UserContext = createContext()

const UserProvider = ({children}) => {

  const [activeCategory, setActiveCategory] = useState("Main courses");

  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editProductData, setEditProductData] = useState(null)
  // Modal Product
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)

  const navigate = useNavigate(); 

  const handelShowModal = (value) => {
    setShowModal(true)
    setModalData(value)
    navigate('#food', { replace: true });
  } 

  return (
    <UserContext.Provider value={{showNewProduct, setShowNewProduct, modalData, setModalData, showEdit, setShowEdit, editProductData, setEditProductData, handelShowModal, showModal, setShowModal, activeCategory, setActiveCategory}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserProvider, UserContext}