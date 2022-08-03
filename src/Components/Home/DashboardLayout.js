import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';





const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
    }
  }));




function DashboardLayout(props) {

    const { children, handleDrawerClose, handleDrawerOpen, open } = props;
    

  return (
    <div>
        <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar clickshow={handleDrawerOpen} state={open} clickclose={handleDrawerClose} />
      <DashboardSidebar
        opened={open}
      />
    </div>
  )
}

export default DashboardLayout