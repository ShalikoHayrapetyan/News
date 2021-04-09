import React from 'react';
import Header from "./Header";
import Aside from './Aside';
import PostItem from './PostItem';
import Footer from "./Footer";
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
  const categoriesData = useSelector(state => state.fireBaseData.categoryData);

  const filteredNews = (title) => {
    const news = allNewsData.filter(el => el.category === title).slice(0, 3)
    return news
  }


  return (
    <>
      <Header />

      <div className="container ">
        <div className="site-content">

          <div className="main">
            {categoriesData.map(cat =>
              <div className="main-row">
                <div className="category-title">{cat.title}</div>

                {filteredNews(cat.title).map(news => <PostItem key={news.id} news={news} />)}
              </div>
            )}
          </div>

          <Aside />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default HomePage