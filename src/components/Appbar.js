import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const Root = styled('div')(({ theme }) => ({
	
	'& .button': {
		backgroundColor: '#FFFFFF',
    margin: 2
	},
}));

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    window.location.href = "/"
  };
  return (
    <Box style={{ marginBottom: 60 }} sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#03386A" }} position="fixed">
        <Toolbar>
          <img style={{ width: 60, height: 60, marginLeft: 20 }} src='img1.png' />
          <Typography className='button' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>
              ThreadHub
            </strong>
          </Typography>
          <Button className='button' component={Link} to="/Customers" color="inherit"><GroupsIcon />Clientes</Button>
          <Button className='button' component={Link} to="/Sale" color="inherit"><StackedLineChartIcon />Ventas</Button>
          <Button className='button' component={Link} to="/Products" color="inherit"><AssignmentTurnedInIcon />Productos</Button>
          <Button className='button' component={Link} to="/Orders" color="inherit"><AirportShuttleIcon />Pedidos</Button>

          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <Avatar
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                </Avatar>
              </Tooltip>
            </Box >
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{

                elevation: 0,
                sx: {
                  color: '#FFFFFF',
                  backgroundColor: '#03386A',
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Perfil
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Configuración
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
