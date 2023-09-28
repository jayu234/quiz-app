/*
 * `ProtectedRoute` is used for preventing direct access to any of the sub route

*/

import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children, access }) => {
    let location = useLocation();
    if (!access) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;