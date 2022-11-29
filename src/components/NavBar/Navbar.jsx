import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './NavbarItems';
import { AdmonDrop } from './Dropdown';
import Logo from "../../images/LOGO-BLANCO.png"
import * as icons2 from 'react-icons/fa';

export default function Navbar() {
    const [mobile, setMobile] = useState(false);
    const [togglebar, setTogglebar] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    var [navOptions, setNavOptions] = useState(navItems) ;


    useEffect(() => {
        if (window.innerWidth < 1065) {
            setMobile(true);
        }

        const handleResize = () => {
            if (window.innerWidth < 1065) {
                setMobile(true);
            } else {
                setMobile(false);
                setTogglebar(false);
            }

        };
        
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
            setNavOptions(navItems)
    }, [])

    return (
        <>
            <nav id="navbar">
                <Link to="/" className="navbar-logo" onClick={() => setTogglebar(false)}>
                    <img src={"./"+Logo} alt="logo" className="Logo"/>
                </Link>
                
               
                {!mobile && (
                    <>
                        <ul className="nav-items">
                            {navOptions.map((item) => (
                                item.title === "ADMON" ?
                                <>
                                    <li 
                                        
                                        className={item.cName}
                                        onMouseLeave={()=> setDropdown(false)} 
                                        onMouseEnter={()=> setDropdown(true)}
                                    >
                                    <Link className={item.dName} to={item.path} >{item.title}</Link>
                                    {dropdown && <AdmonDrop/>}
                                    </li> 
                                </>
                                :
                                    <li className={item.cName}>
                                        <Link className={item.dName} to={item.path}>{item.title}</Link>
                                    </li>
                            ))}
                        </ul>
                    </>
                )}


                {mobile && (
                    <div className="toggleButton">
                        {togglebar ? (
                            <icons2.FaTimes onClick={() => setTogglebar(!togglebar)} />
                        ) : (
                            <icons2.FaBars onClick={() => setTogglebar(!togglebar)} />
                        )}
                    </div>
                )}

            </nav>
            <div className="ToggleMenu">
                <ul className={togglebar ? "nav-items-toggled active" : "nav-items-toggled"}>
                    {navOptions
                    .map((item) => {
                        return (
                                <li className={item.dName} onClick={() => setTogglebar(false)}>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>
                                </li>
                        );
                    })}
                    <div onClick={() => setTogglebar(false)}>
                        
                       
                    </div>
                </ul>
            </div>
        </>
    );
}
