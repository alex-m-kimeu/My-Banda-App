import { SignIn } from "./Authentication/SignIn/SignIn";
import { SignUp } from "./Authentication/SignUp/SignUp";
import { Layout } from "./Components/Layout/Layout";
import { AdminSidebar } from "./Components/Sidebar/AdminSidebar";
import { ComplaintsAdmin } from "./Pages/Admin/Complaints/ComplaintsAdmin";
import { DashboardAdmin } from "./Pages/Admin/Dashboard/DashboardAdmin";
import { UsersAdmin } from "./Pages/Admin/Users/UsersAdmin";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { LandingPage } from "./Pages/Buyer/LandingPage/LandingPage";

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
        path: "/buyer/home",
        Element: () => (
            <Layout Header={Navbar} Footer={Footer}>
                <LandingPage />
            </Layout>
        ),
        isAuthenticated: true,
        role: "buyer",
    },

];

export default routes;