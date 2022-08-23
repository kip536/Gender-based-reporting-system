import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { getInitials } from '../utils/get-initials';


// const user = {
//     avatar: '/static/images/avatars/avatar_1.png',
//     location: 'Lanet',
//     county: 'Nakuru',
//     userType: 'Admin',
//     name: 'Victor Omanyala',
//     timezone: 'GTM-7'
//   };

function Logout() {


const { user, dispatch } = useContext(AuthContext);

  const handlelogout = () => {
    dispatch({type: "LOGOUT"});
  }

    
  return (
    <div>
        <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${user.location} ${user.county}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="error"
          fullWidth
          variant="text"
          onClick={handlelogout}
        >
          LogOut
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default Logout