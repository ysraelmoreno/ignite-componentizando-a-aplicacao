import { GenreProvider } from "./context/GenreContext";
import { MoviesList } from "./pages/MoviesList";
import './styles/global.scss';

export function App() {
  return (
    <GenreProvider>
      <MoviesList />
    </GenreProvider>
  )
}
