import React, { useEffect, useContext} from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, Tooltip } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../Icons/chart-bar';
import { Cog as CogIcon } from '../Icons/cog';
import { Lock as LockIcon } from '../Icons/lock';
import { Selector as SelectorIcon } from '../Icons/selector';
import { User as UserIcon } from '../Icons/user';
import { UserAdd as UserAddIcon } from '../Icons/user-add';
import { Users as UsersIcon } from '../Icons/users';
import { XCircle as XCircleIcon } from '../Icons/x-circle';
import Logo from './Logo';
import NavItem from './NavItem'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { AuthContext } from '../Context/AuthContext';




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));



function DashboardSidebar({ opened }) {

  const {user} = useContext(AuthContext)
  let userType = "";

  let items = []

  if (user.user_type === "0" ){
    userType= "Super Admin"
  }
  if (user.user_type === "1" ){
    userType= "Admin"
  }
  if (user.user_type === "2" ){
    userType= "Normal User"
  }

  

if (user.user_type === "0" ){
    
  items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Users'
  },
  {
    href: '/messages',
    icon: (<MarkunreadIcon fontSize="small" />),
    title: 'Messages'
  },
  {
    href: '/reports',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Reports'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/logout',
    icon: (<LockIcon fontSize="small" />),
    title: 'Logout'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }
];
}

if (user.user_type === "1" ){
    
  items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Users'
  },
  {
    href: '/messages',
    icon: (<MarkunreadIcon fontSize="small" />),
    title: 'Messages'
  },
  {
    href: '/reports',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Reports'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/logout',
    icon: (<LockIcon fontSize="small" />),
    title: 'Logout'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }
];
}

if (user.user_type === "2" ){
    
  items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  
  {
    href: '/messages',
    icon: (<MarkunreadIcon fontSize="small" />),
    title: 'Messages'
  },
  {
    href: '/reports',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Reports'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/logout',
    icon: (<LockIcon fontSize="small" />),
    title: 'Logout'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }
];
}
  



  
  // const router = useRouter();
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
  //   defaultMatches: true,
  //   noSsr: false
  // });

  // useEffect(
  //   () => {
  //     if (!router?.isReady) {
  //       return;
  //     }

  //     if (open) {
  //       onClose?.();
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [router?.asPath]
  // );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Gender Based
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  User type
                  {' '}
                  : {userType}
                  
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        <Divider sx={{ borderColor: '#2D3748' }} />
        
      </Box>
    </>
  );

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       anchor="left"
  //       closed
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: 'neutral.900',
  //           color: '#FFFFFF',
  //           width: 280,
  //           maxHeight: 100
  //         }
  //       }}
  //       variant="temporary"
  //     >
  //       {content}
  //     </Drawer>
  //   );
  // }









  return (
    <div>
        <Drawer
      anchor="left"
      open={opened}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 100 }}
      variant="persistent"
    >
      <DrawerHeader>
        Menu
      {/* <Tooltip title="Close Menu">
          <IconButton onClick={closed}>
            <ChevronLeftIcon style={{ color: 'white' }} />
          </IconButton>
          </Tooltip> */}
        </DrawerHeader>
        <Divider sx={{ borderColor: 'white' }} />
      {content}
    </Drawer>
    </div>
  )
}

// DashboardSidebar.propTypes = {
//     onClose: PropTypes.func,
//     open: PropTypes.bool
// };  

export default DashboardSidebar