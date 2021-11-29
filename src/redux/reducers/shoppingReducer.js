import { ADD_TO_CART, REMOVE_ALL_CART, LOAD_CURRENT_ITEM, LOG_OUT, ADJUST_QTY, REMOVE_ITEM } from "../actions/shoppingAction";

const initState = {
  cart: [],
  total: 0,
};

const shoppingReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case LOAD_CURRENT_ITEM:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case ADJUST_QTY:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case REMOVE_ALL_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case LOG_OUT:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default shoppingReducer;
