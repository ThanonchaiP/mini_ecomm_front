import axios from "axios";
import { BASE_API_URL } from "../../../constant/index";
import { useParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import numeral from "numeral";
import Size from "../../../components/size/SizeOption";
//redux
import { addToCart } from "../../../redux/actions/shoppingAction";
import { useSelector, useDispatch } from "react-redux";

const Alert = lazy(() => import("../../../components/alert/Alert"));

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authReducer.profile);
  const cart = useSelector((state) => state.shoppingReducer.cart);
  const [product, setProduct] = useState();
  const [size, setSize] = useState(null);
  const [currentQty, setCurrentQty] = useState(null);
  const [amount, setAmount] = useState(1);

  //Alert
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMeta, setDialogMeta] = useState({ type: "", msg: "" });

  const getProduct = async () => {
    const resp = await axios.get(`${BASE_API_URL}/product/${id}`);
    setProduct(resp.data.data);
  };

  const addCart = async (p) => {
    try {
      const productItem = {
        Product: {
          ...p,
        },
        size: size,
        amount: amount,
        price: p.price * amount,
      };
      await dispatch(addToCart(productItem, cart, profile._id));
      setDialogMeta({ type: "success", msg: "เพิ่มลงในตะกล้าสำเร็จ" });
    } catch (error) {
      setDialogMeta({ type: "error", msg: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง" });
    } finally {
      setDialogOpen(true);
    }
  };

  const buyNow = async () => {
    alert("buyNow");
  };

  const increment = () => {
    if (amount + 1 <= currentQty) setAmount(amount + 1);
  };

  const decrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {product && (
        <div className="px-2 py-2 mx-auto max-w-7xl">
          <span className="block w-20 h-1.5 bg-red-500"></span>
          <h1 className="mt-2 mb-4 text-2xl font-bold">{product.product.name}</h1>
          {/* content */}
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <img className="" src={product.product.image} alt="" />
            </Grid>
            <Grid item xs={6} className="pr-3 text-lg">
              <h1 className="text-2xl font-semibold">{product.product.name}</h1>
              <h1 className="mt-1 font-semibold text-blue-700">฿{numeral(product.product.price).format("0,0.00")}</h1>
              <p className="mt-4">{product.product.description}</p>
              <Size size={product.size_option} setSize={setSize} selected={size} setCurrentQty={setCurrentQty} />
              {currentQty && <p className="mt-2 text-sm text-gray-500">มีสินค้าทั้งหมด {currentQty} ชิ้น</p>}
              <div className="flex items-center mt-6">
                <h1 className="mr-3 font-semibold">QTY</h1>
                <i className="text-4xl text-black cursor-pointer fas fa-minus-square" onClick={decrement}></i>
                <h1 className="w-12 font-semibold text-center">{amount}</h1>
                <i className="text-4xl text-black cursor-pointer fas fa-plus-square" onClick={increment}></i>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  disabled={!size}
                  onClick={() => addCart(product.product)}
                  className="w-1/2 py-2 font-bold transition border-2 border-black hover:bg-black hover:text-white"
                >
                  ADD TO CART
                </button>
                <button
                  disabled={!size}
                  onClick={buyNow}
                  className="w-1/2 font-bold text-white transition bg-red-700 text-glow hover:bg-red-900 hover:text-white"
                >
                  BUY NOW
                </button>
              </div>
            </Grid>
          </Grid>
          {dialogOpen && <Alert setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} meta={dialogMeta} />}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
