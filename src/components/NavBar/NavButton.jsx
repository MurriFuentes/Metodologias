import { Link, useRouteMatch} from "react-router-dom";

export default function NavButton() {
    var isLogged = false;
    const match = useRouteMatch("/Login");

    if (localStorage.getItem('user') === null){
        isLogged = false;
    }else{
        isLogged = true;
    }

    const handleClick = e => {
        localStorage.removeItem("user")
        localStorage.removeItem("usertype")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userGroups")
        localStorage.removeItem("userFriends")
        localStorage.removeItem("userNotifications")
        window.location.href = "./"
        window.location.reload();
    }
    
    const renderLoginButtons = ({isLogged}) => {
        console.log(localStorage.getItem("user"))
        return isLogged
                ? <Link to="./" onClick={handleClick}>
                    <div className="navButton">
                        Logout
                    </div>
                </Link>
                : <Link to="./Login">
                    <div className="navButton">
                        Login
                    </div>
                </Link>
    }
    
    const content = match
    ? null
    : renderLoginButtons({isLogged})
    
    return (
        <header>
          {content}
        </header>
      )
}