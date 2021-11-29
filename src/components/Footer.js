import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer className="px-4 bg-gray-400 py-7 md:px-2">
      <Grid container className="mx-auto text-white max-w-7xl">
        <Grid item xs={6} md={3}>
          <p className="font-bold">MCSHOP</p>
          <p>About mcshop</p>
          <p>Terms &amp; Conditions</p>
          <p>Contact Us</p>
          <p>Shop Location</p>
          <p>COOKIE POLICY</p>
        </Grid>
        <Grid item xs={6} md={6}>
          <p className="font-bold">LET US HELP YOU</p>
          <p>PAYMENT</p>
          <p>SHIPPING</p>
          <p>RETURNS & REFUND</p>
          <p>FAQ</p>
          <p>SHIP TO SHOP SERVICES</p>
        </Grid>
        <Grid item xs={12} md={3} className="md:text-right">
          <p className="mt-5 font-bold md:mt-0">FOLLOW US ON</p>
          <div className="flex gap-5 mt-2 text-3xl md:justify-end">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-line"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook-square"></i>
          </div>
          <span className="inline-block w-full mt-10 bg-white md:hidden" style={{ height: "2px" }}></span>
          <p className="mt-5 font-bold text-center md:mt-3 md:text-right">JOIN THE WORLD OF MCSHOP</p>
          <div className="flex justify-center mt-3 md:justify-end">
            <input
              type="text"
              placeholder="EMAIL ADDRESS"
              className="w-3/4 px-3 placeholder-white bg-transparent border focus:outline-none focus:border-yellow-400"
            />
            <button className="px-4 py-2 bg-white">
              <i className="text-black far fa-envelope"></i>
            </button>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
