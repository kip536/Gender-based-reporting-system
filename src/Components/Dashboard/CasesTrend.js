import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from "react";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CasesTrend = (props) => {
  const theme = useTheme();
  const [casedata, setCasedata] = useState([]);
  const [titles, setTitles] = useState([]);
  const [labels, setLabel] = useState([])
  const [values, setValues] = useState([])
  const [dataset, setDataset] = useState([])
  const [area, setArea] = useState([]);


  useEffect(() => {
    const getcasesdata = async () => {
      const areasFromServer = await fetchcasesdata()
      setCasedata(areasFromServer)
      console.log(areasFromServer)
      
    }

    getcasesdata()
  }, []);


    const fetchcasesdata = async () => {
      const result = await fetch('http://localhost/fgm/casesperareas.php');
      const data = await result.json()
      // const area = data.map((res) => res.area)
      // const cases = data.map((res) => res.cases)
      // console.log('area is',area)
      // console.log('cases is',cases)
      // // const newarr = Object.values(data).map((res, idx) => {
      // //   return {label: [res], value: Object.keys(res)}
      // // })
      const filteredareas = Array.from(
        Object.entries(
          data.reduce((s, {area}) => {
            for (const {name, value} of area) {
              (s[name] = [value])[value] +=''
            }
            console.log('ssssssss', s)
            return s;
          }, {})),
          ([name, _data]) => ({
            name,
          }),
      )
      setTitles(filteredareas.map((res)=> res.name));

      console.log('valuuuu is', filteredareas)

      
      const casesmappeddata = Array.from(
        Object.entries(
          data.reduce((a, {inputs}) => {

            for (const {label, backgroundColor, value} of inputs) {
              (a[label] = [backgroundColor, value])[value] +=[value];
              
            }
            console.log('aaaaaa', a)
            return a;
          }, {})),
        ([label, _data]) => ({
          label,
          were: _data,
          data: [_data[1]],
          backgroundColor: _data[0],
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          maxBarThickness: 10
        }),
        
      );
      console.log('weeeeee',casesmappeddata);

      setDataset(casesmappeddata)

      
      
      
      // const label = Object.entries(data).map(([key, value]) => [value].map((res)=> Object.values(res).map((info)=> info.label)));
      setLabel()
      // const value = Object.entries(data).map(([key, value]) => [value].map((res)=> Object.values(res).map((info)=> info.value)));
      setValues()
      

      console.log('value is@@', values)
      console.log('label is@@', labels)

      console.log('data recieved is:', data)
      console.log('keys are:', Object.keys(data))
      console.log('labels are:', titles)

      return data
      
    }
  

  const data = {
    datasets: dataset,
    // [
    //   {
    //     backgroundColor: '#3F51B5',
    //     barPercentage: 0.5,
    //     barThickness: 12,
    //     borderRadius: 4,
    //     categoryPercentage: 0.5,
    //     data: casedata,
    //     label: [labels],
    //     maxBarThickness: 10
    //   },
    //   {
    //     backgroundColor: 'lightgrey',
    //     barPercentage: 0.5,
    //     barThickness: 12,
    //     borderRadius: 4,
    //     categoryPercentage: 0.5,
    //     data: [11, 20, 12, 29, 30, 25, 13],
    //     label: 'Last year',
    //     maxBarThickness: 10
    //   }
    // ],
    labels: titles
    // ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
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

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        )}
        title="Cases Trend"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default CasesTrend