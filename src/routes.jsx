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
import { SellerDashboard } from "./Pages/Seller/Dashboard/SellerDashboard";
import { StoreForm } from "./Pages/Seller/StoreForm/StoreForm";
import { Wishlist } from "./Pages/Buyer/LandingPage/Wishlist";
import { CategoriesPage } from "./Pages/Buyer/LandingPage/CategoriesPage";
import { ProductsPage } from "./Pages/Seller/Products/ProductPage";
import { Buyercart } from "./Pages/Buyer/Cart/Buyercart";
import { SinglePage } from "./Pages/Buyer/SinglePage/SinglePage";

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
    {
        path: "/seller/dashboard",
        Element: () => (
            <Layout Sidebar={SellerSidebar}>
                <SellerDashboard />
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
                <ProductsPage />
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
        path: "/buyer/category",
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
        path: "/buyer/single/product",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <SinglePage />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },
];

export default routes;