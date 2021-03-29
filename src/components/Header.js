const Header = () => {

    return (
        <div className="headerNav">
            <div className="container">
                <div className="headerNav__top">
                    <h2 class="logo">Best news</h2>
                </div>
            </div>
            <div className="container">
                <div className="header__botom">
                    <nav className="navBar">
                        <a href="#">News</a>
                        <a href="#">Sport</a>
                        <a href="#">Culture</a>
                        <a href="#">Politics</a>
                        <a href="#">Medicine</a>
                    </nav>
                    <div className="date">
                        {new Date().toDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;