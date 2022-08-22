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
import MessageToolbar from './MessagesToolbar';
import SeverityPill from '../Home/SeverityPill';
  



function Messages() {


  const [selectedMessageIds, setSelectedMessageIds] = useState([]);
  const [limit, setLimit] = useState([5]);
  const [page, setPage] = useState([]);
  const [messages, setMessages] = useState([]);


  const handleSelectAll = (event) => {
    let newSelectedMessageIds;

    if (event.target.checked) {
      newSelectedMessageIds = messages.map((message) => message.msg_id);
    } else {
      newSelectedMessageIds = [];
    }

    setSelectedMessageIds(newSelectedMessageIds);
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMessageIds.indexOf(id);
    let newSelectedMessageIds = [];

    if (selectedIndex === -1) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds.slice(1));
    } else if (selectedIndex === selectedMessageIds.length - 1) {
      newSelectedMessageIds = newSelectedMessageIds.concat(selectedMessageIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMessageIds = newSelectedMessageIds.concat(
        selectedMessageIds.slice(0, selectedIndex),
        selectedMessageIds.slice(selectedIndex + 1)
      )
    }

    setSelectedMessageIds(newSelectedMessageIds);
  }



  const handleLimitChage = (event) => {
    setLimit(event.target.value);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }


  useEffect (() => {
      const getMessages = async () => {
          const messagesFromServer = await fetchMessages();
          setMessages(messagesFromServer);
      }
      getMessages();
  },[])


  const fetchMessages = async () => {
      const res = await fetch('http://localhost/fgm/getmessages.php');
      const data = await res.json();

      return data
  }


  return (
    <div>
        <MessageToolbar/>
        <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                    checked={selectedMessageIds.length === messages.length}
                    color="primary"
                    indeterminate = {
                      selectedMessageIds.length > 0
                      && selectedMessageIds.length < messages.length
                    }
                    onChange={handleSelectAll}
                    />
                  </TableCell>
                  {/* <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Name
                  </TableCell> */}
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Phone
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Message
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Location
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Title
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Carrier
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Message_id
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Date
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Status
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Action
                  </TableCell>
                  {/* <TableCell style={{fontWeight: 'bold', fontSize: 'medium'}}>
                    Report
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.slice(0, limit).map((res) => (
                  <TableRow
                  hover
                  key={res.msg_id}
                  selected={selectedMessageIds.indexOf(res.msg_id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                      checked={selectedMessageIds.indexOf(res.msg_id) !== -1}
                      onChange={(event) => handleSelectOne(event, res.msg_id)}
                      value="true"
                      />
                    </TableCell>
                    <TableCell>
                      {res.sender_phone}
                    </TableCell>
                    <TableCell>
                      {res.message}
                    </TableCell>
                    <TableCell>
                      {res.case_area}
                    </TableCell>
                    <TableCell>
                      {res.case_title}
                    </TableCell>
                    <TableCell>
                      {res.carrier}
                    </TableCell>
                    <TableCell>
                      {res.carrier_msgid}
                    </TableCell>
                    <TableCell>
                      {res.date}
                    </TableCell>
                    <TableCell>
                    <SeverityPill
                      color={(res.status === 'unread' && 'success')
                      || (res.status === 'refunded' && 'error')
                      || 'warning'}
                    >
                      {res.status}
                    </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                      color={(res.action === 'resolved' && 'success')
                      || (res.action === 'unresolved' && 'error')
                      || 'warning'}
                      >
                        {res.action}
                      </SeverityPill>
                    </TableCell>
                    {/* <TableCell>
                      {res.report}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
        component="div"
        count={messages.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChage}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </Card>
    </div>
  )
}
// Messages.propTypes = {
//   messages: PropTypes.array.isRequired
// }
export default Messages