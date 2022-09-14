import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography
  } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'
import SeverityPill from '../Home/SeverityPill';



  
  const NotificationEdit = (props) => {

    const [category, setCategory] = useState(null);
    const [area, setArea] = useState(null);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);

    const { user, dispatch } = useContext(AuthContext);

    useEffect(() => {
      const getcategoriesAndareasdata = async () => {
        const categoriesFromServer = await fetchccategoriesdata()
        const areasfromServer = await fetchareasdata()
        
        
      }
  
      getcategoriesAndareasdata()
    }, []);
  
  
      const fetchccategoriesdata = async () => {
        const result = await fetch('http://localhost/fgm/getcategories.php');
        const data = await result.json()
        setCategories(data)
        // console.log(categoriesFromServer)
      }

      const fetchareasdata = async () => {
        const result = await fetch('http://localhost/fgm/getareas.php');
        const data = await result.json()
        setAreas(data)
        // console.log(categoriesFromServer)
      }


    const handleUpdate = async (e) => {
      e.preventDefault();
  
      await axios.post("http://localhost/fgm/createcasecategory.php", {
        category: category,
        createdby: user.name,
      });
      
      setCategory("");
      
    };
    

    return(
      <form
      autoComplete="off"
      noValidate
      {...props}>
      <Grid style={{display: 'flex', width: '100%'}}>
      <Grid style={{flex:'50%', flexDirection:'column', marginRight:'20px'}}>
      <Card>
        <CardHeader
          subheader="Create new case category"
          title="New Case Category"
        />
        <Divider />
        <CardContent>
          <Grid
            // container
            spacing={6}
            wrap="wrap"
          >
            <Grid>
            <TextField
                fullWidth
                helperText="Please type the case category here"
                label="Input category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
        <Divider/>
        <Grid>
          <h4 style={{display: 'flex', marginLeft: '10px'}}>category list</h4>
          {categories.map((res) => (
            <p style={{display: 'flex', marginLeft: '10px'}}>{res.name}
            <Button variant='none' style={{padding: 2}}>
            <SeverityPill color={'info'} style={{cursor: 'pointer'}}>
              edit
            </SeverityPill>
            </Button>
            <Button style={{padding: 2}}>
            <SeverityPill color={'error'} style={{cursor: 'pointer'}}>
              delete
            </SeverityPill>
            </Button>

            </p>
          ))}
        </Grid>
      </Card>
      </Grid>

      {/* area creation form */}
      <Grid style={{flex:'50%', flexDirection:'column', marginRight:'20px'}}>
      <Card>
        <CardHeader
          subheader="Create new area/location"
          title="New Area/Location"
        />
        <Divider />
        <CardContent>
          <Grid
            // container
            spacing={6}
            wrap="wrap"
          >
            <Grid>
            <TextField
                fullWidth
                helperText="Please type the area/location name category here"
                label="Input area name"
                name="area"
                onChange={(e) => setArea(e.target.value)}
                value={area}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
        <Divider/>
        <Grid>
          <h4 style={{display: 'flex', marginLeft: '10px'}}>Areas list</h4>
          {areas.map((res) => (
            <p style={{display: 'flex', marginLeft: '10px'}}>
              {res.name}
            <Button variant='none' style={{padding: 2}}>
            <SeverityPill color={'info'} style={{cursor: 'pointer'}}>
              edit
            </SeverityPill>
            </Button>
            <Button style={{padding: 2}}>
            <SeverityPill color={'error'} style={{cursor: 'pointer'}}>
              delete
            </SeverityPill>
            </Button>
            </p>
          ))}
        </Grid>
      </Card>
      </Grid>
      </Grid>
    </form>
    )
    
  };
  

  export default NotificationEdit