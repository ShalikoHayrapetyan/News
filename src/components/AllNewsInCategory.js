import React, { useMemo, useState } from "react";
import { Redirect, Route, Switch, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";
import TablePagination from "@material-ui/core/TablePagination";

const AllNewsInCategory = () => {
  const allNewsData = useSelector((state) => state.fireBaseData.allNewsData);
  
  const [paging, setPaging] = useState({
    current: 0,
    countPerPage: 16,
  });
  let {catTitle} = useParams();

  const changeRowsPerPage = (e) => {
    setPaging((current) => ({
      ...current,
      countPerPage: e.target.value,
    }));
  };
  const changePage = (e, currentPage) => {
    setPaging((currentSt) => ({ ...currentSt, current: currentPage }));
  };

  const allFilteredNews = useMemo(() => {
    if (!allNewsData) return [];

    return allNewsData.filter((el) => {
      if (catTitle === "" || catTitle === "News") return true;

      return el.category === catTitle;
    });
   
  }, [allNewsData, catTitle]);

  const visibleNews = useMemo(() => {
    const startIndex = paging.current * paging.countPerPage;
    const endIndex = startIndex + paging.countPerPage;

    return allFilteredNews.slice(startIndex, endIndex);
  }, [allFilteredNews, paging]);

  if(allFilteredNews.length===0) return <Redirect to="/" />

  return (
    <>
      <div className="container ">
        <h1>{catTitle}</h1>
        <div className="main main_categories">
          {visibleNews.length &&
            visibleNews.map((news) => <PostItem key={news.id} news={news} />)}
        </div>
      </div>
      <div className="container ">
        {allFilteredNews.length > paging.countPerPage && (
          <table style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[16]}
                  onChangeRowsPerPage={changeRowsPerPage}
                  onChangePage={changePage}
                  rowsPerPage={paging.countPerPage}
                  count={allFilteredNews.length}
                  page={paging.current}
                />
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default AllNewsInCategory;
