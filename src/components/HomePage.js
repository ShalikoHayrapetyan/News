import React from 'react';
import Aside from './Aside';
import PostItem from './PostItem';
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
      <div className="container ">
        <div className="site-content">
          <div className="main">
            {categoriesData.map(cat =>
              <div key={cat.id}  className="main-row">
                <div className="category-title">{cat.title}</div>

                {filteredNews(cat.title).map(news => <PostItem key={news.id} news={news} />)}
              </div>
            )}
          </div>
          <Aside />
        </div>
      </div>
 
  );
}
export default HomePage