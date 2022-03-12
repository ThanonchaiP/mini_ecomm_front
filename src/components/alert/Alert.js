import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const dialogAlert = ({ setDialogOpen, dialogOpen, meta }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDialogOpen(false);
  };
  return (
    <>
      <Snackbar open={dialogOpen} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={handleClose}>
        <Alert onClose={handleClose} severity={meta.type} sx={{ width: "100%" }}>
          {meta.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default dialogAlert;
