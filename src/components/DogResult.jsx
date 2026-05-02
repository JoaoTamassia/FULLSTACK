import { useDogContext } from '../contexts/DogContext';

export default function DogResult() {
  const { data } = useDogContext();

  if (!data) {
    return null;
  }

  return (
    <section className="dog-result">
      <p className="dog-result__row"><strong>Raca:</strong> <span>{data.breed}</span></p>
      <img src={data.imageUrl} alt={data.breed} className="dog-result__image" />
    </section>
  );
}
