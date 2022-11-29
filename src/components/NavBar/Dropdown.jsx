import { Link } from 'react-router-dom';
import { useEffect ,useState } from 'react';
import {AdmonItems} from './AdmonItems';
import {UserItems} from './UserItems';
import './Dropdown.css';

export function AdmonDrop () {
    var [navOptions, setNavOptions] = useState(UserItems) ;
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        var username = window["username"];
        if (username === "admin"){
            setNavOptions(AdmonItems);
        }else{
            setNavOptions(UserItems);
        }

    }, [])

    return (
        <>
        <ul className={dropdown ? "Admon-submenu clicked" : "Admon-submenu"} onClick={() => setDropdown(!dropdown)}>
            {navOptions.map((item) => (
                <li key={item.id} className={item.dName} onClick={() => setDropdown(false)}>
                    <Link to={item.path}>{item.title}</Link>
                </li>
            ))}
        </ul>
        </>
    )
}
