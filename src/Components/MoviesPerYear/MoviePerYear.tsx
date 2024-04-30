import {useEffect} from "react";
import {useState} from "react";
import {useMemo} from "react";
import {fetchMoviesByYear} from "../../Services/api";
import {Genre, Movie} from "../../Types/Types";
import {myDebounce} from "../../Utils/utilsPlus";
import MovieCard from "../MovieCard/MovieCard";
import MovieCardSkeleton from "../MovieCardSkeleton/MovieCardSkeleton";
import "./MoviesPerYear.css";

type MoviesPerYearProps = {
  year: number;
  genres: Genre[];
  filteredGenreIdSet: number[];
}

const MoviesPerYear = ({
  year,
  genres,
  filteredGenreIdSet
}: MoviesPerYearProps) =>
{
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiCall, setApiCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(myDebounce(() =>
  {
    setIsLoading(true);
    fetchMoviesByYear(year, filteredGenreIdSet)
    .then((fetchedMovies) =>
    {
      setMovies(fetchedMovies);
      setApiCall(true);
      setIsLoading(false);
    })
    .catch((e) =>
    {
      setApiCall(true);
      setIsLoading(false);
      setError("Failed to fetch movies");
    });
  }, 500), [filteredGenreIdSet, year]);

  const memoizedMovieCards = useMemo(
    () =>
      movies.map((movie, key) => (
        <MovieCard
          key={key}
          movie={movie}
          genres={genres}
        />
      )),
    [movies, genres]
  );

  useEffect(() =>
  {
    setIsLoading(true);
  }, [filteredGenreIdSet]);

  const memoizedMovieCardSkeletons = useMemo(
    () => Array.from({length: 20}, (_, index) => (
        <MovieCardSkeleton key={index} />
      )
    ), [movies, genres]);

  return (
    <div>
      <h2 className="top-movies">Top movies of {year}</h2>
      {(!apiCall && (movies.length === 0) || isLoading) ? (
        <div className="movie-grid">{memoizedMovieCardSkeletons}</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (apiCall && movies.length === 0) ? (
        <div className="no-movies">No movies found for this year and selected genres.</div>
      ) : (
        <div className="movie-grid">{memoizedMovieCards}</div>
      )}
    </div>
  );
};

export default MoviesPerYear;
