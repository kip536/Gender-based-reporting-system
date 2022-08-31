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
import {Link} from 'react-router-dom';
import { getInitials } from '../utils/get-initials';

function UserList() {

  const [selectedUserIds, setSelectedUserIds] = useState([]);
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

    const handleSelectAll = (event) => {
      let newSelectedUserIds;
  
      if (event.target.checked) {
        newSelectedUserIds = users.map((user) => user.user_id);
      } else {
        newSelectedUserIds = [];
      }
  
      setSelectedUserIds(newSelectedUserIds);
    };


    const handleSelectOne = (event, user_id) => {
      const selectedIndex = selectedUserIds.indexOf(user_id);
      let newSelectedUserIds = [];
  
      if (selectedIndex === -1) {
        newSelectedUserIds = newSelectedUserIds.concat(
          selectedUserIds,
          user_id
        );
      } else if (selectedIndex === 0) {
        newSelectedUserIds = newSelectedUserIds.concat(
          selectedUserIds.slice(1)
        );
      } else if (selectedIndex === selectedUserIds.length - 1) {
        newSelectedUserIds = newSelectedUserIds.concat(
          selectedUserIds.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelectedUserIds = newSelectedUserIds.concat(
          selectedUserIds.slice(0, selectedIndex),
          selectedUserIds.slice(selectedIndex + 1)
        );
      }
  
      setSelectedUserIds(newSelectedUserIds);
    };
  


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
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0 &&
                      selectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Name
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Email
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    County
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
                  component = {Link} underline="none" to ={`/users/${res.user_id}`} sx={{textDecoration:'none'}}
                  hover
                  key={res.user_id}
                  selected={selectedUserIds.indexOf(res.user_id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                      checked={selectedUserIds.indexOf(res.user_id) !== -1}
                      onChange={(event) => handleSelectOne(event, res.user_id)}
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
                          {getInitials(res.name)}
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
                      {res.county}
                    </TableCell>
                    <TableCell>
                      {res.location}
                    </TableCell>
                    <TableCell>
                      {res.phone_no}
                    </TableCell>
                    <TableCell>
                      {res.date_created}
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