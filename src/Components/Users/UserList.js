import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import UserListToolBar from './UserListToolBar';
// import {Link} from 'react-router-dom';

function UserList() {

  const [users, setUsers] = useState([])


  

  useEffect(() => {
    const getusers = async () => {
      const areasFromServer = await fetchUsers()
      setUsers(areasFromServer)
      console.log(areasFromServer)
      
    }

    getusers()
  }, []);


    const fetchUsers = async () => {
      const result = await fetch('http://localhost/fgm/getusers.php');
      const data = await result.json()
      console.log('data recieved is:', data)

      return data
      
    }

  // console.log('users are:', users)
  // console.log('users no. is:', users.length)
  


  return (
    <div>
      <UserListToolBar/>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                    // TODO
                    />
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Name
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Email
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Location
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Phone
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Registration date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((res) => (
                  
                  <TableRow
                  // component = {Link} to={`/users/${res.user_id}`}
                  hover
                  key={res.user_id}
                  selected={''}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                      checked=''
                      onChange={''}
                      value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                      >
                        <Avatar
                        src=''
                        sx={{ mr:2 }}
                        >
                          {/* TODO */}
                        </Avatar>
                        <Typography
                        color='textPrimary'
                        variant='body1'
                        >
                          {res.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {res.email}
                    </TableCell>
                    <TableCell>
                      {res.location}
                    </TableCell>
                    <TableCell>
                      {res.phone_no}
                    </TableCell>
                    <TableCell>
                      date
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
        component="div"
        count={users.length}
        onPageChange={''}
        onRowsPerPageChange={''}
        page={''}
        rowsPerPage={''}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </Card>
    </div>
  )
}

export default UserList;