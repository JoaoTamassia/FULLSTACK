import { useDogContext } from '../contexts/DogContext';

export default function ErrorMessage() {
  const { error } = useDogContext();

  if (!error) {
    return null;
  }

  const errorStyle = {
    marginTop: '16px',
    padding: '12px 14px',
    borderRadius: '8px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#b91c1c'
  };

  return <div style={errorStyle}>{error}</div>;
}