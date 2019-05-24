import React from 'react';
import PropTypes from 'prop-types';

import ResultBox from './ResultBox';

const ResultsContainer = ({ questionsAndAnswers }) => (
    <div className="stemt-faq has-top-distance">
        <h1 className="stemt-faq__title container__title">
            Dit vroegen wij aan de partijen:
        </h1>
        {questionsAndAnswers.map((question, index) =>
            <ResultBox
                key={index}
                index={index}
                data={question}
            />)}
    </div>
);
export default ResultsContainer;

ResultsContainer.propTypes = {
    questionsAndAnswers: PropTypes.array.isRequired,
};
