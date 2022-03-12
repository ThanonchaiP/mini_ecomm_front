import axios from "axios";
import { BASE_API_URL } from "../../constant/index";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ALL_CART = "REMOVE_ALL_CART";
export const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";
export const ADJUST_QTY = "ADJUST_QTY";
export const LOG_OUT = "LOG_OUT";

export const addToCart = (product = {}, cart = [], cusId) => {
  let exists = false;
  if (cart.length > 0) {
    for (const c of cart) {
      if (c.Product._id === product.Product._id && c.size === product.size) {
        c.amount += product.amount;
        c.price += product.price;
        exists = true;
      }
    }
  }
  if (!exists) {
    cart.push(product);
  }

  const { totalQty, totalPrice } = cart.reduce(
    (total, product) => {
      total.totalQty += product.amount;
      total.totalPrice += product.price;

      return total;
    },
    { totalQty: 0, totalPrice: 0 }
  );

  return async (dispatch) => {
    const resp = await axios.post(`${BASE_API_URL}/product/cart/add/${cusId}`, {
      product: product.Product._id,
      amount: product.amount,
      price: product.price,
      size: product.size,
    });
    dispatch({
      type: ADD_TO_CART,
      payload: {
        cart: cart,
        total: {
          amount: totalQty,
          price: totalPrice,
        },
        message: resp.data?.data,
      },
    });
  };
};

export const loadCurrentItem = (id) => {
  return async (dispatch) => {
    const resp = await axios.get(`${BASE_API_URL}/customer/cart/${id}`);
    dispatch({
      type: LOAD_CURRENT_ITEM,
      payload: {
        cart: resp.data.data,
        total: resp.data.meta[0],
      },
    });
  };
};

export const removeAllCart = (id) => {
  return async (dispatch) => {
    const resp = await axios.delete(`${BASE_API_URL}/product/cart/${id}`);
    dispatch({
      type: REMOVE_ALL_CART,
      payload: {
        cart: [],
        total: {},
        message: resp.data.message,
      },
    });
  };
};

export const removeItem = (product = {}, cart = []) => {
  return async (dispatch) => {
    const resp = await axios.delete(`${BASE_API_URL}/customer/cart/${product.customerId}`, {
      data: {
        product: product.productId,
        size: product.size,
      },
    });
    const newCart = cart.filter((c) => {
      return c.size !== product.size && c.Product._id === product.productId;
    });

    const { totalQty, totalPrice } = newCart.reduce(
      (total, product) => {
        total.totalQty += product.amount;
        total.totalPrice += product.price;

        return total;
      },
      { totalQty: 0, totalPrice: 0 }
    );
    dispatch({
      type: REMOVE_ALL_CART,
      payload: {
        cart: newCart,
        total: {
          amount: totalQty,
          price: totalPrice,
        },
        message: resp.data.message,
      },
    });
  };
};

export const adjustQty = (product = {}, cart = [], type = "") => {
  return async (dispatch) => {
    let totalQty = product.totalQty;
    let totalPrice = product.totalPrice;

    for (const c of cart) {
      if (c.Product._id === product.productId && c.size === product.size) {
        if (type === "increment") {
          c.amount++;
          c.price += product.price;
          totalQty++;
          totalPrice += product.price;
        } else {
          c.amount--;
          c.price -= product.price;
          totalQty--;
          totalPrice -= product.price;
        }
        break;
      }
    }

    const resp = await axios.put(`${BASE_API_URL}/customer/cart/${product.customerId}`, {
      product: product.productId,
      size: product.size,
      amount: type === "increment" ? product.amount + 1 : product.amount - 1,
      price: type === "increment" ? (product.amount + 1) * product.price : (product.amount - 1) * product.price,
    });

    dispatch({
      type: ADJUST_QTY,
      payload: {
        cart: cart,
        total: {
          amount: totalQty,
          price: totalPrice,
        },
        message: resp.data.data,
      },
    });
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({
      type: LOG_OUT,
      payload: {
        cart: [],
        total: {},
      },
    });
  };
};
