import React, { useEffect} from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import NotificationsTable from "../components/Tabla_Notificaciones/NotificationsTable";
const data = JSON.parse(localStorage.getItem('userNotifications'));

export default function Page_Notifications() {
    var GroupList = JSON.parse(localStorage.getItem('userNotifications'));
    let history = useHistory();

    useEffect(() => {
        
        if (GroupList === null || GroupList.length <= 0) {
            console.log("ESTE USUARIO NO TIENE NOTIFICACIONES")
        }

        if (localStorage.getItem('user') === null) {
            history.push("/");
        }
    }, [GroupList, history]);


    return (
        <>
            <div className="container-fluid bg-dark">
                {
                    (GroupList === null || GroupList.length <= 0) ?
                        <Link to="./">
                            <div className="navButton">
                                NO TIENE NOTIFICACIONES
                            </div>
                        </Link>
                    :
                        <NotificationsTable />
                }
            </div>
        </>
    );
}