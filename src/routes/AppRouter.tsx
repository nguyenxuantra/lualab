import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MainLayout from "../shared/Layouts/MainLayout";
import AdminLayout from "../shared/Layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProductManagement from "../pages/admin/ProductManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import CustomerManagement from "../pages/admin/CustomerManagement";

// Component để scroll to top khi route thay đổi
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <MainLayout />
            </>
        ),
        children: [
            {
                path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/:id",
                element: <ProductDetail />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <>
                <ScrollToTop />
                <AdminLayout />
            </>
        ),
        children: [
            {
                path: "/admin",
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/admin/products",
                element: <ProductManagement />,
            },
            {
                path: "/admin/orders",
                element: <OrderManagement />,
            },
            {
                path: "/admin/customers",
                element: <CustomerManagement />,
            }
        ]
    }
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter;