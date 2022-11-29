import React, { useState } from "react";
import LoadingButtonUnstyled  from '@mui/lab/LoadingButton';

export default function Register() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    
    function handleClick() {
        setLoading(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass !== confirmPass) {
            alert("Passwords don't match");
        } else {
            // make API call
        }
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre Completo</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" placeholder="Ejemplo: Juan Perez" name ="name"/>
            <label htmlFor="email">Correo Electronico</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
            <label htmlFor="password">Contraseña</label>
            <input required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Repite contraseña</label>
            <input value={confirmPass} onChange={(e) => setconfirmPass(e.target.value)} type="password" placeholder="********" id="passwordMatch" name="passwordMatch" />
            <button type="submit">
                <LoadingButtonUnstyled 
                    size="small"
                    onClick={handleClick}
                    loading={loading}
                    fullWidth={true}
                    >
                    Registrarme
                </LoadingButtonUnstyled >
            </button>
        </form>
        <button className="link-btn">Ya tienes una cuenta? Inicia sesion aqui.</button>
    </div>
    )
}