import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  predictions: [],
  lastPrediction: null,
  modelStatus: {
    isReady: false,
    isLoading: true,
    error: null,
  },
  user: null,
};

// Action types
const ActionTypes = {
  SET_PREDICTION: 'SET_PREDICTION',
  ADD_PREDICTION: 'ADD_PREDICTION',
  CLEAR_PREDICTIONS: 'CLEAR_PREDICTIONS',
  SET_MODEL_STATUS: 'SET_MODEL_STATUS',
  SET_MODEL_LOADING: 'SET_MODEL_LOADING',
  SET_MODEL_ERROR: 'SET_MODEL_ERROR',
  SET_USER: 'SET_USER',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_PREDICTION:
      return {
        ...state,
        lastPrediction: action.payload,
      };
    case ActionTypes.ADD_PREDICTION:
      return {
        ...state,
        predictions: [action.payload, ...state.predictions].slice(0, 10),
        lastPrediction: action.payload,
      };
    case ActionTypes.CLEAR_PREDICTIONS:
      return {
        ...state,
        predictions: [],
        lastPrediction: null,
      };
    case ActionTypes.SET_MODEL_STATUS:
      return {
        ...state,
        modelStatus: {
          ...state.modelStatus,
          isReady: action.payload,
          isLoading: false,
          error: null,
        },
      };
    case ActionTypes.SET_MODEL_LOADING:
      return {
        ...state,
        modelStatus: {
          ...state.modelStatus,
          isLoading: action.payload,
        },
      };
    case ActionTypes.SET_MODEL_ERROR:
      return {
        ...state,
        modelStatus: {
          ...state.modelStatus,
          error: action.payload,
          isLoading: false,
        },
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext(null);

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setPrediction: (prediction) => {
      dispatch({ type: ActionTypes.SET_PREDICTION, payload: prediction });
    },
    addPrediction: (prediction) => {
      dispatch({ type: ActionTypes.ADD_PREDICTION, payload: prediction });
    },
    clearPredictions: () => {
      dispatch({ type: ActionTypes.CLEAR_PREDICTIONS });
    },
    setModelStatus: (isReady) => {
      dispatch({ type: ActionTypes.SET_MODEL_STATUS, payload: isReady });
    },
    setModelLoading: (isLoading) => {
      dispatch({ type: ActionTypes.SET_MODEL_LOADING, payload: isLoading });
    },
    setModelError: (error) => {
      dispatch({ type: ActionTypes.SET_MODEL_ERROR, payload: error });
    },
    setUser: (user) => {
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
