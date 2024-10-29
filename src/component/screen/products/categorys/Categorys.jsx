import React, { useContext, useState } from 'react'
import { TbSoupFilled } from 'react-icons/tb'
import { RiDrinksFill } from 'react-icons/ri'
import { LuIceCream2 } from 'react-icons/lu'
import { FaHamburger} from 'react-icons/fa'
import { UserContext } from '../../../context/UserProvider'


const Categorys = () => {
     // buttons
  const categorys = [
    {
      id: 0,
      name: "Main courses",
      icon: <FaHamburger />
    },
    {
      id: 1,
      name: "side dishes",
      icon: <TbSoupFilled />,
    },
    {
      id: 2,
      name: "Drinks",
      icon: <RiDrinksFill />,
    },
    {
      id: 3,
      name: "other",
      icon: <LuIceCream2 />,
    },
  ]

  // context
  const { setActiveCategory } = useContext(UserContext)

  // black nav in buttons  
  const [activeButton, setActiveButton] = useState(0);
  
  
  // change category
  const handleCategoryChange = (category, index) => {
    setActiveCategory(category);
    setActiveButton(index);
  };
  return (
    <div className='flex grow items-center justify-between'>
        {categorys.map((item, index) => (
          <button className='flex h-16 items-center justify-center gap-5 font-bold relative hover:opacity-75 duration-100' key={item.id}  onClick={() => handleCategoryChange(item.name, index)}>
            {item.name}
            {item.icon}
            {activeButton === index &&
              <div className='w-full h-1 rounded-full bg-secondary absolute bottom-0' style={{backgroundColor: 'black'}} />
            }
          </button>
        ))
        }
    </div>
  )
}

export default Categorys