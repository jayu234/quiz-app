import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

function Home({ setAccess }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, success, isError, message } = useSelector((state) => state.user.userData);

  const [userData, setUserData] = useState({ email: "" });

  const handleSubmit = () => {
    dispatch(login(userData));
  }

  useEffect(() => {
    if (success) {
      setAccess(true); // Change the `access` state on successfull sign-in
      navigate("/"); // Then navigate to '/'
    }
    if (isError) {
      console.log(message); // Display error in console in case of failure
    }
  }, [isLoading])

  return (
    <Box component="div" sx={{ height: "100vh", paddingY: { xs: "auto", md: "3rem" } }}>
      <Typography
        variant="h4"
        fontFamily="inherit"
        fontWeight={600}
        align="center"
        sx={{ fontSize: { xs: "26px", md: "30px" }, color: "white", marginTop: "3rem" }}
      >
        Quiz App
      </Typography>
      <Grid
        container
        component={"section"}
        direction={"column"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          width: { md: "350px", xs: "100%" },
          marginX: "auto",
          marginY: "2rem",
          padding: { md: "1.5rem", xs: "0.75rem" },
          backgroundColor: "#414141",
          borderRadius: "10px",
          border: "1px solid #414141",
        }}
      >
        <Grid item xs={12} sx={{ width: "100%" }}>

          {/* <---------- Input Field ----------> */}
          <Grid container spacing={3} direction={"column"}>
            <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="email" style={{ color: "white" }}>
                Email
              </label>
              <input type='email' name='email' placeholder='Enter your email' style={{ color: "white", fontFamily: "inherit", fontSize: "16px", backgroundColor: "transparent", border: "1px solid rgb(106 106 106)", borderRadius: "6px", padding: "1rem 0.75rem" }}
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }}
              />
            </Grid>
          </Grid>
          
          {/* <---------- Sign In button ---------->*/}
          <Grid item sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <Button
              disabled={isLoading || !userData.email.length}
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                width: "60%",
                marginTop: "24px",
                fontSize: "1rem",
                textTransform: "none",
                fontFamily: "inherit",
                backgroundColor: "#3949ab",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#3F51B5",
                  boxShadow: "none"
                }
              }}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  bottom: "10%",
                  right: "46%",
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>

  )
}

export default Home