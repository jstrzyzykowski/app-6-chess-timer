import React, { createContext, useEffect, useReducer, useRef, useState } from 'react';

export const ACTIONS = {
  ADD_MODE: 'add-mode',
  EDIT_MODE: 'edit-mode',
  REMOVE_MODE: 'remove-mode',
  TOGGLE_MODE: 'toggle-mode'
};

const initialState = [
  { id: 1618566292337, name: 'Classic', isActive: true, value: 30, isCreatedBySystem: true },
  { id: 1618566540517, name: 'Rapid', isActive: false, value: 15, isCreatedBySystem: true },
  { id: 1618566689616, name: 'Erambo', isActive: false, value: 10, isCreatedBySystem: true },
  { id: 1618566628616, name: 'Blitz', isActive: false, value: 5, isCreatedBySystem: true },
  { id: 1618566740721, name: 'Bullet', isActive: false, value: 3, isCreatedBySystem: true },
  { id: 1618566823233, name: 'Lightning', isActive: false, value: 1, isCreatedBySystem: true }
];

const initializer = (initialValue = initialState) => JSON.parse(localStorage.getItem("localModes")) || initialValue;

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  
  const reducer = (modes, action) => {
    switch (action.type) {
      case ACTIONS.ADD_MODE:
        return [...modes, createModel(action.payload.name, action.payload.value)];
      case ACTIONS.TOGGLE_MODE:
        return modes.map((mode) => {
          if(mode.id !== action.payload.id && mode.isActive) return {...mode, isActive: false};
          else if(mode.id === action.payload.id) return { ...mode, isActive: !mode.isActive};
          else return mode;
        });
      default:
        return modes;
    }
  }

  const createModel = (name, value) => {
    return { id: Date.now(), name: name, isActive: false, value: value, isCreatedBySystem: false };
  }

  const [modes, dispatch] = useReducer(reducer, initialState, initializer);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [playerOneTime, setPlayerOneTime] = useState(1);
  const [playerTwoTime, setPlayerTwoTime] = useState(1);

  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [isPlayerTwoTurn, setIsPlayerTwoTurn] = useState(false);

  const [isPaused, setIsPaused] = useState(true);

  const idOne = useRef(null);
  const idTwo = useRef(null);

  const toggleTurn = () => {
    setIsPlayerOneTurn((prevValue) => !prevValue);
    setIsPlayerTwoTurn((prevValue) => !prevValue);
  };

  const togglePaused = () => {
    setIsPaused((prevValue) => !prevValue);
  };

  const toggleSettingsVisible = () => {
    setSettingsVisible((prevValue) => !prevValue);
  };

  const setActiveModeTime = () => {
    const activeMode = modes.filter((mode) => mode.isActive);
    setPlayerOneTime(activeMode[0].value * 60);
    setPlayerTwoTime(activeMode[0].value * 60);
  };

  const stopActiveUserTimer = () => {
    if(isPlayerOneTurn) {
      window.clearInterval(idOne.current);
    }

    if(isPlayerTwoTurn) {
      window.clearInterval(idTwo.current);
    }
  };

  const continueActiveUserTimer = () => {
    if(isPlayerOneTurn) {
      idOne.current = window.setInterval(() => {
        setPlayerOneTime((prevValue) => prevValue - 1);
      }, 1000);
    }

    if(isPlayerTwoTurn) {
      idTwo.current = window.setInterval(() => {
        setPlayerTwoTime((prevValue) => prevValue - 1);
      }, 1000);
    }
  }

  useEffect(() => {
    localStorage.setItem('localModes', JSON.stringify(modes))
    setActiveModeTime();
  }, [modes]);

  useEffect(() => {
    if(isPaused === true) {
      console.log('Stop active user timer');
      stopActiveUserTimer();
    } else {
      console.log('Continue active user timer');
      continueActiveUserTimer();
    }
  }, [isPaused]);

  useEffect(() => {
    if(!isPaused) {
      if(isPlayerOneTurn === true) {
        idOne.current = window.setInterval(() => {
          setPlayerOneTime((prevValue) => prevValue - 1);
        }, 1000);
      } else {
        window.clearInterval(idOne.current);
      }
    }
  }, [isPlayerOneTurn]);

  useEffect(() => {
    if(!isPaused) {
      if(isPlayerTwoTurn === true) {
        idTwo.current = window.setInterval(() => {
          setPlayerTwoTime((prevValue) => prevValue - 1);
        }, 1000);
      } else {
        window.clearInterval(idTwo.current);
      }
    }
  }, [isPlayerTwoTurn]);

  return(
    <AppContext.Provider value={{
      modes,
      dispatch,
      settingsVisible,
      toggleSettingsVisible,
      playerOneTime,
      playerTwoTime,
      isPaused,
      togglePaused,
      isPlayerOneTurn,
      isPlayerTwoTurn,
      toggleTurn
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;