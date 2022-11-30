import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { usersData } from '../DB/Users'
import LoadingButtonUnstyled  from '@mui/lab/LoadingButton';

const initialState = {
        name: "",
        password: "",
        email: "",
        date: "29/11/2022",
        usertype: "USER",
        friends: {
        },
        groups: [
        ],
  };

export default function Register() {
    const [formState, setFormState] = useState(initialState);
    const [confirmPass, setconfirmPass] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('newDataBase') === null){
            localStorage.setItem('newDataBase', JSON. stringify(usersData));
        }else{
            console.log('Ya se inicializo la BD', JSON.parse(localStorage.getItem('newDataBase')));
        }
    }, []);

    function handleClick() {
        setLoading(true);
    }

    const onChange = (event) => {
        setFormState((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        var newuser = JSON.parse(localStorage.getItem('newDataBase'));
        const consult = newuser.find(el=>el.email === formState.email) ? true : false

        if (confirmPass === formState.password) {
            if (consult === false ){
                alert("REGISTRANDO");
                newuser.push(formState);
                localStorage.setItem('newDataBase', JSON. stringify(newuser));
                setFormState(initialState);
            } else {
                alert("El correo ya existe, ingrese otro correo porfavor.");
            }
            
        } else {
            alert("Las contraseñas no coinciden");
        }
        setLoading(false);
    }

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre Completo</label>
            <input required type="name" name="name" value={formState.name} onChange={onChange}  placeholder="Ejemplo: Juan Perez" id="name" />
            <label htmlFor="email">Correo Electronico</label>
            <input required type="email" name="email" value={formState.email} onChange={onChange} placeholder="tucorreo@gmail.com" id="email" />
            <label htmlFor="password">Contraseña</label>
            <input required type="password" name="password"value={formState.password} onChange={onChange} placeholder="********" id="password" />
            <label htmlFor="passwordConfirm">Repite contraseña</label>
            <input type="password" value={confirmPass} onChange={(e) => setconfirmPass(e.target.value)} placeholder="********" id="passwordMatch" name="passwordMatch" />
            <button type="submit">
                <LoadingButtonUnstyled 
                    disabled
                    size="small"
                    onClick={handleClick}
                    loading={loading}
                    fullWidth={true}
                    >
                    Registrarme
                </LoadingButtonUnstyled >
            </button>
        </form>
        <Link to="/Login" onClick={handleClick} ><button className="link-btn">Ya tienes una cuenta? Inicia sesion aqui.</button></Link>
    </div>
    )
}