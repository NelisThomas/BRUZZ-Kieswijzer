import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const PartyButton = ({
    party,
    handleClick,
}) => {
    const [selected, toggleSelected] = useState(false);


    const onPartyClick = () => {
        toggleSelected(!selected);
        handleClick(party.name);
    };

    return (
        <button
            className={cx('btn stemt-btn stemt-btn--ghost stemt-btn--small', { 'is-selected': selected })}
            type="button"
            onClick={onPartyClick}
        >
            {party.image !== '' ? (
                <div className="stemt-btn__image">
                    <img src={party.image} alt={party.name} />
                </div>
            ) : (
                <span>
                    {party.name}
                </span>
            )}
        </button>
    );
};

PartyButton.defaultProps = {
    selected: false,
};

PartyButton.propTypes = {
    party: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
};

export default PartyButton;
