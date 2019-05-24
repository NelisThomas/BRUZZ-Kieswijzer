import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PartyContainer from './partials/PartyContainer';
import ThemeContainer from './partials/ThemeContainer';
import ResultsContainer from './partials/ResultsContainer';


class MainContainer extends React.Component {
    state = {
        selectedParties: [],
        selectedTheme: {},
        submitted: false,
    };

    handlePartyClick = (name) => {
        const { selectedParties } = this.state;
        if (!selectedParties.includes(name)) {
            this.setState({
                selectedParties: [...selectedParties, name],
            });
        } else {
            const array = [...selectedParties];
            array.splice(array.indexOf(name), 1);
            this.setState({ selectedParties: array });
        }
    };

    changeTheme = (theme) => {
        this.setState({
            selectedTheme: theme,
        });
    };

    handleSubmitClick = () => {
        const { selectedTheme, selectedParties } = this.state;

        if (Object.keys(selectedTheme).length !== 0 && selectedParties.length) {
            this.setState({ submitted: true });
            this.getResults();
        }
    };

    filterStandpoints = () => {
        const { selectedParties, selectedTheme } = this.state;
        const { standpoints } = this.props.data;
        const filteredStandpoints = [];

        Object.keys(standpoints).forEach((standpoint) => {
            if (standpoints[standpoint].theme === selectedTheme.name
                && selectedParties.includes(standpoints[standpoint].political_party)) {
                filteredStandpoints.push(standpoints[standpoint]);
            }
        });
        return filteredStandpoints;
    };

    getResults = () => {
        const compareListNum = (a, b) => {
            if (parseInt(a.listNumber, 10) < parseInt(b.listNumber, 10)) {
                return -1;
            }
            if (parseInt(a.listNumber, 10) > parseInt(b.listNumber, 10)) {
                return 1;
            }
            return 0;
        };
        const qnaArray = [];
        const filteredStandpoints = this.filterStandpoints();
        this.state.selectedTheme.questions.forEach((question, index) => {
            if (question !== '') {
                const { parties } = this.props.data;
                const answers = [];
                filteredStandpoints.forEach((standpoint) => {
                    let partyImg = '';
                    let listNumber = '';
                    Object.keys(parties).forEach((party) => {
                        if (parties[party].name === standpoint.political_party) {
                            partyImg = parties[party].image;
                            listNumber = parties[party].list_number;
                        }
                    });
                    const answer = {
                        partyName: standpoint.political_party,
                        partyImg,
                        listNumber,
                        answer: standpoint.answers[index],
                    };
                    answers.push(answer);
                    answers.sort(compareListNum);
                });
                const q = {
                    question,
                    answers,
                };
                qnaArray.push(q);
            }
        });
        return qnaArray;
    };

    render() {
        const { title, intro } = this.props;
        const { parties, themes } = this.props.data;
        const { selectedParties, selectedTheme, submitted } = this.state;
        return (
            <div className="container container--text container--horizontal container--vertical is-stemt">
                <div className="container__heading">
                    <h1
                        className="container__title title has-bottom-distance"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div
                        className="container__description has-distance"
                        dangerouslySetInnerHTML={{ __html: intro }}
                    />

                </div>

                <PartyContainer
                    parties={parties}
                    selectedParties={selectedParties}
                    handleClick={this.handlePartyClick}
                />

                <ThemeContainer
                    selectedTheme={selectedTheme}
                    themes={themes}
                    changeTheme={this.changeTheme}
                    submitted={submitted}
                />

                {!submitted && (
                    <button
                        className={cx('btn stemt-btn stemt-btn--primary  has-top-distance', { 'is-disabled': Object.keys(selectedTheme).length === 0 || selectedParties.length === 0 })}
                        onClick={this.handleSubmitClick}
                    >
                        Maak de vergelijking
                    </button>
                )}

                {submitted && (
                    <ResultsContainer
                        questionsAndAnswers={this.getResults()}
                    />
                )}

            </div>
        );
    }
}

MainContainer.propTypes = {
    data: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
};

export default MainContainer;
