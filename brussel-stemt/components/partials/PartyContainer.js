import React from 'react';
import PropTypes from 'prop-types';

import PartyButton from './PartyButton';


const PartyContainer = ({ parties, handleClick }) => (
    <div className='party__container'>

        <div className="container__heading has-top-distance has-bottom-distance">
            Kies hieronder <strong>1 of meerdere</strong> partijen:
        </div>

        <div className='stemt-btn-wrapper'>
            {Object.keys(parties).map((party, index) =>
                <PartyButton
                    key={index}
                    party={parties[party]}
                    handleClick={handleClick}
                />)}
        </div>
    </div>
);

PartyContainer.propTypes = {
    parties: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedParties: PropTypes.array.isRequired,
};

export default PartyContainer;
