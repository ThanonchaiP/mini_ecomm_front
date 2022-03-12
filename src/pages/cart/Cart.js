import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_API_URL } from "../../constant/index";
import { removeAllCart, adjustQty } from "../../redux/actions/shoppingAction";
import numeral from "numeral";
import Grid from "@mui/material/Grid";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Alert from "../../components/alert/Alert";
import { useState } from "react";
import { logOut, removeItem } from "../../redux/actions/shoppingAction";

const Cart = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authReducer.profile);
  const cart = useSelector((state) => state.shoppingReducer.cart);
  const total = useSelector((state) => state.shoppingReducer.total);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMeta, setDialogMeta] = useState({ type: "", msg: "" });

  const updateQty = (data, type) => {
    let product = {
      customerId: profile._id,
      productId: data.Product._id,
      size: data.size,
      amount: data.amount,
      price: data.Product.price,
      totalQty: total.amount,
      totalPrice: total.price,
    };
    dispatch(adjustQty(product, cart, type));
  };

  const checkout = async () => {
    if (cart.length > 0) {
      try {
        const resp = await axios.post(`${BASE_API_URL}/order/checkout/${profile._id}`, {
          product: cart,
          total: {
            totalQty: total.amount,
            totalPrice: total.price,
          },
        });
        dispatch(logOut());
        setDialogMeta({ type: "success", msg: resp.data.data });
      } catch (error) {
        setDialogMeta({ type: "error", msg: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง" });
      } finally {
        setDialogOpen(true);
      }
    }
  };

  const deleteItem = (p) => {
    let product = {
      customerId: profile._id,
      productId: p.Product._id,
      size: p.size,
    };
    dispatch(removeItem(product, cart));
  };

  const Checkout = () => {
    return (
      <Grid item xs={3} className="px-3 py-4 text-white bg-black rounded-lg shadow-xl md:px-6 h-450">
        <h1 className="mb-5 text-2xl font-bold text-glow">Order Summary</h1>
        <div className="flex justify-between font-bold text-glow">
          <p>ITEMS {total?.amount}</p>
          <p>฿{numeral(total?.price).format("0,0.00")}</p>
        </div>
        <h1 className="mt-4 mb-2 font-bold">SHIPPING</h1>
        <Select value={40} className="w-full bg-gray-200" displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={40}>Standard Delivery - ฿40.00</MenuItem>
        </Select>
        <h1 className="mt-3 mb-2 font-bold">CODE</h1>
        <input className="w-full px-5 py-3 text-black bg-gray-200 focus:outline-none" type="text" placeholder="Enter your code" />
        <div className="flex justify-between my-5 font-bold text-glow ">
          <p>TOTAL COST</p>
          <p>฿{numeral(total?.price + 40).format("0,0.00")}</p>
        </div>
        <button className="w-full py-3 mt-6 font-bold uppercase bg-green-500 rounded-md text-grow" onClick={() => checkout()}>
          checkout
        </button>
      </Grid>
    );
  };

  return (
    <div className="py-6 sm:px-2">
      <Grid container className="mx-auto overflow-hidden bg-white rounded-lg shadow-xl max-w-7xl">
        <Grid item xs={9} className="px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cart</h1>
            <button className="px-4 py-1 text-white bg-red-600 rounded-md" onClick={() => cart && dispatch(removeAllCart(profile._id))}>
              ลบสินค้าที้งหมด
            </button>
          </div>
          <span className="block w-20 h-1.5 bg-black"></span>
          {cart &&
            cart.map((c, idx) => (
              <Grid container key={idx} className="my-4 border-b-2 border-gray-500">
                <img className="mr-3" src={c.Product.photo} width="100" height="100" alt="" />
                <Grid item xs={4}>
                  <h1>{c.Product.name}</h1>
                  <p className="text-sm text-gray-400">size : {c.size}</p>
                </Grid>
                <Grid item xs={3}>
                  <div className="flex items-center">
                    <h1 className="mr-3 font-semibold">QTY</h1>
                    <i className="text-xl text-black cursor-pointer fas fa-minus-square" onClick={() => c.amount > 1 && updateQty(c, "decrement")}></i>
                    <h1 className="w-12 font-semibold text-center text-red-500">{c.amount}</h1>
                    <i className="text-xl text-black cursor-pointer fas fa-plus-square" onClick={() => updateQty(c, "increment")}></i>
                  </div>
                </Grid>
                <Grid item xs={2} className="pl-5">
                  ฿{numeral(c?.price).format("0,0.00")}
                </Grid>
                <i className="ml-4 text-xl text-red-400 cursor-pointer fas fa-trash-alt" onClick={() => deleteItem(c)}></i>
              </Grid>
            ))}
        </Grid>
        <Checkout />
      </Grid>
      {dialogOpen && <Alert setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} meta={dialogMeta} />}
    </div>
  );
};

export default Cart;
