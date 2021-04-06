import React, {useEffect,useState } from 'react';
import {useParams} from "react-router-dom"
import Header from "./Header";
import Aside from './Aside';
import PostItem from './PostItem';
import Footer from "./Footer";
import { db } from '../App';

const HomePage = () => {
  const {category}  = useParams();
  const [news, setNews] = useState();

  useEffect(()=>{
    let newsRef = db.collection("news");

    if(category){
      newsRef = newsRef.where("category", "==", category)
    }
    newsRef.get()
            .then((querySnapshot) => {
                const all = []

                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });

                setNews(all)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
  }, [category]);

  return (
    <>
      <Header />

      <div className="container">
        <div className="site-content">
          <div className="main">
            {news?.map(singleNews=><PostItem news={singleNews}/>)}
          </div>

          <Aside />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default HomePage