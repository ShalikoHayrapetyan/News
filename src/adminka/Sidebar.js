import React from 'react';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch();


    const hrefPage = (pageType) => {
        if (pageType === 'addNews') {
            dispatch({
                type: 'addNews',
                payload: {
                    page: true,
                }
            });
        }
        if (pageType === 'newsList') {
            dispatch({
                type: 'newsList',
                payload: {
                    page: true,
                }
            });
        }
        if (pageType === 'category') {
            dispatch({
                type: 'category',
                payload: {
                    page: true,
                }
            });
        }
    }

    return (
        <div className="sidebar">
            <nav className="navbar">
                <li>Home</li>
                <li onClick={() => hrefPage('addNews')}>Add news</li>
                <li onClick={() => hrefPage('newsList')}>News list</li>
                <li onClick={() => hrefPage('category')}>News categories</li>
            </nav>
        </div>
    )
}

export default Sidebar;