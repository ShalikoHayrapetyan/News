import React from 'react';
import Header from "./Header";
import Aside from './Aside';
import PostItem from './PostItem';
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="site-content">
          <div className="main">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>

          <Aside />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default HomePage