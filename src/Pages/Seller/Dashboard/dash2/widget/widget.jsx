import { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  const [productsCount, setProductsCount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userResponse = await fetch(`https://my-banda.onrender.com/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const storeId = userData.store.id;

        const ordersResponse = await fetch(
          `https://my-banda.onrender.com/orderByID/${userId}?store_id=${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();
        console.log("Fetched orders data:", ordersData);

        const ordersArray = Array.isArray(ordersData) ? ordersData : [ordersData];
        setOrdersCount(ordersArray.length);

        const customersResponse = await fetch(
          `https://my-banda.onrender.com/users?store_id=${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!customersResponse.ok) {
          throw new Error("Failed to fetch customers");
        }

        const customersData = await customersResponse.json();
        setCustomersCount(customersData.length);

   
        const productsResponse = await fetch(`https://my-banda.onrender.com/products?store_id=${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const productsData = await productsResponse.json();
        console.log("Fetched products data:", productsData);
        setProductsCount(productsData.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndOrders();
  }, []);

  let data;

  switch (type) {
    case "Products":
      data = {
        title: "Products",
        count: productsCount, 
        isMoney: false,
        link: "See all products",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        count: ordersCount,
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        count: amount,
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        count: amount,
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
