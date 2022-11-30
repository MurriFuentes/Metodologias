import React, { useEffect} from "react";
import {Link} from "react-router-dom";
import CollapsibleTable from "../components/Tabla_Grupos/Group_Table";

export default function Page_Groups() {
    var GroupList = JSON.parse(localStorage.getItem('userGroups'));

    useEffect(() => {
        var GroupList = JSON.parse(localStorage.getItem('userGroups'));
        console.log(GroupList)
        
        if (GroupList === null || GroupList.length <= 0) {
            console.log("ESTE USUARIO NO TIENE GRUPOS")
        }
    }, []);


    return (
        <>
            <div className="container-fluid bg-dark">
                {
                    (GroupList === null || GroupList.length <= 0) ?
                        <Link to="./">
                            <div className="navButton">
                                NO TIENE GRUPOS
                            </div>
                        </Link>
                    :
                        <CollapsibleTable />
                }
            </div>
        </>
    );
}