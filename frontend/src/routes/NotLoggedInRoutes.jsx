import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const NotLoggedinRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedinRoutes;
