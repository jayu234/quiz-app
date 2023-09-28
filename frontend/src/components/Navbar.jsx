import React, {useState} from 'react';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Divider, ListItemIcon } from '@mui/material';

import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

function Navbar() {
    const navigate = useNavigate();

    // using saved userdata to display the `email` of the user
    const { data } = useSelector((state) => state.user.userData);
    
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" sx={{
            marginBottom: { md: "1rem", xs: "0" },
            bgcolor: "#272727",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", alignItems: "center" }}>

                    {/*<----------  Site logo  ---------->*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="p"
                        href="/"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'inherit',
                            fontSize: "26px",
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            userSelect: "none",
                            cursor: "pointer"
                        }}
                    >
                        QuizApp
                    </Typography>

                    {/* <----------  Avatar + Setting menu  ---------->*/}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="profile_pic" src={'/src/assets/images/user.png'} sx={{ width: { xs: "28px", md: "36px" }, height: { xs: "28px", md: "36px" } }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem disableTouchRipple sx={{ cursor: "default" }}>
                                <ListItemIcon>
                                    <PersonRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                {data.email.slice(0, 3) + '...@' + data.email.split('@')[1]}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => { navigate("/quiz-history"); handleCloseUserMenu() }}>
                                <ListItemIcon>
                                    <AssignmentRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                Past Quizes
                            </MenuItem>
                            <MenuItem onClick={() => { window.location.reload(); handleCloseUserMenu() }}>
                                <ListItemIcon>
                                    <LogoutRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;