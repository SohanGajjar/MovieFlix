import {Genre, Movie} from "../Types/Types";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchMoviesByYear = async(year: number, genreIds?: number[]): Promise<Movie[]> =>
{
  try
  {
    const genreQueryString = genreIds?.join(",");

    const API_STRING = genreIds && genreIds.length > 0
      ?
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genreQueryString}`
      :
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;

    const response = await fetch(API_STRING);
    const data = await response.json();
    return data.results;
  }
  catch(error)
  {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMoviesBySearchQuery = async(
  query: string,
  genreIds?: number[]
): Promise<Movie[]> =>
{
  try
  {
    const genreQueryString = genreIds?.join(",");
    const genreQueryStringWithGenres = genreIds && genreIds.length > 0
      ? `&with_genres=${genreQueryString}`
      : "";

    const API_STRING = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}${genreQueryStringWithGenres}`;

    const response = await fetch(API_STRING);
    const data = await response.json();

    return data.results;
  }
  catch(error)
  {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieGenres = async(): Promise<Genre[]> =>
{
  try
  {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
  }
  catch(error)
  {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const getPosterPath = (URL: string) =>
{
  return IMAGE_URL + URL;
};

