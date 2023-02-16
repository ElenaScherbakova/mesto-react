import mestoSvg from "../images/mesto.svg";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return <header className="header">
        <img alt="Место"
             className="header__logo"
             src={mestoSvg}/>
        { location.pathname === '/signup' && <div className="header__link">Войти</div> }
        { location.pathname === '/signin' && <div className="header__link">Регистрация</div> }
    </header>
}

export default Header;