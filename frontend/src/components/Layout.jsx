/*
  Layout component for rendering `Navbar + Outlet`
*/

import React from 'react'
import Navbar from './Navbar'
import {  Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
function Layout() {
  return (
    <Box component="div" sx={{
      maxWidth: { md: "80%", xs: "100%" },
      minHeight: "95vh",
      marginX: { md: "auto", xs: "auto" },
      marginY: "1rem",
      backgroundColor: "#414141",
      border: "1px solid #414141",
      borderRadius: "10px",
      paddingY: { xs: "auto", md: "auto" },
      color: "white"
    }}>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout