import React, { useState, useEffect } from "react";
import "../Featured/featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Featured = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [shippedTotal, setShippedTotal] = useState(0);
  const navigate = useNavigate();

  const target = 1000; // Example target value

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userResponse = await fetch(
          `https://my-banda.onrender.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else if (ordersData && typeof ordersData === "object") {
          setOrders([ordersData]);
        } else {
          console.error("Unexpected orders data format:", ordersData);
          throw new Error("Orders data is not an array or object");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserAndOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, filter]);

  const filterOrders = () => {
    let filtered = orders;
    if (filter !== "All") {
      filtered = orders.filter((order) => order.status === filter);
    }
    setFilteredOrders(filtered);
    calculateShippedTotal(filtered);
  };

  const calculateShippedTotal = (orders) => {
    const shippedOrders = orders.filter((order) => order.status === "Shipped");
    const total = shippedOrders.reduce((sum, order) => {
      return sum + order.price;
    }, 0);
    setShippedTotal(total);
  };

  const percentage = (shippedTotal / target) * 100;

  const customStyles = buildStyles({
    pathColor: "green",
    textColor: "green",
    trailColor: "white",
    backgroundColor: "black",
  });

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(2)}%`}
            strokeWidth={5}
            styles={customStyles}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${shippedTotal.toFixed(2)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$00.0</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$00.0</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$00.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
