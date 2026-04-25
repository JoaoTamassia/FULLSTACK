import DogForm from './components/DogForm';
import DogResult from './components/DogResult';
import ErrorMessage from './components/ErrorMessage';
import { useDogContext } from './contexts/DogContext';

export default function App() {
  const { loading } = useDogContext();

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: '#f4f6f8',
    color: '#1f2937',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '480px',
    background: '#ffffff',
    border: '1px solid #dbe3ea',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
  };

  const titleStyle = {
    margin: '0 0 8px',
    fontSize: '28px'
  };

  const subtitleStyle = {
    margin: '0 0 20px',
    color: '#4b5563',
    lineHeight: 1.5
  };

  const statusStyle = {
    marginTop: '16px',
    padding: '12px 14px',
    borderRadius: '8px',
    background: '#eef2f7',
    color: '#374151'
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <h1 style={titleStyle}>Busca Dog CEO</h1>
        <p style={subtitleStyle}>Digite uma raca para buscar uma imagem aleatoria na API Dog CEO.</p>
        <DogForm />
        {loading ? <div style={statusStyle}>Carregando...</div> : null}
        <ErrorMessage />
        <DogResult />
      </section>
    </main>
  );
}