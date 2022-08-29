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
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Logout from './Components/Logout/Logout';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Reports from './Components/Reports/Reports';
import Messageinfo from './Components/Messages/Messageinfo';
import { AuthContext } from './Components/Context/AuthContext';
import { UpdateUserForm } from './Components/Users/UpdateUser';
import SingleMessageInfo from './Components/Messages/ViewSingleMessage';


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





const App = () => {

  
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
   

  if (!user) {
    return <Login/>
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
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/reports' element={<Reports/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/settings' element={<NotificationEdit/>}/>
        <Route path='/account' element={<Messageinfo/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path = "/users/:userId" element ={<UpdateUserForm/>}/>
        <Route path = "/message/:msg_Id" element ={<SingleMessageInfo/>}/>
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
