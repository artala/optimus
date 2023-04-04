import React, {useContext} from "react";
import { DataGrid } from '@mui/x-data-grid';
import './queuesList.css'
import { ThemeContext } from "../themeContext";

const QueuesList = (props) => {

const { theme } = useContext(ThemeContext);
const columns = [
  {
    field: 'queue_name',
    headerName: 'Queue Name',
    headerClassName : theme === 'dark' ? 'darkHeaderClass' : 'lightHeaderClass',
    cellClassName: theme === 'dark' && 'darkCell',
    flex:1
  },
  {
    field: 'queue_pndng_count',
    headerName: 'Queue Pending Count',
    headerClassName : theme === 'dark' ? 'darkHeaderClass' : 'lightHeaderClass',
    cellClassName: theme === 'dark' && 'darkCell',
    flex:1
  },
];
  return (
    <div style={{ display: 'flex', height: '85%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={props.data}
          getRowClassName={(params) => {
            return Number(params.row.queue_pndng_count) > Number(props.limit) ? "highlight" : "";
          }}
          getRowId={(row) =>  row.queue_name}
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

export default QueuesList;





