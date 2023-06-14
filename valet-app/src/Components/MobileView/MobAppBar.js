import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector,shallowEqual,useDispatch } from 'react-redux';
import { getUserDetails } from '../../Redux/Auth/AuthAction';
import MuiSwitch from '../MuiComponents/MuiSwitch';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import ConfirmationDialog from '../MuiComponents/ConfirmationDialog';
const pages = ['Accounts', 'Categories','Goals','Yearly Overview'];
const settings = ['Profile','Logout','MuiSwitch'];

function MobAppBar() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ auth }) => auth.userDetails, shallowEqual) || {};
  const {logout} =useContext(AuthContext);
  const [avatarDetails,setAvatarDetails] = useState({
    userName:"",
    profileImage:""
  }) 
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogoutConfirmationOpen = () => {
    setLogoutConfirmationOpen(true);
  };
  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };
  const handleLogout = () => {
    logout();
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if(Object.keys(data).length > 0){
      setAvatarDetails({
        userName:data.userName,
        profileImage:data.profileImage
      })
    }
  },[data])

  useEffect(()=>{
    dispatch(getUserDetails())
  },[])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/mobile-dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            valet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration:"none",color:"inherit"}} to={`/mobile-dashboard/${page.split(" ").join("").toLowerCase()}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={(event)=>{
                event.preventDefault();
                navigate('/mobile-dashboard')
            }}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              fontFamily: "Pacifico",
              color: 'white',
              textDecoration: 'none',
            }}
          >
            valet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={avatarDetails.userName} src={avatarDetails.profileImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px',width:"8rem" }}
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
             {settings.map((setting) => (
                <MenuItem key={setting} sx={{display:'flex' ,justifyContent:'center' }}  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >
                     {setting === 'MuiSwitch' ? <div style={{paddingLeft:"2rem"}} ><MuiSwitch/></div>: setting === "Logout" ? <span onClick={handleLogoutConfirmationOpen}>Logout</span> : <Link style={{textDecoration:"none",color:"inherit"}}  to={`/mobile-dashboard/${setting.split(" ").join("").toLowerCase()}`}>{setting}</Link>}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ConfirmationDialog
        description="Are you sure you want to log out ?"
        open={logoutConfirmationOpen}
        handleClose={handleLogoutConfirmationClose}
        handleYes={handleLogout}
      />
    </AppBar>
  );
}
export default MobAppBar;
