import { useForm } from 'react-hook-form';
import { useCepContext } from '../contexts/CepContext';

export default function CepForm() {
  const { searchCep } = useCepContext();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cep: ''
    }
  });

  function onSubmit({ cep }) {
    searchCep(cep);
  }

  const formStyle = {
    display: 'grid',
    gap: '12px'
  };

  const labelStyle = {
    display: 'grid',
    gap: '6px',
    fontWeight: 700
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '8px',
    background: '#111827',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer'
  };

  const errorStyle = {
    margin: 0,
    color: '#b91c1c',
    fontSize: '14px'
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <label style={labelStyle}>
        CEP
        <input
          type="text"
          inputMode="numeric"
          maxLength={8}
          placeholder="Digite 8 números"
          style={inputStyle}
          {...register('cep', {
            required: 'O CEP é obrigatório.',
            pattern: {
              value: /^\d{8}$/,
              message: 'O CEP deve conter exatamente 8 números.'
            },
            onChange: (event) => {
              event.target.value = event.target.value.replace(/\D/g, '').slice(0, 8);
            }
          })}
        />
      </label>
      {errors.cep ? <p style={errorStyle}>{errors.cep.message}</p> : null}
      <button type="submit" style={buttonStyle}>Consultar</button>
    </form>
  );
}