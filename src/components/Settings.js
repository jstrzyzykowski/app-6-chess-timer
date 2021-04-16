import React, { useContext } from 'react';

import Mode from './Mode';
import { AppContext } from '../context/AppContext';

import './Settings.css';

const Settings = () => {

  // Dispatch here for adding game mode
  const { modes, dispatch, toggleSettingsVisible : toggleVisible } = useContext(AppContext);

  const modeComponents = modes.map((mode) => {
    return <Mode key={mode.id} mode={mode} />;
  });

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__header">
          <i className="fas fa-chevron-left" onClick={toggleVisible}></i>
          <p className='settings__header-text'>Settings</p>
        </div>
        <div className="settings__main">
          {modeComponents}
        </div>
        <div className="settings__footer">
          <button className='settings__add-mode-btn' onClick={() => console.log('ADD MODE CLICKED')}>
            <i className="fas fa-plus"></i>
          </button>
          <p className='settings__btn-title'>Game Mode</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;