import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Inventory, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Badge } from '@mui/material';

function Navbar() {
  const { numOfCartItems} = React.useContext(CartContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('tkn')) {
      setPages([
        { label: 'Home', path: '/home' },
        { label: 'Cart', path: '/cart' },
        { label: 'WishList', path: '/wishList' },
        { label: 'Products', path: '/products' },
        { label: 'Categories', path: '/categories' },
        { label: 'Brands', path: '/brands' },
      ]);
      setSettings([{ label: 'Logout', path: '/login' },{ label: 'Update Password', path: '/updatepassword' },
        { label: 'Update User Data', path: '/updateuserdata' }]);
    } else {
      setPages([]);
      setSettings([]);
    }
  }, [localStorage.getItem('tkn')]);

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

  const handlePageClick = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleSettingClick = (path) => {
    if (path === '/login') {
      localStorage.removeItem('tkn'); 
    }
    navigate(path);
    handleCloseUserMenu();
  };

  const handleClickCart = () => {
    navigate('/cart'); 
  };

  return (
               

    <AppBar position="static" sx={{ backgroundColor: '#134B70' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ color: '#EEEEEE' }}>
          <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '2.5rem' }} />
          <Typography
          onClick={() => navigate('/home')} 
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 7,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fresh Cart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            { localStorage.getItem('tkn')?<IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Inventory />
            </IconButton> :''}
            
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handlePageClick(page.path)}>
                  <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingCart sx={{ display: { xs: 'flex', md: 'none' }, fontSize: '1.5rem' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 4,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize:"21px"
            }}
          >
            FreshCart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handlePageClick(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, mr: 5 }}>
  {!localStorage.getItem('tkn') ? (
    <>
    <div className='flex'>
      <Button
        key="login"
        onClick={() => navigate('/login')}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Login
      </Button>
      <Button
        key="register"
        onClick={() => navigate('/register')}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Register
      </Button>
      </div>
    </>
  ) : (
    <>
      <Tooltip >
      <Badge badgeContent={numOfCartItems} color="error" sx={{marginRight:"20px"}} >
          <ShoppingBag sx={{cursor:"pointer"}} onClick={handleClickCart} />
          </Badge>

        <IconButton title="Open settings" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <MenuIcon sx={{ color: '#EEEEEE' }} />
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
        {settings.map((setting) => (
          <MenuItem key={setting.label} onClick={() => handleSettingClick(setting.path)}>
            <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )}
</Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
