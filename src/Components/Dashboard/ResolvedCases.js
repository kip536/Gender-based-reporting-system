import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ResolvedCases = (props) => {

  const [resolvedCases, setResolvedCases] = useState([]);

  const fetchresolvedcases = () => {
    axios.get('http://localhost/fgm/resolvedcases.php')
    .then((response) => {
      const data = response.data;
      setResolvedCases(data)
    })
  }

  useEffect(() => {
    fetchresolvedcases();
  
  }, [])
  

return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    {resolvedCases.map((res) => (
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Resolved Cases
          </Typography>
          
            <Typography
            color="textPrimary"
            variant="h4"
            key={res.percentage}
          >
            {(res.percentage*1).toFixed(2)}%
          </Typography>
          
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={res.percentage}
          variant="determinate"
        />
      </Box>
    </CardContent>
    ))}
  </Card>
);
}

export default ResolvedCases