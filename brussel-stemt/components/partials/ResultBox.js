import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


const ResultBox = ({ data }) => {
    const { question, answers } = data;
    const [isOpened, setOpened] = useState(false);

    useEffect(() => {
        setOpened(false);
    }, [data]);

    return (
        <div className={cx('stemt-faq__item', { 'is-open': isOpened })}>
            <button
                className="stemt-faq__question"
                type="button"
                onClick={() => { setOpened(!isOpened); }}
            >
                <div
                    className="stemt-faq__question-text"
                    dangerouslySetInnerHTML={{ __html: question }}
                />
                <div className="stemt-faq__icon" />
            </button>

            { isOpened && (
                <div className="stemt-faq__answers">
                    {answers.filter(xxx => xxx.answer).map((answer, index) => (
                        <div
                            className="stemt-faq__answer"
                            key={index}
                        >
                            <div>
                                <div className="stemt-faq__answer-title has-distance">
                                    <div>
                                        Dit zegt
                                    </div>
                                    {answer.partyImg !== '' ? (
                                        <div className="stemt-faq__answer-image">
                                            <img src={answer.partyImg} alt={answer.partyName}/>
                                        </div>
                                    ) : (
                                        <div className="stemt-faq__answer-party">
                                            {answer.partyName}
                                        </div>
                                    )}
                                </div>
                                <div className="stemt-faq__answer-text has-distance" dangerouslySetInnerHTML={{ __html: answer.answer }} />
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

ResultBox.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ResultBox;
