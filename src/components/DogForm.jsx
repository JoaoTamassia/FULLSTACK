import { useForm } from 'react-hook-form';
import { useDogContext } from '../contexts/DogContext';

export default function DogForm() {
  const { searchBreedImage, loading } = useDogContext();
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

  return (
    <form className="dog-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="dog-form__label" htmlFor="campo-raca">
        <span>Raça</span>
        <input
          id="campo-raca"
          type="text"
          inputMode="text"
          className="dog-form__input"
          autoComplete="off"
          placeholder="Ex.: husky"
          aria-describedby="texto-ajuda-api"
          disabled={loading}
          className="dog-form__input"
          {...register('breed', {
            required: 'A raça é obrigatória.',
            pattern: {
              value: /^[a-zA-Z-]+(\/[a-zA-Z-]+)?$/,
              message: 'Use apenas letras, hífen e barra para sub-raça.'
            },
            onChange: (event) => {
              event.target.value = event.target.value.replaceAll(/[^a-zA-Z/-]/g, '').toLowerCase();
            }
          })}
        />
      </label>
      {errors.breed ? <p className="dog-form__field-error">{errors.breed.message}</p> : null}
      <button type="submit" className="dog-form__submit" disabled={loading}>
        {loading ? 'Buscando…' : 'Consultar'}
      </button>
    </form>
  );
}
