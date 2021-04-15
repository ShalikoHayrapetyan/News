import React,{ useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./Header";
import HomePage from "./HomePage"


const CategoriesNewsList = () => {

  const allNewsData = useSelector(state => state.fireBaseData.allNewsData);
  const categoriesData = useSelector(state => state.fireBaseData.categoryData);

  allNewsData.map(el)
}


export default CategoriesNewsList