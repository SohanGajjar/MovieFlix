import {useEffect} from "react";
import React, {useMemo, useState} from "react";
import {fetchMoviesBySearchQuery} from "../../Services/api";
import {Genre, Movie} from "../../Types/Types";
import {myDebounce} from "../../Utils/utilsPlus";
import {isSubset} from "../../Utils/utilsPlus";
import MovieCard from "../MovieCard/MovieCard";
import MovieCardSkeleton from "../MovieCardSkeleton/MovieCardSkeleton"; // Import skeleton component
import "./MoviesWithSearchQuery.css";

type MoviesWithSearchProps = {
  searchQuery: string;
  genres: Genre[];
  filteredGenreIdSet: number[];
}

const MoviesWithSearchQuery = ({
  searchQuery,
  genres,
  filteredGenreIdSet
}: MoviesWithSearchProps) =>
{
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(searchQuery));
  const [error, setError] = useState<string | null>(null);

  useEffect(
    myDebounce(() =>
    {
      setIsLoading(true);
      fetchMoviesBySearchQuery(searchQuery, filteredGenreIdSet)
      .then((fetchedMovies) =>
      {
        setMovies(fetchedMovies);
        setIsLoading(false);
      })
      .catch((e) =>
      {
        setError("Failed to fetch movies" + `${e}`);
        setIsLoading(false);
      });
    }, 1000),
    [filteredGenreIdSet, searchQuery]
  );

  const memoizedMovieCards = useMemo(
    () =>
      movies
      .filter((movie) => isSubset(movie.genre_ids, filteredGenreIdSet))
      .map((movie, key) => (
        <MovieCard
          key={key}
          movie={movie}
          genres={genres}
        />
      )),
    [movies, genres, filteredGenreIdSet]
  );

  const skeletonMovieCards = useMemo(
    () =>
      Array.from({length: 20}, (_, index) => (
        <MovieCardSkeleton key={index} />
      )),
    []
  );

  useEffect(() =>
  {
    setIsLoading(Boolean(searchQuery));
  }, [searchQuery]);

  return (
    <div>
      <div
        className="empty-div"
      ></div>
      {isLoading ? (
        <div className="movie-grid">{skeletonMovieCards}</div> // Render skeleton cards while loading
      ) : error ? (
        <div>{error}</div>
      ) : movies.length === 0 ? (
        <div>No movies found for the search query and selected genres.</div>
      ) : (
        <div className="movie-grid">{memoizedMovieCards}</div>
      )}
    </div>
  );
};

export default MoviesWithSearchQuery;
