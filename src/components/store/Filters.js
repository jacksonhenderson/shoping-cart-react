import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Dispatch
import { filterCategory } from "../../redux/filterCategory/filterCategoryActions";
import { filterPrice } from "../../redux/filterPrice/filterPriceActions";
import { priceOrder } from "../../redux/filterPrice/filterPriceActions";
//Styles
import Styles from "./Filters.module.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
//Icons
import {
  Button,
  Dialog,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Filters = ({ showFilter, setShowFilters }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { productsState, filterCategoryState, filterPriceState } = state;

  const [selectCategory, setSelectCategory] = useState("ALL");
  const [price, setPrice] = useState(0);
  const [PriceOrder, setPriceOrder] = useState("");
  const [active, setActive] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setActive(true);
    if (filterPriceState.type && disable) setPrice(filterPriceState.type);
    if (filterPriceState.type && !disable) setPriceOrder(filterPriceState.type);
    if (filterCategoryState.type) setSelectCategory(filterCategoryState.type);
    if (filterPriceState.number) setPrice(filterPriceState.number);
    if (filterPriceState.layout) {
      setPriceOrder(filterPriceState.layout);
      setDisable(false);
    }
  }, [showFilter]);

  useEffect(() => {
    if (selectCategory)
      dispatch(filterCategory(selectCategory, productsState.products));
  }, [selectCategory]);

  const confirmationMenu = () => {
    setActive(false);
    if (price !== 0 && disable) {
      dispatch(filterPrice(+price, filterCategoryState.products));
    }
    if (PriceOrder.length > 0 && !disable) {
      dispatch(priceOrder(PriceOrder, filterCategoryState.products));
    }
    setShowFilters(false);
    setPrice(0);
    setSelectCategory("");
    setPriceOrder("");
  };
  const handleClose = () => {
    setShowFilters(false);
  };

  return (
    <Box>
      <Dialog
        open={showFilter}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ overflowY: "unset" }}
      >
        <Grid className={Styles.container} container>
          <Grid className={Styles.category} item xs={12}>
            <FormControl className={Styles.formControl} size="medium">
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Category"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="MENS_CLOTHING">Mens Clothing</MenuItem>
                <MenuItem value="JEWELERY">Jewelery</MenuItem>
                <MenuItem value="ELECTRONICS">Electronics</MenuItem>
                <MenuItem value="WOMENS_CLOTHING">Womens Clothing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container m="0px 7px">
            <Grid item xs={12}>
              <Box xs={12} component="div" onClick={() => setDisable(true)}>
                <Grid container>
                  <Grid item xs={12} className={Styles.price}>
                    <AttachMoneyIcon className={Styles.priceIcon} />
                    <Typography componen="span" variant="span">
                      Price
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={Styles.price}>
                    <Slider
                      disabled={!disable}
                      max={1000}
                      value={typeof price === "number" ? price : 0}
                      onChange={(e) => setPrice(e.target.value)}
                      aria-labelledby="input-slider"
                    />
                    <Input
                      disabled={!disable}
                      value={price}
                      size="small"
                      sx={{ mb: 3, mx: 1 }}
                      onChange={(e) => setPrice(e.target.value)}
                      inputProps={{
                        step: 0,
                        min: 0,
                        max: 1000,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box component="div" onClick={() => setDisable(false)}>
                <RadioGroup
                  onChange={(e) => setPriceOrder(e.target.value)}
                  className={Styles.radioGroup}
                >
                  <FormControlLabel
                    disabled={disable}
                    checked={PriceOrder === "PRICE_IS_GOING_UP"}
                    value="PRICE_IS_GOING_UP"
                    control={<Radio />}
                    label="The most"
                  />
                  <FormControlLabel
                    disabled={disable}
                    checked={PriceOrder === "PRICE_IS_GOING_DOWN"}
                    value="PRICE_IS_GOING_DOWN"
                    control={<Radio />}
                    label="The least"
                  />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} className={Styles.btn}>
            <Button
              onClick={() => confirmationMenu()}
              sx={{ m: 2 }}
              variant="contained"
            >
              OK
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
};

export default Filters;
