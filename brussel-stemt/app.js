/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import MainContainer from './components/MainContainer';


const renderBrusselStemt = (brusselStemtContainer, title, intro) => {
    if (brusselStemtContainer) {
        const { brusselStemt } = window;
        ReactDOM.render(
            <MainContainer data={brusselStemt} title={title} intro={intro}/>,
            brusselStemtContainer,
        );
    }
};

export { renderBrusselStemt };
