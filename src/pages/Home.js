import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constant/index";
import Grid from "@mui/material/Grid";
import { typeItem } from "../components/TypeItem";
import "./Home.css";
import Slick from "../components/Slick";
// import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const resp = await axios.get(`${BASE_API_URL}/product?pageSize=${10}`);
    setProducts(resp.data.data.product);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="px-2 mx-auto max-w-7xl">
        {/* Header */}
        <img className="cursor-pointer" src="https://www.levis.co.th/media/Levis/bannerslider/images/b/a/banner-21h1-bbwl-1366_430-1.jpg" alt="" />
        <div className="flex flex-col gap-2 mt-2 md:flex-row md:gap-0">
          <div className="relative flex-1 pr-1 overflow-hidden sex-img">
            <img className="w-full cursor-pointer max-h-80" src="https://www.levis.co.th/media/wysiwyg/banner_home/home-21h1-women-1.jpg" alt="" />
          </div>
          <div className="relative flex-1 pl-1 overflow-hidden sex-img">
            <img className="w-full cursor-pointer max-h-80" src="https://www.levis.co.th/media/wysiwyg/banner_home/home-21h1-men-1.jpg" alt="" />
          </div>
        </div>
        {/* interested */}
        <div className="py-6">
          <h1 className="my-10 text-2xl font-bold text-center">ช้อปสินค้าตามหมวดหมู่</h1>
          <Grid container spacing={{ sx: 0, md: 2 }} className="px-14">
            {typeItem &&
              typeItem.map((type, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <div className="p-3 cursor-pointer">
                    <img src={type.imgUrl} alt="" />
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
        {/* Best Seller */}
        <div className="flex flex-col items-center py-6 mb-4 text-center">
          <h1 className="my-10 text-2xl font-bold text-center">สินค้าขายดีประจำสัปดาห์</h1>
          <Slick products={products} />
        </div>
        {/* {products && products.map((p, idx) => <ProductItem key={idx} />)} */}
      </div>
    </>
  );
};

export default Home;
