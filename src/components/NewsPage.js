import React from 'react';
import Header from "./Header";
import Aside from './Aside';
import Footer from "./Footer";

const NewsPage = () => {
    return (
        <>
            <Header />

            <div className="container">
                <div className="site-content">
                    <div className="main">
                        <h1>Title news</h1>
                    </div>

                    <Aside />
                </div>
            </div>

            <Footer />
        </>
    );
}
export default NewsPage