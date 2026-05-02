import DogForm from './components/DogForm';
import DogResult from './components/DogResult';
import ErrorMessage from './components/ErrorMessage';
import { useDogContext } from './contexts/DogContext';

export default function App() {
  const { loading } = useDogContext();

  return (
    <main className="app-page">
      <section className="app-card">
        <h1 className="app-title">Busca Dog CEO</h1>
        <p className="app-subtitle">Digite uma raça para buscar uma imagem aleatória na API Dog CEO.</p>
        <DogForm />
        {loading ? <div className="app-loading">Carregando...</div> : null}
        <ErrorMessage />
        <DogResult />
      </section>
    </main>
  );
}
