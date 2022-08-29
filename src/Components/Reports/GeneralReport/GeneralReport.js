import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import TrendingCases from '../../Dashboard/TrendingCases';

function GeneralReport(props) {
  return (
    <div>
      <Grid
              item
              lg={10}
              md={6}
              xl={3}
              xs={12}
            >
              <TrendingCases sx={{ height: '100%' }} />
            </Grid>
    </div>
  )
}

export default GeneralReport