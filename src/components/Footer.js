import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom"; import { useSelector } from "react-redux";

const Footer = () => {
    const categoriesData = useSelector(state => state.fireBaseData.categoryData);


    return (
        <div className="footerBar">
            <div className="container">
                <div className="footer-nav">
                    <nav className="footer-menu">
                        {categoriesData && categoriesData.map(el => <Link key={el.id} to={`/${el.title}`}>{el.title}</Link>)}
                    </nav>

                    <div className="copy">Copyright © 2021 BY ACA TEAM</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;