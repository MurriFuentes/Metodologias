import React, { useState } from "react";
import LoadingButtonUnstyled  from '@mui/lab/LoadingButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    
    function handleClick() {
        setLoading(true);
        setTimeout('', 5000);
        window.location.href = "./";
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Identificate</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electronico</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
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
            <button className="link-btn">Aun no posees una cuenta? Registrate aqui.</button>
        </div>
    )
}