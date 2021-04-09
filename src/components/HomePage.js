import React, { useEffect } from 'react';
import Header from "./Header";
import Aside from './Aside';
import PostItem from './PostItem';
import Footer from "./Footer";
import { db } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import LinearIndeterminate from '../adminka/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
  const categoriesData = useSelector(state => state.fireBaseData.categoryData);

  const filteredNews=(title)=>{
    const news=allNewsData.filter(el => el.category===title).slice(0,3)
    return news
  }


  return (
    <>
      <Header />
      <div className="container ">
    {  categoriesData.map(cat => <div  key={cat.title}> 
          <div className="site-content">
            <div>
              <div className="category-title">{cat.title}</div>
              <div className="main">
              { filteredNews(cat.title).map(news =>  <PostItem key={news.id} news={news} />)}
              </div>
            </div>
          </div>
        </div>
        )}
        <Aside />
      </div> 
      
      <Footer />
    </>
  );
}
export default HomePage