import React, { useContext, useMemo, useState } from 'react'
import { UserContext } from '../../../context/UserProvider';
import { TiDelete } from 'react-icons/ti'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiDollarSign } from 'react-icons/fi'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Autocomplete, TextField } from '@mui/material'
import { FaHamburger, FaLeaf } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/actions/actions';

function CreateProduct() {

  // context
  const {showNewProduct, setShowNewProduct, activeCategory} = useContext(UserContext)

  // redux
  const dispatch = useDispatch();

    const ingredientsOptions = useMemo(() => [
      { value: 'wheat_bun', label: 'Wheat bun' },
      { value: 'veggie_patty', label: 'Veggie Patty' },
      { value: 'lettuce', label: 'Lettuce' },
      { value: 'jalapeno_peppers', label: 'Jalapeno Peppers' },
  ], []);

  
  const formik = useFormik({
    initialValues: {
      name: '',
      ingredients: [],
      vegan: false,
      weight: '',
      calories: '',
      price: '',
      photo: null,
      category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      weight: Yup.number().required('Required'),
      price: Yup.number().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
    try {
     const updatedValues = {
            ...values,
            category: activeCategory,
        };
        dispatch(createProduct(updatedValues));
        resetForm(); 
        setShowNewProduct(false);
    } catch (error) {
      console.error(error);
    }},
  });
  



  const [photoPreview, setPhotoPreview] = useState(null);

const handlePhotoChange = (event) => {
  const file = event.currentTarget.files[0];
  formik.setFieldValue('photo', URL.createObjectURL(file));
  if (file) {
    setPhotoPreview(URL.createObjectURL(file));
  }
};
  return (
    <>
        {showNewProduct &&
        <div className='w-full h-[100vh] absolute top-0 right-0 z-40' style={{backgroundColor: 'rgba(0,0,0,0.4)'}} onClick={() => setShowNewProduct(false)} />
      }

      <div className={`w-96 h-[100vh] top-0 absolute px-6 py-2 z-50 duration-200 ${showNewProduct ? "right-0" : "right-[-27rem]" }`} style={{backgroundColor:'white'}}> 

        <div className='w-full flex justify-between items-center h-[5vh]'>
          <p className='text-2xl '> Add new product  </p>
          <button onClick={() => setShowNewProduct(false)}>
            <TiDelete size={25} /> 
          </button>
        </div>

          <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formik Values: ", formik.values);
                    formik.handleSubmit();
                }} className='w-full h-[92vh] flex flex-col justify-evenly'>

            <div className='flex flex-col gap-1'>
              <label className='font-bold text-sm'> Name of the product </label>
              <input type="text" name="name" className='w-full p-2 border outline-none rounded-md border-border-color hover:border-black-color'  onChange={formik.handleChange} value={formik.values.name}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='font-bold text-sm'> Ingredients </label>
                <Autocomplete
                  multiple
                  options={ingredientsOptions}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => formik.setFieldValue("ingredients", value)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      variant="outlined" 
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "black" // حذف استایل hover
                          },
                        },
                      }}
                    />
                  )}
                />
            </div>

            <div className='flex gap-2'>
                  <input type="checkbox" name="vegan" className=' scale-150 hover:border-black-color cursor-pointer' onChange={formik.handleChange}  checked={formik.values.vegan} />
              <label className='flex items-center gap-1 font-bold text-sm'>
                  <FaLeaf color='green' size={17} /> 
                  Suitable for vegans 
              </label>
            </div>


            <div className='w-full flex gap-5'>
                <div className='flex-1'>
                  <label className='font-bold text-sm'> Weight in grams </label>
                  <input 
                      type="number" 
                      name='weight' 
                      className='w-full p-2 border outline-none rounded-md border-border-color hover:border-black-color' 
                      onChange={formik.handleChange} 
                      value={formik.values.weight} 
                      min="1" max="999"
                      onInput={(e) => {
                        if (e.target.value < 1) e.target.value = 1;
                        if (e.target.value > 999) e.target.value = 999;
                      }} 
                      />

                </div>

                <div className='flex-1'>
                  <label className='font-bold text-sm'> Calories </label>
                  <input 
                    type="number" 
                    name="calories" 
                    className='w-full p-2 border outline-none rounded-md border-border-color hover:border-black-color' 
                    onChange={formik.handleChange}  
                    value={formik.values.calories} 
                    min="1" max="999"
                    onInput={(e) => {
                      if (e.target.value < 1) e.target.value = 1;
                      if (e.target.value > 999) e.target.value = 999;
                    }}
                    />
                </div>
            </div>

            <div>
              <label className='font-bold text-sm'> Price of the product </label>

              <div className='flex items-center px-2 border rounded-md border-border-color hover:border-black-color'>
                <label htmlFor="price"><FiDollarSign /> </label>
                <input 
                    type="number" 
                    name="price" 
                    id='price' 
                    className='w-full p-2 outline-none' 
                    onChange={formik.handleChange} 
                    value={formik.values.price} 
                    min="1" max="999" 
                    onInput={(e) => {
                      if (e.target.value < 1) e.target.value = 1;
                      if (e.target.value > 999) e.target.value = 999;
                    }} />
              </div>
            </div>


            <div >
                <label className='font-bold text-sm'> Upload photo </label>

                <div className='flex items-start gap-2 flex-col'>
                  <div className='flex'>
                    <label className='fileIcon' htmlFor='photo'><MdOutlineFileUpload />  </label>
                      <input type="file" name="photo" id='photo' onChange={handlePhotoChange} />
                  </div>

                  {photoPreview && 
                    <div className='w-20'>
                      <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-md" />
                    </div>
                  }
              </div>
            </div>


            <button type="submit" className='flex w-full items-center justify-center gap-4 bg-black-color py-3 rounded-lg shadow-md' style={{color: "white"}}> 
                <p className='flex '>
                    <IoIosAdd color='white' size={20} />
                    <FaHamburger color='white' size={20} />
                </p>
                Add product to the menu
            </button>
          </form>



      </div>
    </>
  )
}

export default CreateProduct