import React, {useContext} from "react";
import { DataGrid } from '@mui/x-data-grid';
import './inboundServiceList.css'
import { ThemeContext } from "../themeContext";

const InboundServiceList = (props) => {
const { theme } = useContext(ThemeContext);
const columns = [
  {
    field: 'service_name',
    headerName: 'Service Name',
    headerClassName : theme === 'dark' ? 'darkHeaderClass' : 'lightHeaderClass',
    cellClassName: theme === 'dark' && 'darkCell',
    flex:1
  },
  {
    field: 'service_delay_time',
    headerName: 'Service Delay Time',
    headerClassName : theme === 'dark' ? 'darkHeaderClass' : 'lightHeaderClass',
    cellClassName: theme === 'dark' && 'darkCell',
    flex:1
  },
];
  return (
    <div className = {theme} style={{ display: 'flex', height: '85%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={props.data}
          getRowId={(row) =>  row.service_name}
          columns={columns}
          rowHeight={30}
          headerHeight={30}
          pageSize={100}
          hideFooter={true}
        />
      </div>
      </div>
  );
};

export default InboundServiceList;





