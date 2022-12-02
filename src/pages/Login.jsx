import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { usersData } from '../DB/Users'
import LoadingButtonUnstyled  from '@mui/lab/LoadingButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
        if (localStorage.getItem('newDataBase') === null){
            localStorage.setItem('newDataBase', JSON.stringify(usersData));
        }else{
            console.log('Ya se inicializo la BD', JSON.parse(localStorage.getItem('newDataBase')));
        }
    }, []);

    function handleClick() {
        if (email & pass !== ''){
            setLoading(true);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        var newuser = JSON.parse(localStorage.getItem('newDataBase'));
        const consult = newuser.find(el=>el.email === email & el.password === pass) ? true : false

        if (consult === false ){
            alert("Cuenta no encontrada");
        } else {
            const employee = newuser.find(obj => {
                return obj.email === email;
            });
            localStorage.setItem('user', employee.name);
            localStorage.setItem('userEmail', employee.email);
            localStorage.setItem('usertype', employee.usertype);
            localStorage.setItem('userGroups', JSON.stringify(employee.groups));
            localStorage.setItem('userFriends', JSON.stringify(employee.friends));
            localStorage.setItem('userNotifications', JSON.stringify(employee.notifications));
            alert("Bienvenido " + localStorage.getItem("user"));
            window.location.href = "./";
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Identificate</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electronico</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
                <label htmlFor="password">Contraseña</label>
                <input required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
              
                <button type="submit">  
                    <LoadingButtonUnstyled 
                        onClick={handleClick}
                        type="submit"
                        loading={loading}
                        fullWidth={true}
                        >
                        Iniciar Sesion
                    </LoadingButtonUnstyled >
                </button>
            </form>
            <Link to="/SignUp" onClick={handleClick}> <button className="link-btn">Aun no posees una cuenta? Registrate aqui.</button></Link>
        </div>
    )
}