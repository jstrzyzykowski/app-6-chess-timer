import React, { useContext } from 'react';

import { ACTIONS } from '../context/AppContext';
import { AppContext } from '../context/AppContext';

import './Mode.css';

const Mode = ({ mode }) => {

  const { 
    dispatch,
    selectAudioRef
  } = useContext(AppContext);
  const classes = `mode ${mode.isActive ? 'active' : ''}`;

  return(
    <div className={classes} onClick={() => {
      if(!mode.isActive) dispatch({type: ACTIONS.TOGGLE_MODE, payload: { id: mode.id }});
      selectAudioRef.current.play();
      }}>
      <p className='mode__name'>{mode.name}</p>
      <p className='mode__value'>{mode.value}</p>
      <p className='mode__unit'>min</p>
    </div>
  );
};

export default Mode;