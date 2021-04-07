import { useSelector } from "react-redux";

const Aside = () => {

    const allNewsData = useSelector(state => state.fireBaseData.allNewsData);

    return (
        <div className="aside">
            {
                allNewsData && allNewsData.map(el => (
                    <div key={el.id}>
                        <div><b>{el.date} </b></div>
                        <div
                             className="asideTexts">
                            {el.short_desc} </div>

                    </div>
                )
                )
            }




        </div>
    )

}

export default Aside;