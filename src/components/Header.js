import mestoSvg from "../images/mesto.svg";

const Header = () =>
    <header className="header">
            <img alt="Место"
                 className="header__logo"
                 src={mestoSvg} />

    </header>

export default Header;