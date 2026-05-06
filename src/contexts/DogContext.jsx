import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

const initialState = {
  data: null,
  loading: false,
  error: '',
  breeds: [],
  breedsLoading: true,
  breedsError: ''
};

function flattenBreeds(message) {
  const out = [];
  const parents = Object.keys(message).sort((a, b) => a.localeCompare(b));
  for (const parent of parents) {
    const subs = message[parent];
    if (subs.length === 0) {
      out.push(parent);
    } else {
      const sorted = [...subs].sort((a, b) => a.localeCompare(b));
      for (const s of sorted) {
        out.push(`${parent}/${s}`);
      }
    }
  }
  return out;
}

function dogReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        data: null,
        loading: true,
        error: ''
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: ''
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload
      };
    case 'BREEDS_REQUEST':
      return {
        ...state,
        breedsLoading: true,
        breedsError: ''
      };
    case 'BREEDS_SUCCESS':
      return {
        ...state,
        breedsLoading: false,
        breeds: action.payload,
        breedsError: ''
      };
    case 'BREEDS_FAILURE':
      return {
        ...state,
        breedsLoading: false,
        breeds: [],
        breedsError: action.payload
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

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'BREEDS_REQUEST' });
    (async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        if (!response.ok || data.status !== 'success') {
          throw new Error();
        }
        const flat = flattenBreeds(data.message);
        if (!cancelled) {
          dispatch({ type: 'BREEDS_SUCCESS', payload: flat });
        }
      } catch {
        if (!cancelled) {
          dispatch({
            type: 'BREEDS_FAILURE',
            payload: 'Não foi possível carregar a lista de raças.'
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  const value = useMemo(
    () => ({
      ...state,
      searchBreedImage
    }),
    [state, searchBreedImage]
  );

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
