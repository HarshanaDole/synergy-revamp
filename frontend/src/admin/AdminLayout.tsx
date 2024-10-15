import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This will render the child routes (admin pages) */}
      </main>
    </div>
  );
};

export default AdminLayout;
