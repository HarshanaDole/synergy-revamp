import React, { useState, useEffect } from "react";
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
        <Dashboard />
      </UserProvider>
    ),
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "/admin/profile",
    element: (
      <UserProvider>
        <Profile />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects",
    element: (
      <UserProvider>
        <Projects />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects/add",
    element: (
      <UserProvider>
        <AddEditProject />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects/edit/:id",
    element: (
      <UserProvider>
        <AddEditProject />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients",
    element: (
      <UserProvider>
        <Clients />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients/add",
    element: (
      <UserProvider>
        <AddEditClient />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients/edit/:id",
    element: (
      <UserProvider>
        <AddEditClient />
      </UserProvider>
    ),
  },
  {
    path: "/admin/admins",
    element: (
      <UserProvider>
        <Admins />
      </UserProvider>
    ),
  },
  {
    path: "/admin/messages",
    element: (
      <UserProvider>
        <Messages />
      </UserProvider>
    ),
  },
  {
    path: "/admin/messages/:id",
    element: (
      <UserProvider>
        <SingleMessagePage />
      </UserProvider>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <UserProvider>
        <BlogView />
      </UserProvider>
    ),
  },
  {
    path: "/admin/blogs/add",
    element: (
      <UserProvider>
        <AddEditBlog />
      </UserProvider>
    ),
  },
  {
    path: "/admin/blogs/edit/:id",
    element: (
      <UserProvider>
        <AddEditBlog />
      </UserProvider>
    ),
  },
]);

const Main = () => {
  const [isSplashvisible, setIsSplashVisible] = useState(false);

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
      {isSplashvisible ? (
        <SplashScreen onAnimationEnd={handleAnimationEnd} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
