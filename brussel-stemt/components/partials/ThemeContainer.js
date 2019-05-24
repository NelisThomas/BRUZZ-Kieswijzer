import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class ThemeContainer extends Component {
    state = {
        firstRender: true,
    };

    handleOnChange = (e) => {
        this.props.changeTheme(this.props.themes[e.target.value]);
    };

    render() {
        const {
            themes,
            changeTheme,
            selectedTheme,
            submitted,
        } = this.props;

        return (
            <div>
                {!submitted && (
                    <div>
                        <div className="container__heading has-top-distance has-bottom-distance">
                            Kies <strong>1 thema</strong> en bevestig onderaan de pagina om de vergelijking te maken:
                        </div>
                        <div className='stemt-btn-wrapper'>
                            {Object.keys(themes).map((theme, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={cx(
                                        'btn stemt-btn stemt-btn--ghost stemt-btn--big',
                                        { 'is-selected': selectedTheme === themes[theme] },
                                    )}
                                    onClick={() => changeTheme(themes[theme])}
                                >
                                    {themes[theme].name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {submitted && (
                    <div>
                        <div className="container__heading has-top-distance has-bottom-distance">
                            Bekijk ook wat de partijen denken van de
                            <strong> andere thema&#39;s</strong>.
                        </div>
                        <select
                            className="stemt-select"
                            onChange={ (event) => { this.handleOnChange(event); }}
                            defaultValue={selectedTheme.id}
                        >
                            {Object.keys(themes).map((theme, index) =>
                                <option
                                    key={index}
                                    className="faq-select__option"
                                    value={themes[theme].id}
                                >
                                    {themes[theme].name}
                                </option>)}
                        </select>
                    </div>
                )}
            </div>
        );
    }
}

ThemeContainer.propTypes = {
    themes: PropTypes.object.isRequired,
    changeTheme: PropTypes.func.isRequired,
    selectedTheme: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
};

export default ThemeContainer;
