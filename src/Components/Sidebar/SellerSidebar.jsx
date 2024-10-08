import logo from '/src/assets/logo.png'
import { LiaHomeSolid } from "react-icons/lia";
import { LiaTagSolid } from "react-icons/lia";
import { LiaBoxSolid } from "react-icons/lia";
import { LiaStoreAltSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate, useMatch } from 'react-router-dom'

export const SellerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const dashboardMatch = useMatch("/seller/dashboard");
  const productsMatch = useMatch("/seller/products");
  const ordersMatch = useMatch("/seller/orders");
  const storeMatch = useMatch("/seller/store");

  const getClassName = (match) => {
    return match ? "text-Secondary" : "text-Text";
  }

  return (
    <div className="flex flex-col p-[25px] lg:p-[20px] justify-between h-screen shadow-md items-center lg:items-start">
      <div className="flex flex-col gap-[20px] md:gap-[25px]">
        <div className="flex flex-col px-[10px]">
          <img
            src={logo}
            alt="logo"
            className="w-[100px] h-auto max-w-full"
          />
        </div>
        <div className="flex flex-col p-[10px]">
          <nav>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <NavLink
                  to="/seller/dashboard"
                  className={`flex items-center gap-[10px] ${getClassName(dashboardMatch)}`}
                >
                  <LiaHomeSolid className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
                  <h2 className="text-sm font-medium">Dashboard</h2>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/seller/products"
                  className={`flex items-center gap-[10px] ${getClassName(productsMatch)}`}
                >
                  <LiaTagSolid className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
                  <h2 className="text-sm font-medium">Products</h2>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/seller/orders"
                  className={`flex items-center gap-[10px] ${getClassName(ordersMatch)}`}
                >
                  <LiaBoxSolid className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
                  <h2 className="text-sm font-medium">Orders</h2>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/seller/store"
                  className={`flex items-center gap-[10px] ${getClassName(storeMatch)}`}
                >
                  <LiaStoreAltSolid className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
                  <h2 className="text-sm font-medium">Store</h2>
                </NavLink>
              </li>

            </ul>
          </nav>
        </div>
      </div>
      <div
        className="flex gap-[10px] p-[10px] items-center cursor-pointer text-Text hover:text-Secondary"
        onClick={handleLogout}>
        <BiLogOut className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
        <h1 className="text-sm font-medium">Logout</h1>
      </div>
    </div>
  )
}


