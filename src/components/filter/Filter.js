import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import queryString from "querystring";

const Filter = () => {
  const [products, setProducts] = React.useState([]);
  const [size, setSize] = React.useState([]);
  const [productType, setProductType] = React.useState([]);
  const [params, setParams] = React.useState({ type: [], size: [], sort_by: "", page: 1 });

  const onSelectSize = (sizeId) => {
    for (let i = 0; i < params.size.length; i++) {
      if (params.size[i] === sizeId) {
        params.size.splice(i, 1);
        setParams({ ...params, size: params.size });
        return;
      }
    }
    params.size.push(sizeId);
    setParams({ ...params, size: params.size });
  };

  const onSelectType = (typeId) => {
    for (let i = 0; i < params.type.length; i++) {
      if (params.type[i] === typeId) {
        params.type.splice(i, 1);
        setParams({ ...params, type: params.type });
        return;
      }
    }
    params.type.push(typeId);
    setParams({ ...params, type: params.type });
  };

  React.useEffect(() => {
    const loadProductType = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/product_type`);
      setProductType(result.data.data);
    };
    const loadSize = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/size`);
      setSize(result.data.data);
    };

    loadProductType();
    loadSize();
  }, []);

  React.useEffect(() => {
    console.log("useEF params");

    const loadProduct = async () => {
      const prms = new URLSearchParams(params);
      prms.delete("type");
      prms.delete("size");
      const result = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/product?${prms.toString()}&type=${params.type.toString()}&size=${params.size.toString()}`
      );
      console.log(result.data);
      // console.log(test);
    };

    loadProduct();
    // console.log(params);
  }, [params]);

  return (
    <div className="px-2 bg-white filter">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filter</h3>
        <button className="px-5 py-2 bg-gray-300 rounded-sm hover:bg-gray-200">Reset</button>
      </div>

      <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded={true}>
        <AccordionSummary
          sx={{ padding: 0 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={700}>Product Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <Grid container spacing={2}>
              {productType &&
                productType.map((type) => {
                  return (
                    <Grid item xs={12} md={6} xl={4} key={type._id}>
                      <FormControlLabel
                        control={<Checkbox onChange={() => onSelectType(type._id)} />}
                        label={type.name}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          sx={{ padding: 0 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={700}>Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <div className="flex flex-wrap items-center gap-2">
              {size &&
                size.map((size) => {
                  return (
                    <FormControlLabel
                      key={size._id}
                      control={<Checkbox onChange={() => onSelectSize(size._id)} />}
                      label={size.title}
                    />
                  );
                })}
            </div>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Select className="mt-3" value={10} sx={{ width: "100%" }} inputProps={{ "aria-label": "Without label" }}>
        <MenuItem value="">
          <em>Sort By</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </div>
  );
};

export default Filter;
