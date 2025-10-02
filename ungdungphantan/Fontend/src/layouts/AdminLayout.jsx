import AdminNavbar from "../Component/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div style={{ padding: "0px" }}>
        <Outlet />
      </div>
    </>
  );
}
