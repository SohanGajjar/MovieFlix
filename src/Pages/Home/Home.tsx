/** @format */

import MoviesWithoutSearchQuery from "../../Components/MoviesWithoutSearchQuery/MoviesWithoutSearchQuery";
import MoviesWithSearchQuery from "../../Components/MoviesWithSearchQuery/MoviesWithSearchQuery";
import {Genre} from "../../Types/Types";
import {isStringEmpty} from "../../Utils/utilsPlus";
import "./Home.css";

type HomeProps = {
  genres: Genre[];
  filteredGenreIdSet: number[];
  searchQuery: string;
}

const Home = ({genres, filteredGenreIdSet, searchQuery}: HomeProps) =>
{

  return (
    <div className="home-container">
      {isStringEmpty(searchQuery) ? (
        <MoviesWithoutSearchQuery
          genres={genres}
          filteredGenreIdSet={filteredGenreIdSet}
        />
      ) : (
        <MoviesWithSearchQuery
          searchQuery={searchQuery}
          genres={genres}
          filteredGenreIdSet={filteredGenreIdSet}
        />
      )}
    </div>
  );
};

export default Home;
