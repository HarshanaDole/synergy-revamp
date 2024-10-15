import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Home from "./client/pages/Homepage/Home";
import AdminNotFound from "./admin/pages/AdminNotFound";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Profile from "./admin/pages/Profile";
import Projects from "./admin/pages/Projects";
import Clients from "./admin/pages/Clients";
import Register from "./admin/pages/Register";
import AddEditProject from "./admin/pages/AddEditProject";
import AddEditClient from "./admin/pages/AddEditClient";
import { UserProvider } from "./admin/auth/UserProvider";
import Admins from "./admin/pages/Admins";
import Messages from "./admin/pages/Messages";
import NotFoundPage from "./client/pages/NotFoundPage";
import Services from "./client/pages/Services/Service";
import AboutUs from "./client/pages/AboutUs/AboutUs";
import Project from "./client/pages/Projects/Projects";
import Blogs from "./client/pages/Blogs/Blogs";
import Contact from "./client/pages/Contact/Contact";
import SplashScreen from "./client/components/SplashScreen";
import BlogDetailed from "./client/pages/Blogs/BlogDetailed";
import SingleMessagePage from "./admin/pages/MessageView";
import BlogView from "./admin/pages/Blogs";
import AddEditBlog from "./admin/pages/AddEditBlog";
import AdminLayout from "./admin/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/projects",
    element: <Project />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetailed />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "admin/*",
    element: <AdminNotFound />,
  },
  {
    path: "/admin",
    element: (
      <UserProvider>
        <AdminLayout /> {/* Use the AdminLayout to wrap all admin routes */}
      </UserProvider>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/add",
        element: <AddEditProject />,
      },
      {
        path: "projects/edit/:id",
        element: <AddEditProject />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "clients/add",
        element: <AddEditClient />,
      },
      {
        path: "clients/edit/:id",
        element: <AddEditClient />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "messages/:id",
        element: <SingleMessagePage />,
      },
      {
        path: "blogs",
        element: <BlogView />,
      },
      {
        path: "blogs/add",
        element: <AddEditBlog />,
      },
      {
        path: "blogs/edit/:id",
        element: <AddEditBlog />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
]);

const Main = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsSplashVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleAnimationEnd = () => {
    setIsSplashVisible(false);
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen onAnimationEnd={handleAnimationEnd} />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      )}
    </>
  );
};

export default Main;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
