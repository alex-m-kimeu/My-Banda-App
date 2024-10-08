import { SignIn } from "./Authentication/SignIn/SignIn";
import { SignUp } from "./Authentication/SignUp/SignUp";
import { Layout } from "./Components/Layout/Layout";
import { AdminSidebar } from "./Components/Sidebar/AdminSidebar";
import { SellerSidebar } from "./Components/Sidebar/SellerSidebar";
import { ComplaintsAdmin } from "./Pages/Admin/Complaints/ComplaintsAdmin";
import { DashboardAdmin } from "./Pages/Admin/Dashboard/DashboardAdmin";
import { UsersAdmin } from "./Pages/Admin/Users/UsersAdmin";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { LandingPage } from "./Pages/Buyer/LandingPage/LandingPage";
// import { SellerDashboard } from "./Pages/Seller/Dashboard/SellerDashboard";
import { StoreForm } from "./Pages/Seller/StoreForm/StoreForm";
import { Wishlist } from "./Pages/Buyer/LandingPage/Wishlist";
import { CategoriesPage } from "./Pages/Buyer/LandingPage/CategoriesPage";
import { Products } from "./Pages/Seller/Products/Products";
import { Buyercart } from "./Pages/Buyer/Cart/Buyercart";
import { AddProduct } from "./Pages/Seller/Products/AddProduct";
import { SinglePage } from "./Pages/Buyer/SingleProduct/SingleProduct";
import OrderComponent from "./Pages/Seller/Orders/Orders";
import OrderForm from "./Pages/Seller/Orders/form";
// import { SellerDash } from "./Pages/Seller/Dashboard/dash";
import { SellerDash2 } from "./Pages/Seller/Dashboard/dash2/maindash";
import { SellerDash } from "./Pages/Seller/Dashboard/dash";



// import OrderComponent from "./Pages/Seller/Orders/Orders";
// import OrderForm from "./Pages/Seller/Orders/form";

import { DelivererSidebar } from "./Components/Sidebar/DelivererSidebar";
import { DelivererDashboard } from "./Pages/Deliverer/Dashboard/DelivererDashboard"
// import { CompanyForm } from "./Pages/Deliverer/CompanyForm";
import { Orders } from "./Pages/Deliverer/Orders/Orders";
import { StorePage } from "./Pages/Buyer/StorePage/StorePage";
import { MyAccount } from "./Pages/Buyer/MyAccount/MyAccount";
import { CompanyForm } from "./Pages/Deliverer/CompanyForm/CompanyForm";
import { ChooseCompany } from "./Pages/Buyer/AddDeliverer/AddDeliverer";
import { OrdersDetails } from "./Pages/Deliverer/Orders/OrdersDetails";
import { MyOrders } from "./Pages/Buyer/MyOrders/MyOrders";
import { Confirmation } from "./Pages/Buyer/Confirmation/Confirmation";
import { DelivererDash2 } from "./Pages/Deliverer/Dashboard/dash2/maindash1";



const routes = [
    {
        path: "/signin",
        Element: SignIn,
        isAuthenticated: false,
        layout: "None",
        role: null,
        Sidebar: null,
    },
    {
        path: "/signup",
        Element: SignUp,
        isAuthenticated: false,
        layout: "None",
        role: null,
        Sidebar: null,
    },
    {
        path: "/admin/dashboard",
        Element: () => (
            <Layout Sidebar={AdminSidebar}>
                <DashboardAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/admin/users",
        Element: () => (
            <Layout Sidebar={AdminSidebar}>
                <UsersAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    {
        path: "/admin/complaints",
        Element: () => (
            <Layout Sidebar={AdminSidebar}>
                <ComplaintsAdmin />
            </Layout>
        ),
        isAuthenticated: true,
        role: "admin",
    },
    // {
    //     path: "/seller/dashboard",
    //     Element: () => (
    //         <Layout Sidebar={SellerSidebar}>
    //             <SellerDashboard />
    //         </Layout>
    //     ),
    //     isAuthenticated: true,
    //     role: "seller",
    // },


    {
        path: "/seller/dashboard",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <SellerDash2 />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },



    {
        path: "/seller/store",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <StoreForm />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },
    {
        path: "/seller/products",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <Products />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },
    {
        path: "/seller/Add/Products",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <AddProduct />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },
    {
        path: "/seller/Orders",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <OrderComponent />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },
    {
        path: "/seller/form/:orderId",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <OrderForm />
            </Layout>
        ),
        isAuthenticated: true,
        role: "seller",
    },
    {
        path: "/buyer/home",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <LandingPage />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/buyer/wishlist",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <Wishlist />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/categories/:categoryName",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <CategoriesPage />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/buyer/cart",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <Buyercart />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/buyer/myOrders",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                  <MyOrders/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/buyer/deliverer",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <ChooseCompany />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path:  '/orderconfirmation',
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <Confirmation/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
   
    {
        path: "/products/:id",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                < SinglePage/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/store/:id",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                < StorePage />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },  
    {
        path: "/deliverer/dashboard",
        Element: () => (
            <Layout Sidebar={DelivererSidebar}>
                <DelivererDash2/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "deliverer",
    },
    {
        path: "/orderByID/:orderId",
        Element: () => (
            <Layout Sidebar={DelivererSidebar}>
                <OrdersDetails/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "deliverer",
    },
    {
        path: "/buyer/myaccount",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <MyAccount />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
    {
        path: "/deliverer/company",
        Element: () => (
            <Layout Sidebar={DelivererSidebar}>
                <CompanyForm/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "deliverer",
    },
    {
        path: "/deliverer/orders",
        Element: () => (
            <Layout Sidebar={DelivererSidebar}>
                <Orders/>
            </Layout>
        ),
        isAuthenticated: true,
        role: "deliverer",
    },
];

export default routes;
