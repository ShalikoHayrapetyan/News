import { useSelector } from "react-redux";
import Weather from "./Weather";
import { Link } from "react-router-dom";

const Aside = () => {
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);

  return (
    <div className="aside">
      <Weather />
      {allNewsData &&
        allNewsData.slice(0, 10).map((el) => (
          <div key={el.id}>
            <div>
              <b>{el.date} </b>
            </div>
            <Link to={`/news:${el.id}`}>
              <div className="asideTexts">{el.short_desc}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Aside;
