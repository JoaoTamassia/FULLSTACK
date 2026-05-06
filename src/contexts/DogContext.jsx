import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: ''
};

function dogReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        data: null,
        loading: true,
        error: ''
      };
    case 'FETCH_SUCCESS':
      return {
        data: action.payload,
        loading: false,
        error: ''
      };
    case 'FETCH_ERROR':
      return {
        data: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

const DogContext = createContext(null);

function normalizeBreed(breed) {
  return breed.trim().toLowerCase();
}

export function DogProvider({ children }) {
  const [state, dispatch] = useReducer(dogReducer, initialState);

  const searchBreedImage = useCallback(async (breed) => {
    const normalizedBreed = normalizeBreed(breed);

    dispatch({ type: 'FETCH_START' });

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${normalizedBreed}/images/random`);
      const data = await response.json();

      if (!response.ok || data.status !== 'success') {
        dispatch({ type: 'FETCH_ERROR', payload: 'Raça não encontrada.' });
        return;
      }

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          breed: normalizedBreed,
          imageUrl: data.message
        }
      });
    } catch {
      dispatch({ type: 'FETCH_ERROR', payload: 'Não foi possível consultar a API Dog CEO.' });
    }
  }, []);

  const value = useMemo(() => ({
    ...state,
    searchBreedImage
  }), [state, searchBreedImage]);

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
}

DogProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useDogContext() {
  const context = useContext(DogContext);

  if (!context) {
    throw new Error('useDogContext deve ser usado dentro de DogProvider');
  }

  return context;
}