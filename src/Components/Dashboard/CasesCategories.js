import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useState, useEffect } from 'react';
import axios from 'axios';


Chart.register(ArcElement);

const CasesCategories = (props) => {
  const theme = useTheme();

  const [statistics, setStatistics] = useState([]);
  const [fgm, setfgm] = useState(0);
  const [childlabour, setchildlabour] = useState(0);
  const [domesticviolence, setdomesticviolence] = useState(0);
  const [others, setothers] = useState(0);

  const fetchstatistics = () => {
    axios.get('http://localhost/fgm/categorycount.php')
    .then((response) => {
      const data = response.data
      setStatistics(data)
      // console.log(statistics)
      setfgm(data.map((res)=> res.FGM));
      // console.log(fgm);
      setchildlabour(data.map((res)=> res.childlabour));
      setdomesticviolence(data.map((res)=> res.domesticviolence))
      setothers(data.map((res)=> res.others))
      
    })
  }

  useEffect(() => {
    fetchstatistics();
    
  }, []);

  console.log(statistics)
  console.log('fgm:',fgm);
  console.log('chillabr:',childlabour);
  console.log('domestic:',domesticviolence);
  console.log('others:',others);

  const data = {
    datasets: [
      {
        data: [fgm, childlabour, domesticviolence, others],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', 'black'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['FGM', 'Child labour', 'Domestic violence', 'Others']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'FGM',
      value: fgm,
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Child labour',
      value: childlabour,
      icon: TabletIcon,
      color: '#E53935'
    },
    {
      title: 'Domestic violence',
      value: domesticviolence,
      icon: PhoneIcon,
      color: '#FB8C00'
    },
    {
      title: 'Others',
      value: others,
      icon: PhoneIcon,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Cases Categories" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h5"
              >
                {(value*1).toFixed(2)}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CasesCategories