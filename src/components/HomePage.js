import React, { useEffect } from 'react';
import Header from "./Header";
import Aside from './Aside';
import PostItem from './PostItem';
import Footer from "./Footer";
import { db } from '../App';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
  const categoriesData = useSelector(state => state.fireBaseData.categoryData);

  useEffect(()=>{
    db.collection("news")
    .orderBy("timestamp")
    .get()
    .then((querySnapshot) => {
        const all = []
        querySnapshot.forEach((doc) => {
            all.push(doc.data())
        });
        dispatch({
          type: 'getNewsData',
          payload: {
              data:all.reverse()
          }
      });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  }, [])
  
 

  return (
    <>
      <Header />

      <div className="container ">
        

        {categoriesData && categoriesData.map(el=> <div>
          <div className="site-content">
              <div key={el.title}>
                  <div className="category-title">{el.title}</div>
          <div className="main">
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
                </div>
                </div>
            </div>)}
         

          <Aside />
        
      </div>

      <Footer />
    </>
  );
}
export default HomePage