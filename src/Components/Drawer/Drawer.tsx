import React from "react";
import {Genre} from "../../Types/Types";
import "./Drawer.css";

type DrawerProps = {
  open: boolean;
  genres: Genre[];
  filteredGenreIds: number[];
  setFilteredGenreIdSet: React.Dispatch<React.SetStateAction<number[]>>;
}

const Drawer = ({
  open,
  genres,
  filteredGenreIds,
  setFilteredGenreIdSet
}: DrawerProps) =>
{
  const fnSetGenre = (genreId: number) =>
  {

    if(filteredGenreIds.includes(genreId))
    {
      setFilteredGenreIdSet(filteredGenreIds.filter((id) => id !== genreId));
    }
    else
    {
      setFilteredGenreIdSet([...filteredGenreIds, genreId]);
    }
  };

  return (
    <div className={`drawer ${open ? "open" : ""}`}>
      <div className="drawer-content">
        <div className="genre-grid">
          {genres && genres.length > 0 ? (
            genres.map((genre, index) => (
              <div
                key={index}
                className={`genre-item ${
                  filteredGenreIds.includes(genre.id) ? "selected" : ""
                }`}
                onClick={() => fnSetGenre(genre.id)}
              >
                {genre.name}
              </div>
            ))
          ) : (
            <div>No genres available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
