import { createContext, useContext, useReducer } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: ''
};

function cepReducer(state, action) {
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

const CepContext = createContext(null);

function normalizeCep(cep) {
  return cep.replace(/\D/g, '');
}

export function CepProvider({ children }) {
  const [state, dispatch] = useReducer(cepReducer, initialState);

  async function searchCep(cep) {
    const normalizedCep = normalizeCep(cep);

    dispatch({ type: 'FETCH_START' });

    try {
      const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        dispatch({ type: 'FETCH_ERROR', payload: 'CEP não encontrado.' });
        return;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch {
      dispatch({ type: 'FETCH_ERROR', payload: 'Não foi possível consultar o CEP.' });
    }
  }

  return <CepContext.Provider value={{ ...state, searchCep }}>{children}</CepContext.Provider>;
}

export function useCepContext() {
  const context = useContext(CepContext);

  if (!context) {
    throw new Error('useCepContext deve ser usado dentro de CepProvider');
  }

  return context;
}