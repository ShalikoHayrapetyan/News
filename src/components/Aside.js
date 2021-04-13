import { useSelector } from "react-redux";
import Weather from "./Weather"
import {  Link} from "react-router-dom";



const Aside = () => {

    const allNewsData = useSelector(state => state.fireBaseData.allNewsData);

    return (
        <div className="aside">
            <Weather/>
            {
                allNewsData && allNewsData.slice(0, 15).map(el => (
                    <div key={el.id}>
                        <div><b>{el.date} </b></div>
                        <Link to= {`/news:${el.id}`} >
                        <div className="asideTexts">
                            {el.short_desc}
                        </div>
                        </Link>
                    </div>)
                )
            }
            <div className="aside__banner">
                <img src="https://i.ytimg.com/vi/cyWWNNZD1Gc/maxresdefault.jpg" />
                <img src="https://www.lragir.am/ru/wp-content/uploads/sites/3/2016/10/rus14769640456.jpg" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZInKvI_MxbeqEWxN-b559ywCNFgOsP0Z2UMyc05PqK3wglvT1t_ITin-jInv1xRLfNDM&usqp=CAU" />
                <img src="https://i.pinimg.com/280x280_RS/e1/bd/36/e1bd36b57c8b683413f5a6c543c3e2c7.jpg" />
            </div>
        </div>
    )
}

export default Aside;