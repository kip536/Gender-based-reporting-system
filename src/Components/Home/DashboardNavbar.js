import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../Icons/bell';
import { UserCircle as UserCircleIcon } from '../Icons/user-circle';
import { Users as UsersIcon } from '../Icons/users';



const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
  }));



function DashboardNavbar({ clickshow, state, clickclose }) {


  


  return (
    <div>
        <DashboardNavbarRoot
        sx={{
          left: {
            lg: ''
          },
          width: state ? 'calc(100% - 280px)' : '100%'
          // {
          //   lg: clickshow ? '100%' : 'calc(100% - 280px)'
          // }
        }}
        // {...other}
        >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <Tooltip  title= {!state ? "Menu" : "Close Menu"}>
          <IconButton
            onClick={!state ? clickshow : clickclose}
            // icon={clickshow ? <MenuIcon fontSize="small" /> : <BellIcon fontSize="small" />}
            sx={{
              display: {
                xs: 'inline-flex',
                // lg: 'none'
              }
            }}
          >
            {!state ? <MenuIcon fontSize="small" /> : <CloseIcon fontSize="small"/>}
          </IconButton>
          </Tooltip>

          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </div>
  )
}

export default DashboardNavbar