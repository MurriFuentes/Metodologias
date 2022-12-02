import React, { forwardRef , useState} from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import {
  DeleteOutline,
  ChevronLeft,
  AddBox,
  Check,
  Clear
} from "@mui/icons-material";
import {Modal, TextField, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid %000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));

const TABLE_ICONS = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
};

const columns = [
  { field: 'type', title: 'Tipo de Notificacion'},
  { field: 'FromName', title: 'Remitente'},
  { field: 'FromEmail', title: 'Correo'},
];

export default function NotificationsTable() {
  const styles = useStyles();
  const notificationData = {
    name: localStorage.getItem('nameSelected'),
    email: localStorage.getItem('emailSelected'),
  }
  
  const [modalAceptar, setModalAceptar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [dataBase, setDataBase] = useState(JSON.parse(localStorage.getItem('newDataBase')));
  var [data, setData] = useState(JSON.parse(localStorage.getItem('userNotifications')))

  const abrirCerrarModalAceptar = (name, email, n) => {
    if(n===1){
        localStorage.setItem('nameSelected', name)
        localStorage.setItem('emailSelected', email)
    }

    setModalAceptar(!modalAceptar);
  }

  const abrirCerrarModalEliminar = (name, email, n) => {
    if(n===2){
        localStorage.setItem('nameSelected', name)
        localStorage.setItem('emailSelected', email)
    }

    setModalEliminar(!modalEliminar);
  }

  const AceptarSolicitud = (e) => {
    e.preventDefault();

      const userFound = dataBase.find(obj => {
        return obj.email === localStorage.getItem('userEmail');
      });

      setDataBase(prevState => {
        const newState = prevState.map(obj => {
          
          if (obj.email === userFound.email) {
            return {...obj.friends.push(notificationData)};
          }
          return obj;
        });
        
        return newState;
      });

      localStorage.setItem('newDataBase', JSON.stringify(dataBase));

      var newuser = JSON.parse(localStorage.getItem('newDataBase'));

    const employee = newuser.find(obj => {
        return obj.email === localStorage.getItem('userEmail');
    });

    var friends = employee.friends;

    localStorage.setItem('userFriends', JSON.stringify(friends));
    
      abrirCerrarModalAceptar();
      alert("Amigo añadido");
      localStorage.removeItem("nameSelected")
      localStorage.removeItem("emailSelected")
      EliminarSolicitud()
  }

  const EliminarSolicitud = (e) => {
    e.preventDefault();

    
    console.log(localStorage.getItem("nameSelected"));

    const newData = data.filter(noti => noti.FromEmail !== localStorage.getItem("emailSelected"))
    console.log(newData)
    setData(newData)
    localStorage.setItem('userNotifications', JSON.stringify(newData));
    console.log(localStorage.getItem("userEmail"))
    
    setDataBase(prevState => {
        const newState = prevState.map(obj => {
          console.log(obj)
          if (obj.email === localStorage.getItem("userEmail")) {
            return obj.notifications === data;
          }
          return obj;
        });
        
        return newState;
      });
      
    localStorage.setItem('newDataBase', JSON.stringify(dataBase));
    alert("Solicitud Eliminada");
    localStorage.removeItem("nameSelected")
    localStorage.removeItem("emailSelected")
    abrirCerrarModalEliminar();
    
  }

  const bodyAceptar =(
    <div className={styles.modal}>
      <h3>Estas seguro que deseas aceptar esta Solicitud?</h3>
      <br/>
      <div align='right'>
        <Button onClick={AceptarSolicitud} color='primary'>Aceptar</Button>
        <Button onClick={abrirCerrarModalAceptar}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar  =(
    <div className={styles.modal}>
      <h3>Estas seguro que deseas eliminar esta notificacion?</h3>
      <br/>
      <div align='right'>
        <Button onClick={EliminarSolicitud} color='primary'>Eliminar</Button>
        <Button onClick={abrirCerrarModalEliminar}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <>
      <MaterialTable
        columns={columns}
        data={data}
        title={"Notificaciones"}
        actions={[
            {
                icon: () => <AddBox/>,
                tooltip: 'Aceptar solicitud',
                onClick: (event, rowData) => abrirCerrarModalAceptar(rowData.FromName, rowData.FromEmail, 1)
                
            },
            {
                icon: () => <DeleteOutline/>,
                tooltip: 'Eliminar solicitud',
                onClick: (event, rowData) => abrirCerrarModalEliminar(rowData.FromName, rowData.FromEmail, 2)
            } 
        ]}
        components={{
          Toolbar: (props) => {
            return (
              <div style={{ backgroundColor: '#99e6ff' }}>
                <MTableToolbar {...props} />
              </div>
            );
          },
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header:{
            actions: ''
          }
        }}
      />

      <Modal
      open={modalAceptar}
      onClose={abrirCerrarModalAceptar}
      >
        {bodyAceptar}
      </Modal>

      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
      >
        {bodyEliminar}
      </Modal>

    </>
  );
}