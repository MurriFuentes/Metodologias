import React, { useEffect} from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import FriendsTable from "../components/Tabla_Amigos/Friends_Table";

export default function Page_Friends() {
    var FriendList = JSON.parse(localStorage.getItem('userFriends'));
    let history = useHistory();

    useEffect(() => {
        console.log(FriendList)
        
        if (FriendList === null || FriendList.length <= 0) {
            console.log("ESTE USUARIO NO TIENE AMIGOS")
        }

        if (localStorage.getItem('user') === null) {
            history.push("/");
        }
    }, [FriendList, history]);


    return (
        <>
            <div className="container-fluid bg-dark">
                {
                    (FriendList === null || FriendList.length <= 0) ?
                        <Link to="./">
                            <div className="navButton">
                                NO TIENE AMIGOS
                            </div>
                        </Link>
                    :
                        <FriendsTable />
                }
            </div>
        </>
    );
}