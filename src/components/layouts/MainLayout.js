// import { Grid } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <div className="container bg-pink-200">
      <div className="grid grid-cols-2">
        {children}
        <h1>Main</h1>
      </div>
    </div>
  );
};

export default MainLayout;
