import React,{ useContext, useState, useEffect } from "react";
import {Container,Row , Col} from 'react-bootstrap';
import EndpointService from "../services/endpointService";
import './Dashboard.css';
import InboundServiceList from "./inboundServiceList";
import QueuesList from "./queuesList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SettingsIcon from '@mui/icons-material/Settings';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { ThemeContext } from "../themeContext";

import { MaterialUISwitch } from '../components/MaterialUISwitch';

const Dashboard = (props) => {

  const [trustOneData, setTrustOneData] = useState();
  const [trustTwoData, setTrustTwoData] = useState();
  const [trustThreeData, setTrustThreeData] = useState();
  const [loadingTrust, setLoadingTrust] = useState(false);
  const [refreshTime, setRefreshTime] = useState(10);
  const [time, setTime] = useState(Date.now());

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  useEffect(() => {
    refreshAllData()
  }, []);

  useEffect(() => {
    const interval = setInterval(() => refreshAllData(), refreshTime *1000);
    return () => {clearInterval(interval)};
  }, [refreshTime]);

  const refreshAllData = () => {
    setTime(Date.now())
    setLoadingTrust(true);
    Promise.all([
    retrieveTrustData(1,setTrustOneData),
    retrieveTrustData(2,setTrustTwoData),
    retrieveTrustData(3,setTrustThreeData)])
    .then(() => {
      setLoadingTrust(false)
    });
  }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const retrieveTrustData = (id, setState) => {

    EndpointService.getTrustData(id)
      .then(response => {
        setState(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    boxShadow: 24,
    bgcolor: 'background.paper',
    p: 1,
  };
  
  return (
    <div className="mainDashbaordContainer">
      <Container fluid className="fullHeight">
      <div style={{position:"absolute", right:"10px"}}>
        <IconButton onClick={handleClick('bottom-end')}>
          <SettingsIcon color="info"/>
        </IconButton>
      </div>
      { <Modal
            open={loadingTrust}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}><CircularProgress size={40} color="secondary"/></Box>
        </Modal> 
      }
        <Row className="fullHeight">
          {/* Trust one */}
          <Col>
            <Row className="halfHeight">
              <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}} >
                <p><strong>Queues ({new Date(time).toLocaleString()} )</strong></p>
                </div>
              {trustOneData?.queue_details && <QueuesList data={trustOneData.queue_details}/>}
            </Row>
            <Row className="halfHeight">
              <p><strong>Inbound Services ({new Date(time).toLocaleString()} )</strong></p>
              {trustOneData?.inbound_services && <InboundServiceList data={trustOneData.inbound_services}/>}
            </Row>
          </Col>

          {/* Trust two */}
          <Col>
            <Row className="halfHeight">
              <p><strong>Queues ({new Date(time).toLocaleString()} )</strong></p>
              {trustTwoData?.queue_details && <QueuesList data={trustTwoData.queue_details}/>}
            </Row>
            <Row className="halfHeight">
              <p><strong>Inbound Services ({new Date(time).toLocaleString()} )</strong></p>
              {trustTwoData?.inbound_services && <InboundServiceList data={trustTwoData.inbound_services}/>}
            </Row>
          </Col>

          {/* Trust three */}
          <Col>
            <Row className="halfHeight">
              <p><strong>Queues ({new Date(time).toLocaleString()} )</strong></p>
              {trustThreeData?.queue_details && <QueuesList data={trustThreeData.queue_details}/>}
            </Row>
            <Row className="halfHeight">
              <p><strong>Inbound Services ({new Date(time).toLocaleString()} )</strong></p>
              {trustThreeData?.inbound_services && <InboundServiceList data={trustThreeData.inbound_services}/>}
            </Row>
          </Col>
        </Row>
      </Container> 

      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={24}>
              <Typography sx={{ p: 2 }}>
                <div className="settingsHeaderContainer"><div>Settings</div>
                <button className='buttonStyle' onClick={toggleTheme}>
                  <MaterialUISwitch sx={{ m: 2 }} defaultChecked={ theme === 'dark'} />
                </button>
                </div>
                
                <div>
                  <TextField 
                    label="Refresh Time(Secs)" 
                    fullWidth
             
                    size="small"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={refreshTime}
                    onChange={(event) => {
                      if(!isNaN(event.target.value))
                      {
                        setRefreshTime(event.target.value);
                      }
                    }}
                  />
                </div>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default Dashboard;





