import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';
import { GenreResponseProps, MovieProps } from '../types/genres'

interface GenreContextProps {
  children: React.ReactNode;
}

interface GenreContextState {
  selectedGenreId: number;
  genres: GenreResponseProps[];
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
  setGenres: React.Dispatch<React.SetStateAction<GenreResponseProps[]>>;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
}

export const GenreContext = createContext<GenreContextState>({} as GenreContextState);

export const GenreProvider = ({ children }: GenreContextProps) => {
  const [selectedGenreId, setSelectedGenreId] = useState(2);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <GenreContext.Provider value={{ selectedGenreId, movies, selectedGenre, genres, setSelectedGenreId, setGenres }}>
      {children}
    </GenreContext.Provider>
  )
}

export const useGenre = () => {
  const context = useContext(GenreContext);

  return context;
}
