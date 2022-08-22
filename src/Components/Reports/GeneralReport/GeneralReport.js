import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function GeneralReport(props) {
  return (
    <div>
        <Card
    
    style={{borderColor: 'red'}}
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Total Cases: 23
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              Cases resolved: 13
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              Frequent case: FGM
            </Typography>
          </Grid>
          {/* <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid> */}
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon color="error" />
          <Typography
            color="error"
            sx={{
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
    </div>
  )
}

export default GeneralReport