import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link, useLocation, useNavigate } from "react-router-dom";
// dispatch
import { fetchUserData } from "../../redux/userData/userDataAction";
// functions
import { getCookie } from "../../functions/getCookie";
//Create id uniq
import { v4 } from "uuid";
import Styles from "./nav.module.css";
//mui
import Tab from "@mui/material/Tab";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  SwipeableDrawer,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
//Icon
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InfoIcon from "@mui/icons-material/Info";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";

const Nav = () => {
  //Dispatch data user
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userDataState);
  //Number Product Cart
  const { itemsCounter } = useSelector((state) => state.cartState);
  const { pathname } = useLocation();
  //value tab
  const [value, setValue] = useState("/home");
  //Show sidebar
  const [side, setSide] = React.useState(false);
  //Show Modal Logout
  const [logout, setLogout] = React.useState(false);
  //cheked Login
  useEffect(() => {
    if (!Object.keys(state.data).length && getCookie("token"))
      dispatch(fetchUserData(getCookie("token")));
  }, []);
  //Update Value Tab
  const navigate = useNavigate();
  useEffect(() => {
    setValue(pathname);
  }, [pathname]);
  //Sidabar handler
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSide(open);
  };
  //Change Route
  const handleChange = (event, newValue) => {
    if (newValue === "logout") {
      setLogout(true);
    } else {
      navigate(newValue);
    }
  };
  //Logout Handler
  const logoutHandler = () => {
    document.cookie = "token = none ;max-age=0";
    window.location.reload();
  };
  //Options menu
  const options = [
    getCookie("token")
      ? {
          to: "/profile",
          icon: (
            <img
              src={state.data.image}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ),
          lable: "",
        }
      : null,
    {
      to: "/home",
      icon: <HomeIcon className={Styles.iconAppBar} />,
      lable: "Home",
    },
    {
      to: "/store",
      icon: <StoreIcon className={Styles.iconAppBar} />,
      lable: "Store",
    },
    {
      to: "/cart",
      icon: (
        <Badge badgeContent={itemsCounter} color="secondary">
          <ShoppingCartCheckoutIcon className={Styles.iconAppBar} />
        </Badge>
      ),
      lable: "Cart",
    },
    {
      to: "/orders",
      icon: <ListAltIcon className={Styles.iconAppBar} />,
      lable: "Orders",
    },
    {
      to: "/saved",
      icon: <BookmarkBorderIcon className={Styles.iconAppBar} />,
      lable: "Saved",
    },
    {
      to: "/aboutUs",
      icon: <InfoIcon className={Styles.iconAppBar} />,
      lable: "AboutUs",
    },
    {
      to: "/contactUs",
      icon: <ConnectWithoutContactIcon className={Styles.iconAppBar} />,
      lable: "Contact Us",
    },
    {
      to: getCookie("token") ? "logout" : "/login",
      icon: getCookie("token") ? (
        <ExitToAppIcon className={Styles.iconAppBar} />
      ) : (
        <LogoutIcon className={Styles.iconAppBar} />
      ),
      lable: getCookie("token") ? "Logout" : "Login",
    },
  ];

  //Options Responsive
  const optionsResponsive = [
    {
      to: "/cart",
      icon: (
        <Badge badgeContent={itemsCounter} color="secondary">
          <ShoppingCartCheckoutIcon sx={{ width: { xs: "20px" } }} />
        </Badge>
      ),
      lable: "Cart",
    },
    {
      to: "/store",
      icon: <StoreIcon ssx={{ width: { xs: "10px" } }} />,
      lable: "Store",
    },
    {
      to: "/home",
      icon: <HomeIcon ssx={{ width: { xs: "10px" } }} />,
      lable: "Home",
    },
  ];

  // List Sidebar
  const list = (props) =>
    props && (
      <Box
        sx={{ width: { min: 165, xs: 200 } }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {props.to === "logout" ? (
          <List sx={{ padding: "0" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setLogout(true)}>
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    props.to === "/profile" ? state.data.text : props.lable
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <Link className={Styles.linList} to={props.to}>
            <List sx={{ padding: "0" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{props.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      props.to === "/profile" ? state.data.text : props.lable
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Link>
        )}
      </Box>
    );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar className={Styles.toolBar}>
          <IconButton
            className={Styles.iconButton}
            size="large"
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={Styles.nameStore}>
            <Link to="/home">Koshkine</Link>
          </Typography>
          {/* Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            sx={{ display: { xs: "none", md: "initial" } }}
          >
            {options.map(
              (option) =>
                option && (
                  <Tab
                    sx={{
                      minWidth: { lg: "90px", md: "75px" },
                    }}
                    value={option.to}
                    icon={option.icon}
                    label={option.lable}
                  />
                )
            )}
          </Tabs>
          {/* Tabs Responsive */}
          <Tabs
            Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            sx={{ display: { xs: "initial", md: "none" } }}
          >
            {optionsResponsive.map((option) => (
              <Tab
                className={Styles.tab}
                sx={{
                  padding: "0px",
                  minWidth: { xs: "45px", sm: "75px" },
                  fontSize: { xs: "10px", sm: "12px" },
                }}
                value={option.to}
                icon={option.icon}
                label={option.lable}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <SwipeableDrawer
        anchor="bottom"
        open={side}
        onClose={toggleDrawer(false)}
      >
        {options.map((option) => {
          return <React.Fragment key={v4}>{list(option)}</React.Fragment>;
        })}
      </SwipeableDrawer>
      {/* Modal Logot */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={logout}
        onClose={() => setLogout(false)}
        id="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={logout}>
          <Box className={Styles.modalLogout}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              Do you want to log out of your account?
            </Typography>
            <Grid container mt={2}>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setLogout(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => logoutHandler()}
              >
                <Button variant="outlined" color="error">
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Nav;
