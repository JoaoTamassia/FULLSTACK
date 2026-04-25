import { useCepContext } from '../contexts/CepContext';

export default function CepResult() {
  const { data } = useCepContext();

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

  return (
    <section style={resultStyle}>
      <p style={rowStyle}><strong>Logradouro:</strong> <span>{data.logradouro || '-'}</span></p>
      <p style={rowStyle}><strong>Bairro:</strong> <span>{data.bairro || '-'}</span></p>
      <p style={rowStyle}><strong>Localidade:</strong> <span>{data.localidade || '-'}</span></p>
      <p style={rowStyle}><strong>UF:</strong> <span>{data.uf || '-'}</span></p>
    </section>
  );
}