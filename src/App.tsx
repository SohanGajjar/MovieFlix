import React, {useEffect, useState} from "react";
import "./App.css";
import Drawer from "./Components/Drawer/Drawer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import {fetchMovieGenres} from "./Services/api";
import {Genre} from "./Types/Types";

function App()
{
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filteredGenreIdSet, setFilteredGenreIdSet] = useState<number[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() =>
  {
    const fetchGenres = async() =>
    {
      try
      {
        if(genres.length === 0)
        {
          const genresData = await fetchMovieGenres();
          setGenres(genresData);
        }
      }
      catch(error)
      {
        console.error("Error fetching movie genres:", error);
      }
    };

    fetchGenres();

  }, [genres]);

  return (
    <div className="app-container">
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <Drawer
          open={isDrawerOpen}
          genres={genres}
          filteredGenreIds={filteredGenreIdSet}
          setFilteredGenreIdSet={setFilteredGenreIdSet}
        />
      </div>
      <div className={`content ${isDrawerOpen ? "shift" : ""}`}>
        <div className="content-container">
          <Navbar
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            setSearchQuery={setSearchQuery}
          />
          <Home
            genres={genres}
            filteredGenreIdSet={filteredGenreIdSet}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
