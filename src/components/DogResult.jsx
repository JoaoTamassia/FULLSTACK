import { useDogContext } from '../contexts/DogContext';

export default function DogResult() {
  const { data } = useDogContext();

  if (!data) {
    return null;
  }

  const resultStyle = {
    marginTop: '16px',
    padding: '16px',
    borderRadius: '8px',
    background: '#f8fafc',
    border: '1px solid #dbe3ea',
    display: 'grid',
    gap: '8px'
  };

  const rowStyle = {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px'
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #dbe3ea'
  };

  return (
    <section style={resultStyle}>
      <p style={rowStyle}><strong>Raca:</strong> <span>{data.breed}</span></p>
      <img src={data.imageUrl} alt={data.breed} style={imageStyle} />
    </section>
  );
}