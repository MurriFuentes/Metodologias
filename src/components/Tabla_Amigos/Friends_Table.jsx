import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  
  { field: 'firstName', headerName: 'Nombre', width: 200 },
  { field: 'lastName', headerName: 'Correo', width: 200 },
  
];

const rows = [
  { id: 1, lastName: 'Juan@hotmail.com', firstName: 'Juan Manuel Felix Rubio', age: 35 },
  
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}