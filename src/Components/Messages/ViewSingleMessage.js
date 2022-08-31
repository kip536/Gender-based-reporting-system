import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Avatar, Box, Divider, Grid, Typography, TextField } from '@mui/material';
import axios from "axios";
import { getInitials } from '../utils/get-initials';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


const actions = [
  {
    value: "----",
    label: "----",
  },
  {
    value: "Resolved",
    label: "Resolved",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Unresolved",
    label: "Unresolved",
  },
];

const cases = [
  {
    value: "----",
    label: "----",
  },
  {
    value: "FGM",
    label: "FGM",
  },
  {
    value: "Child labour",
    label: "Child labour",
  },
  {
    value: "Domestic violence",
    label: "Domestic violence",
  },
  {
    value: "Police brutality",
    label: "Police brutality",
  },
];


export default function SingleMessageInfo() {
  const [open, setOpen] = React.useState(true);
  const [messagedata, setMessagedata] = React.useState([]);
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [area, setArea] = React.useState("");
  const [type, setType] = React.useState("");
  const [carrier, setCarrier] = React.useState("");
  const [carriermsgid, setCarriermsgid] = React.useState("");
  const [action, setAction] = React.useState("");
  const [report, setReport] = React.useState("");
  const [date, setDate] = React.useState("");
  const [updatedby, setUpdatedby] = React.useState("");
  const [typedreport, setTypedreport] = React.useState("");


  const { user, dispatch } = useContext(AuthContext);
  


  const [scroll, setScroll] = React.useState('paper');
  const urllocation = useLocation();
  const path = urllocation.pathname.split("/")[2];
  const url = `https://localhost/message/${path}`;

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const fetchMessage = async () => {
    let id = { msg_id: path };
    console.log(id);
    const res = await axios.post("http://localhost/fgm/viewonemessage.php", id);
    const data = res.data

    setMessagedata(data);
    setPhone(data.map((res)=> res.sender_phone));
    setMessage(data.map((res)=> res.message));
    setArea(data.map((res)=> res.case_area));
    setType(data.map((res)=> res.case_title));
    setCarrier(data.map((res)=> res.carrier));
    setCarriermsgid(data.map((res)=> res.carrier_msgid));
    setAction(data.map((res)=> res.action));
    setReport(data.map((res)=> res.report));
    setDate(data.map((res)=> res.date));
    setUpdatedby(data.map((res)=> res.updated_by));
  };

  React.useEffect(() => {
    fetchMessage();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost/fgm/updatemessage.php", {
      msg_id: path,
      category: type,
      action: action,
      report: typedreport,
      updatedby: user.name,
      date: Date()
    });
    setTypedreport("");
    
  };

  return (
    <div>
      <form autoComplete="off">
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Message info</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid style={{display: 'flex', width: '550px'}}>
            <Grid style={{flex:'50%', flexDirection:'column', marginRight:'20px'}}>
            <Grid>Phone no.<p style={{color:'black'}}>{phone}</p></Grid>
            <Divider/>
            <Grid>Message<p style={{color:'black'}}>{message}</p></Grid>
            <Divider/>
            <Grid>Case type<p style={{color:'black', display:'flex'}}>
              <p style={{marginRight:'10px'}}>{type}</p>
            <TextField
                fullWidth
                onChange={(e) => setType(e.target.value)}
                name="type"
                label="select to update"
                required
                select
                SelectProps={{ native: true }}
                // variant="none"
              >
                {cases.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
              </p></Grid>
            <Divider/>
            <Grid>Area<p style={{color:'black'}}>{area}</p></Grid>
            <Divider/>
            </Grid>
            <Grid style={{flex:'50%', flexDirection:'column', marginLeft:'20px'}}>
            <Grid>Action<p style={{color:'black', display:'flex'}}>
            <p style={{marginRight:'10px'}}>{action}</p>
            <TextField
                fullWidth
                onChange={(e) => setAction(e.target.value)}
                name="action"
                label="select to update"
                required
                select
                SelectProps={{ native: true }}
                // variant="none"
              >
                {actions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
              </p></Grid>
            <Divider/>
            <Grid>Carrier<p style={{color:'black'}}>{carrier}</p></Grid>
            <Divider/>
            <Grid>Carrier msg-id<p style={{color:'black'}}>{carriermsgid}</p></Grid>
            <Divider/>
            <Grid>Date<p style={{color:'black'}}>{date}</p></Grid>
            <Divider/>
            </Grid>
            </Grid>
            <Grid><h4>Report</h4></Grid>
            <Grid>
              {messagedata.map((res) => (
                <Box style={{display:'flex'}}>
                <Avatar>{getInitials(res.updated_by)}</Avatar>
                <Box style={{flexDirection:'column', marginLeft:'20px'}}>
                <Typography>{res.updated_by}</Typography>
                <Typography style={{display:'flex'}}><p style={{marginTop:'0px', color:'green'}}>last updated:  </p>{res.report_update_date}</Typography>
                </Box>
                </Box>
              ))}
            </Grid>
            <Grid><p style={{color:'black'}}>{report}</p></Grid>
            <Grid>
              <TextField
                fullWidth
                helperText="Please type your report here"
                label="Type report"
                name="report"
                onChange={(e) => setTypedreport(e.target.value)}
                value={typedreport}
                required
                variant="outlined"
              />
            </Grid>
            {/* {[...new Array(1)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to={"/messages"} style={{textDecoration:'none'}}>
          <Button onClick={handleClose}>Cancel</Button>
          </Link>
          <Button onClick={handleUpdate} type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}