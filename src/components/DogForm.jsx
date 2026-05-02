import { useForm } from 'react-hook-form';
import { useDogContext } from '../contexts/DogContext';

export default function DogForm() {
  const { searchBreedImage, loading, breeds, breedsError } = useDogContext();
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

  const describedBy = ['texto-ajuda-api', breedsError ? 'erro-lista-racas' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <form className="dog-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {breedsError ? (
        <p id="erro-lista-racas" className="dog-form__warning">
          {breedsError} Dá para continuar digitando o nome da raça no campo abaixo.
        </p>
      ) : null}
      <label className="dog-form__label" htmlFor="campo-raca">
        <span>Raça</span>
        <input
          id="campo-raca"
          type="text"
          inputMode="text"
          autoComplete="off"
          placeholder="Ex.: husky"
          list={breeds.length > 0 ? 'lista-racas-dogceo' : undefined}
          aria-describedby={describedBy}
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
      {breeds.length > 0 ? (
        <datalist id="lista-racas-dogceo">
          {breeds.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      ) : null}
      {errors.breed ? <p className="dog-form__field-error">{errors.breed.message}</p> : null}
      <button type="submit" className="dog-form__submit" disabled={loading}>
        {loading ? 'Buscando…' : 'Consultar'}
      </button>
    </form>
  );
}
