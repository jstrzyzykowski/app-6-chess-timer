import React, { useContext } from 'react';


import Settings from './Settings';
import { AppContext } from '../context/AppContext';

import './Timer.css';

const Timer = () => {

  const { 
    settingsVisible, 
    toggleSettingsVisible : toggleVisible, 
    playerOneTime, 
    playerTwoTime, 
    isPaused, 
    togglePaused, 
    isPlayerOneTurn, 
    isPlayerTwoTurn ,
    toggleTurn,
    setActiveModeTime : reset,
    setIsPaused,
    hasGameStarted
  } = useContext(AppContext);

  const settingsComponent = settingsVisible 
  ? <Settings/> 
  : null;

  const startButtonIcon = isPaused 
  ? <i className="fas fa-play"></i> 
  : <i className="fas fa-pause"></i>;
  const startButtonClasses = isPaused 
  ? 'timer__btn-start paused' 
  : 'timer__btn-start';
  const playerOneAreaClasses = isPlayerOneTurn 
  ? 'timer__player-area down activeTurn' 
  : 'timer__player-area down'; 
  const playerTwoAreaClasses = isPlayerTwoTurn 
  ? 'timer__player-area up activeTurn' 
  : 'timer__player-area up';
  
  const generatePlayerInfo = (playerTurnInfo) => {
    if(!isPaused && playerTurnInfo) return 'Your turn';
    else if(!isPaused && !playerTurnInfo) return 'Waiting for turn';
    else return 'Waiting for start';
  };

  const convertTime = (value) => {
    const minutes = Math.floor(value / 60) < 10 
    ? `0${Math.floor(value / 60)}` 
    : Math.floor(value / 60);

    const seconds = value % 60 < 10 
    ? `0${value % 60}` 
    : value % 60;

    return { minutes: minutes, seconds: seconds };
  }

  const playerOneTimeConverted = convertTime(playerOneTime);
  const playerTwoTimeConverted = convertTime(playerTwoTime);

  const handleClickReset = () => {
    if(hasGameStarted()) {
      setIsPaused(true);
      reset();
      console.log('Reset completed!')
    } else console.log('Start the game at first!');
  };

  const handleClickSettings = () => {
    setIsPaused(true);
    toggleVisible();
  }
  
  return (
    <div className="timer">
      {settingsComponent}
      <div className={playerTwoAreaClasses} onClick={() => {
        if(isPlayerTwoTurn) toggleTurn();
      }}>
        <p className='timer__time'>
          {playerTwoTimeConverted.minutes}:{playerTwoTimeConverted.seconds}
        </p>
        <p className='timer__info'>{generatePlayerInfo(isPlayerTwoTurn)}</p>
      </div>
      <div className="timer__buttons">
        <button className='timer__btn-settings' onClick={handleClickSettings}>
          <i className="fas fa-bars"></i>
        </button>
        <button className={startButtonClasses} onClick={togglePaused}>
          {startButtonIcon}
        </button>
        <button className='timer__btn-reset' onClick={handleClickReset}>
          <i className="fas fa-redo-alt"></i>
        </button>
      </div>
      <div className={playerOneAreaClasses} onClick={() => {
        if(isPlayerOneTurn) toggleTurn();
      }}>
        <p className='timer__time'>
          {playerOneTimeConverted.minutes}:{playerOneTimeConverted.seconds}
        </p>
        <p className='timer__info'>{generatePlayerInfo(isPlayerOneTurn)}</p>
      </div>
    </div>
  );
}

export default Timer;