import axios from "axios";

// create data
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

// Get data
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Edit item
export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

// Edit item
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';


// search
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        try {
            const {data} = await axios.get('https://671d48a909103098807cbbe8.mockapi.io/hpamin');
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_PRODUCTS_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Create item
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('ingredients', JSON.stringify(productData.ingredients));
    formData.append('vegan', productData.vegan);
    formData.append('weight', productData.weight);
    formData.append('calories', productData.calories);
    formData.append('price', productData.price);
    formData.append('photo', productData.photo);
    formData.append('category', productData.category);
    console.log("createProduct formData: ", formData);
    

    try {
        const {data} = await axios.post("https://671d48a909103098807cbbe8.mockapi.io/hpamin", formData, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload: error.data,
        });
    }
};

// Edit product
export const editProduct = (id, productData) => async (dispatch) => {
  
    dispatch({ type: EDIT_PRODUCT_REQUEST });
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('ingredients', JSON.stringify(productData.ingredients));
    formData.append('vegan', productData.vegan);
    formData.append('weight', productData.weight);
    formData.append('calories', productData.calories);
    formData.append('price', productData.price);
    formData.append('photo', productData.photo);
  
    try {
        const {data} = await axios.put(`https://671d48a909103098807cbbe8.mockapi.io/hpamin/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EDIT_PRODUCT_FAILURE,
            payload: error.message,
        });
    }
};


// delete product
export const deleteProduct = (id) => async (dispatch) => {
  console.log("deleteProduct: ", id);
  
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    try {
        // ارسال درخواست حذف به API
        await axios.delete(`https://671d48a909103098807cbbe8.mockapi.io/hpamin/${id}`);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: id, // ارسال شناسه محصول به عنوان بارگذاری
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.message,
        });
    }
};


// search
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
})