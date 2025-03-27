// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         // console.log(token)

//         if (token) {
//             setIsAuthenticated(true); 
//         }
//         setLoading(false);
//     }, []);


//     if (loading) {
//         return null;
//     }
//     if (isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     // If authenticated, render the children
//     return children;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
