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


const user = {
    avatar: '/static/images/avatars/avatar_1.png',
    location: 'Lanet',
    county: 'Nakuru',
    userType: 'Admin',
    name: 'Victor Omanyala',
    timezone: 'GTM-7'
  };

function Logout(handlelogout) {

    
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
          />
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