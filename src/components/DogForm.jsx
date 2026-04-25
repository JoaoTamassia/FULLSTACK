import { useForm } from 'react-hook-form';
import { useDogContext } from '../contexts/DogContext';

export default function DogForm() {
  const { searchBreedImage } = useDogContext();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      breed: ''
    }
  });

  function onSubmit({ breed }) {
    searchBreedImage(breed);
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
        <span>Raca</span>
        <input
          type="text"
          inputMode="text"
          placeholder="Ex.: husky"
          style={inputStyle}
          {...register('breed', {
            required: 'A raca e obrigatoria.',
            pattern: {
              value: /^[a-zA-Z-]+(\/[a-zA-Z-]+)?$/,
              message: 'Use apenas letras, hifen e barra para sub-raca.'
            },
            onChange: (event) => {
              event.target.value = event.target.value.replaceAll(/[^a-zA-Z/-]/g, '').toLowerCase();
            }
          })}
        />
      </label>
      {errors.breed ? <p style={errorStyle}>{errors.breed.message}</p> : null}
      <button type="submit" style={buttonStyle}>Consultar</button>
    </form>
  );
}