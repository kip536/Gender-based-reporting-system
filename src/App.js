import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Messages from './Components/Messages/Messages';
import { theme } from './Components/Theme/index';
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './Components/Home/Dashboard';
import DashboardLayout from './Components/Home/DashboardLayout';
import UserList from './Components/Users/UserList';
import NotificationEdit from './Components/Settings/NotificationEdit';
import Account from './Components/Account/Account';
import { AddUser } from './Components/Users/AddUser';
import Errordialog from './Components/Errordialog/Errordialog';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Logout from './Components/Logout/Logout';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Reports from './Components/Reports/Reports';
import Messageinfo from './Components/Messages/Messageinfo';


const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);


async function loginuser(credentials) {
  return fetch('http://localhost/fgm/signin.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
  
}




const App = () => {

  
  const [open, setOpen] = useState(false);
  const [gottendata, setGottendata] = useState('')
  const [correct, setCorrect] = useState([]);
  const [userdetails, setUserdetails] = useState(null)


  

  const handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    
    setUserdetails({
      ...userdetails,
      [event.target.id]: value
    });
    
    
  };

  const handleDetails= async (e) =>{
    e.preventDefault()
    console.log('userdetails:',userdetails)
    const token= await loginuser(userdetails);
    console.log('real token:', token)

    if (token === []) {
      
      console.log('woopssssssssss')
      return
    } else {
      localStorage.setItem('token', JSON.stringify(token))
    }
    
    
    
    
    // console.log('token:',token)
  }

  

  const token = localStorage.getItem('token')
  console.log('token:',token)

  
  

  if (!token) {
    return <Login
    handleDetails={handleDetails}
    handleChange={handleChange}
    // setToken={setToken}
    />
  }
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handlelogout () {
    localStorage.clear();
  }

  return (
    <div>
      <ThemeProvider theme = {theme} >
      <BrowserRouter>
      <Main
      open={!open}
      >
      <DashboardLayout
      open={open}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}
      />
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        {/* <Route path='/dashboard' element={</>}/> */}
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/reports' element={<Reports/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/settings' element={<NotificationEdit/>}/>
        <Route path='/account' element={<Messageinfo/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/dialog' element={<Errordialog/>}/>
        <Route path='/logout' element={<Logout handlelogout={handlelogout}/>}/>
        <Route path='/404' element={<ErrorPage/>}/>
      </Routes>
      </Main>
      </BrowserRouter>
      {/* <Footer/> */}
      </ThemeProvider>
      
    </div>
  );
};

export default App;
