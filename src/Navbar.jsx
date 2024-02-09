import logo from "/image/logo/logo.png";

export const Navbar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="oh">
                    <span className="oh__inner">
                        <img src={logo} alt="logo" className="logo" />
                    </span>
                </div>
                <div className="navbar-link-container">
                    <button className="menu-link oh unbutton">
                        <span className="oh__inner">PROJECTS</span>
                    </button>
                    <button className="menu-link oh unbutton">
                        <span className="oh__inner">ABOUT</span>
                    </button>
                </div>
            </div>
        </>
    );
};
