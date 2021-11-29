import Slider from "react-slick";
import LeftArrow from "../assets/img/left-arrow.png";
import RightArrow from "../assets/img/right-arrow.png";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const StyledSlider = styled(Slider)`
  .slick-next {
    width: 4rem;
    height: 4rem;
  }
  .slick-prev {
    width: 4rem;
    height: 4rem;
    z-index: 100;
  }
`;

const Slick = ({ products }) => {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => <img src={LeftArrow} alt="prevArrow" {...props} />;

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => <img src={RightArrow} alt="nextArrow" {...props} />;

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <StyledSlider {...settings} className="w-3/4">
        {products && products.map((p) => <ProductItem key={p._id} data={p} />)}
      </StyledSlider>
    </>
  );
};

export default Slick;
