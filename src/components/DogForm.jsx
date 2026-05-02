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

  return (
    <form className="dog-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="dog-form__label">
        <span>Raca</span>
        <input
          type="text"
          inputMode="text"
          className="dog-form__input"
          placeholder="Ex.: husky"
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
      {errors.breed ? <p className="dog-form__field-error">{errors.breed.message}</p> : null}
      <button type="submit" className="dog-form__submit">Consultar</button>
    </form>
  );
}
