// MovieCard.js
import {useState} from "react";
import noImage from "../../Assets/noImage.png";
import {getPosterPath} from "../../Services/api";
import {Genre, Movie} from "../../Types/Types";
import {getGenres} from "../../Utils/utilsPlus";
import Modal from "../Model/Model";
import "./MovieCard.css";

type MovieCardProps = {
  movie: Movie;
  genres: Genre[];
}

const MovieCard = ({movie, genres}: MovieCardProps) =>
{
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () =>
  {
    setOpenModal(true);
  };

  const handleModalClose = () =>
  {
    setOpenModal(false);
  };

  const movieGenres = getGenres(genres, movie.genre_ids);

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        {movie.poster_path ? (
          <img
            src={getPosterPath(movie.poster_path)}
            alt={movie.title}
            className="movie-image"
          />
        ) : (
          <img
            src={noImage}
            alt="No Image"
            className="movie-image"
          />
        )}
      </div>
      <div className="movie-details">
        <div className="movie-details-top">
          <h3 className="movie-title">{movie.title || "No Title"}</h3>
          <p className="movie-genres">
            {movieGenres.length > 0
              ? movieGenres.join(" • ")
              : "No Genres Available"}
          </p>
        </div>
        <div className="movie-details-bottom">
          <button
            className="button"
            onClick={handleModalOpen}
          >
            Details
          </button>
          <div className="rating">
            <span className="rating-icon">&#9733;</span>
            <span className="rating-value">{movie.vote_average}</span>
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          movie={{
            ...movie,
            title: movie.title || "No Title",
            overview: movie.overview || "No Description"
          }}
          genres={genres}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default MovieCard;
