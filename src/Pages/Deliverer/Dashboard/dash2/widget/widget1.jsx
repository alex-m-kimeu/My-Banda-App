import { useEffect, useState } from "react";
import "../widget/widget1.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const Widget1 = ({ type }) => {
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState([0]);
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  // const [productsCount, setProductsCount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('https://my-banda.onrender.com/delivererorders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

        

        const ordersData = await response.json();
        setOrdersCount(ordersData.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  let data;

  switch (type) {
    case "Orders":
      data = {
        title: "Orders",
        count: ordersCount, 
        isMoney: false,
        link: "See all orders",
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

export default Widget1;
