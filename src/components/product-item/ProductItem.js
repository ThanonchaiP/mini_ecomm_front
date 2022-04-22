import "./ProductItem.css";
import numeral from "numeral";
import { useHistory } from "react-router-dom";

const ProductItem = (props) => {
  const { data } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push(`product/${data._id}`);
  };

  const addToCart = (product) => {
    alert("ADD TO CART");
  };

  return (
    <>
      {data && (
        <div className="mx-2 product-card">
          <div className="h-full p-2">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={
                  data.image
                    ? data.image
                    : "https://www.mcshop.com/catalog/product/_/_/__regular___mssz13030_l_1__5.jpg?width=240"
                }
                alt=""
                onClick={handleClick}
              />
              <div className="size-info" onClick={() => addToCart(data)}>
                <i className="mr-1 fas fa-shopping-cart"></i>
                <h1 className="text-base">เพิ่มลงตะกร้าสินค้า</h1>
              </div>
            </div>
            <div onClick={handleClick} className="flex flex-col justify-between" style={{ minHeight: 103.4 }}>
              <div className="pt-3 max-h-16">
                <span className="product-title">{data.name}</span>
              </div>
              <span className="inline-block w-full my-2 text-2xl font-medium">
                ฿ {numeral(data.price).format("0,0.00")}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
