import { Grid } from "@mui/material";
import React, { useState } from "react";
import Filter from "../../../components/filter/Filter";
import ProductItem from "../../../components/product-item/ProductItem";
import "./Men.css";

const Men = () => {
  const [products, setProducts] = useState([]);
  return (
    <>
      <div className="flex mx-auto max-w-7xl">
        <Filter setProducts={setProducts} />
        <div className="p-3 content">
          <Grid container spacing={2}>
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <Grid item xs={4} key={product._id}>
                    <ProductItem data={product} />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Men;
