import { useDogContext } from '../contexts/DogContext';

export default function ErrorMessage() {
  const { error } = useDogContext();

  if (!error) {
    return null;
  }

  return <div className="error-banner">{error}</div>;
}
