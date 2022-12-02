import React, { forwardRef , useState} from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import {
  DeleteOutline,
  ChevronLeft
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
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
};

const columns = [
  
  { field: 'name', title: 'Nombre'},
  { field: 'email', title: 'Correo'},
  
];

const data = JSON.parse(localStorage.getItem('userFriends'));

export default function FriendsTable() {
  const styles = useStyles();
  const notificationData = {
    type: "friendRequest",
    data: {
      FromName: localStorage.getItem('user'),
      FromEmail: localStorage.getItem('userEmail'),
    },
  }
  
  const [modalAgregar, setModalAgregar] = useState(false);
  var [agregarPorCorreo, setAgregarPorCorreo] = useState([""])
  const [dataBase, setDataBase] = useState(JSON.parse(localStorage.getItem('newDataBase')))

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  }

  const enviarSolicitud = (e) => {
    e.preventDefault();
    const consultEmail = dataBase.find(el=>el.email === agregarPorCorreo) ? true : false
    if (consultEmail === false || consultEmail  === localStorage.getItem('userEmail')){
        alert("Cuenta no encontrada, ingrese otro correo");
    } else {

      const userFound = dataBase.find(obj => {
        return obj.email === agregarPorCorreo;
      });

      setDataBase(prevState => {
        const newState = prevState.map(obj => {
          console.log(obj)
          if (obj.email === userFound.email) {
            return {...obj.notifications.push(notificationData)};
          }
          return obj;
        });
        
        return newState;
      });

      localStorage.setItem('newDataBase', JSON.stringify(dataBase));
      
      alert("Solicitud enviada");
      setAgregarPorCorreo=('')
      abrirCerrarModalAgregar();
    }
  }

  const bodyAgregar =(
    <div className={styles.modal}>
      <h3>Agregar un amigo</h3>
      <TextField value={agregarPorCorreo} onChange={(e) => setAgregarPorCorreo(e.target.value)} placeholder="Ingresa su correo" className={styles.inputMaterial}/> 
      <br/>
      <div align='right'>
        <Button onClick={enviarSolicitud} color='primary'>Enviar Solicitud</Button>
        <Button onClick={abrirCerrarModalAgregar}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <>
      <br/>
      <button onClick={abrirCerrarModalAgregar}>Agregar amigo</button>
      <br/><br/>
      <MaterialTable
        columns={columns}
        data={data}
        title={"Amigos"}
        actions={[
          {
            icon: () => <DeleteOutline/>,
            tooltip: 'Eliminar amigo',
            onClick: (event, rowData) => {
              const rowJson = JSON.stringify(rowData, null, 2);
              alert(`Seguro que deseas eliminar a : ${rowJson}`);
            },
          },
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
      open={modalAgregar}
      onClose={abrirCerrarModalAgregar}
      >
        {bodyAgregar}
      </Modal>

    </>
  );
}