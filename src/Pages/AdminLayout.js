import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import DoctorIcon from '@mui/icons-material/MedicalServices';
import ProcedureIcon from '@mui/icons-material/Assignment';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../Services/apiService';
import '../Styles/AdminLayout.css';

const drawerWidth = 240;

function AdminLayout() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [sidebarColor, setSidebarColor] = React.useState('#f5f5f5'); // Smokey white by default
    const [topBarColor, setTopBarColor] = React.useState('#1976d2'); // Default blue

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSidebarColorChange = (event) => {
        setSidebarColor(event.target.value);
    };

    const handleTopBarColorChange = (event) => {
        setTopBarColor(event.target.value);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                    marginLeft: `${open ? drawerWidth : 0}px`,
                    backgroundColor: topBarColor, // Dynamic top bar color
                    transition: 'margin 0.3s ease, width 0.3s ease',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Admin Panel
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    {/* Dark/Light Mode Toggle */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    {/* Color Palette Selector */}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel
                            sx={{
                                color: 'black',
                            }}
                        >
                            Sidebar Color
                        </InputLabel>
                        <Select
                            value={sidebarColor}
                            onChange={handleSidebarColorChange}
                            label="Sidebar Color"
                            sx={{
                                height: '40px',
                                lineHeight: 'normal',
                                color: 'black', // Selected text color
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Border color
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Border color when focused
                                },
                                '.MuiSelect-icon': {
                                    color: 'black', // Dropdown icon color
                                },
                            }}
                        >
                            <MenuItem value="#f5f5f5">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Smokey White</span>
                            </MenuItem>
                            <MenuItem value="#2c3e50">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#2c3e50',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Dark</span>
                            </MenuItem>
                            <MenuItem value="#ffffff">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#ffffff',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Light</span>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel
                            sx={{
                                color: 'black',
                            }}
                        >
                            Top Bar Color
                        </InputLabel>
                        <Select
                            value={topBarColor}
                            onChange={handleTopBarColorChange}
                            label="Top Bar Color"
                            sx={{
                                height: '40px',
                                lineHeight: 'normal',
                                color: 'black', // Selected text color
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Border color
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black', // Border color when focused
                                },
                                '.MuiSelect-icon': {
                                    color: 'black', // Dropdown icon color
                                },
                            }}
                        >
                            <MenuItem value="#1976d2">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#1976d2',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Blue</span>
                            </MenuItem>
                            <MenuItem value="#2c3e50">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#2c3e50',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Dark Blue</span>
                            </MenuItem>
                            <MenuItem value="#ff5722">
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#ff5722',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                ></span>
                                <span>Orange</span>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <Avatar
                            alt="User Profile"
                            src="/path/to/profile-pic.jpg"
                            sx={{ width: 40, height: 40 }}
                        />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: sidebarColor, // Dynamic sidebar color
                    },
                }}
                open={open}
            >
                <Toolbar>
                    <div className="logo-section">
                        <img
                            src="/HospitalGuru/static/media/Hospital Guru Logo.517e813ce1d4cd7e4f1c.png"
                            width="46px"
                            alt="Logo"
                            className="logo"
                        />
                        <Typography variant="h6" className="logo-text">
                            Hospital Guru
                        </Typography>
                    </div>
                </Toolbar>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/admin/dashboard">
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/doctors">
                        <ListItemIcon>
                            <DoctorIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                        </ListItemIcon>
                        <ListItemText primary="Doctors" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/hospitals">
                        <ListItemIcon>
                            <HospitalIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                        </ListItemIcon>
                        <ListItemText primary="Hospitals" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/procedures">
                        <ListItemIcon>
                            <ProcedureIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                        </ListItemIcon>
                        <ListItemText primary="Procedures" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main
                style={{
                    flexGrow: 1,
                    transition: 'margin 0.3s ease',
                    marginLeft: open ? 0 : -drawerWidth,
                    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                    color: isDarkMode ? '#fff' : '#000',
                }}
            >
                <Toolbar />
                <Outlet /> {/* This will render nested routes */}
            </main>
        </div>
    );
}

export default AdminLayout;
