import { 
    FETCH_PRODUCTS_FAILURE, 
    FETCH_PRODUCTS_REQUEST, 
    FETCH_PRODUCTS_SUCCESS, 
    EDIT_PRODUCT_REQUEST, 
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_FAILURE, 
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    SET_SEARCH_QUERY,
    CREATE_PRODUCT_REQUEST
} from "../actions/actions";

const initialState = {
    items: [],  
    loading: false,
    error: null,
    searchQuery: ''
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // get data
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null,
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        // create product
        case CREATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload], 
                loading: false,
            }
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        // edit product
        case EDIT_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map(item => 
                    item.id === action.payload.id ? action.payload : item
                ),
                error: null,
            }
        case EDIT_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        // Delete Product
        case DELETE_PRODUCT_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                items: state.items.filter((item) => item.id !== action.payload)
            }
        case DELETE_PRODUCT_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        // search
        case SET_SEARCH_QUERY:
            return{
                ...state,
                searchQuery: action.payload,
            }

        default:
            return state;
    }
};

export default productReducer;
