// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "../context/AuthContext";

// const GuestRoute = () => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="flex min-h-screen items-center justify-center ">
//         <p className="font-bold text-3xl text-center text-white">₦</p>
// </div>
//   }

//   if (user) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };
import { Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default GuestRoute;