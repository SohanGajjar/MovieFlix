export type  Movie = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
  vote_average: number;
  release_date: string,
  adult: boolean;
}

export type  Genre = {
  id: number,
  name: string
}
