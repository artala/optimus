import React,{ useState, useEffect } from "react";
import {Container,Row , Col} from 'react-bootstrap';
import EndpointService from "../services/endpointService";
import './Dashboard.css';
import InboundServiceList from "./inboundServiceList";
import QueuesList from "./queuesList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const Dashboard = () => {

  const [trustOneData, setTrustOneData] = useState();
  const [trustTwoData, setTrustTwoData] = useState();
  const [trustThreeData, setTrustThreeData] = useState();
  const [loadingTrust, setLoadingTrust] = useState(false);
  const [refreshTime, setRefreshTime] = useState(10);
  const [time, setTime] = useState(Date.now());

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
    <div className="mainContainer">
      <Container fluid className="fullHeight">
      <div style= {{position : "absolute", right: '10px', width:'150px'}}>
        <TextField 
          label="Refresh Time(Secs)" 
          color="info" 
          fullWidth
          focused 
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
    </div>
  );
};

export default Dashboard;





