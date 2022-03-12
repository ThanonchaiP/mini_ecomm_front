import { useState, useEffect } from "react";
import { BASE_API_URL } from "../../constant/index";
import { typeItem } from "../../components/item-type/TypeItem";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Slick from "../../components/slick/Slick";
import home_banner from "../../assets/img/home_banr.jpg";
import "./Home.css";
import GenderBanner from "../../components/banner/gender/GenderBanner";

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
        <img className="cursor-pointer" src={home_banner} alt="banner" />
        <GenderBanner />
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
      </div>
    </>
  );
};

export default Home;
