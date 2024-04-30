import {useState} from "react";
import React, {useCallback, useEffect, useRef} from "react";
import {Genre} from "../../Types/Types";
import MoviesPerYear from "../MoviesPerYear/MoviePerYear";
import "./MoviesWithoutSearchQuery.css";

type MoviesWithoutSearchQueryProps = {
  genres: Genre[];
  filteredGenreIdSet: number[];
};

const MoviesWithoutSearchQuery = ({
  genres,
  filteredGenreIdSet
}: MoviesWithoutSearchQueryProps) =>
{
  const [years, setYears] = useState<number[]>([2012, 2013, 2014, 2015, 2016]);
  const [yearsBefore, setYearsBefore] = useState<number[]>([2010, 2011]);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [isAboveEmptyDiv, setIsAboveEmptyDiv] = useState(true);

  const emptyDivRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = useCallback(() =>
  {
    const emptyDiv = emptyDivRef.current;
    if(emptyDiv)
    {
      emptyDiv.scrollIntoView({behavior: "smooth"});
    }
    else
    {
      console.warn("The empty div element is not available.");
    }
  }, []);

  const handleScroll = useCallback(() =>
  {
    const scrollHeight = document.documentElement?.scrollHeight;
    const scrollTop = document.documentElement?.scrollTop;
    const clientHeight = document.documentElement?.clientHeight;

    if(scrollHeight === undefined || scrollTop === undefined || clientHeight === undefined)
    {
      console.warn("Unable to access scroll properties.");
      return;
    }

    const emptyDivRect = emptyDivRef.current?.getBoundingClientRect();
    if(emptyDivRect)
    {
      setIsAboveEmptyDiv(emptyDivRect.top > 0);
    }

    const nearTop = scrollTop < 200;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 200;

    setShowUpArrow(scrollTop > 0);

    if(nearTop)
    {
      const minYear = Math.min(...yearsBefore);

      if(minYear > 1800)
      {
        const nextYears = Array.from({length: 5}, (_, i) => minYear - i - 1).reverse();
        setYearsBefore((prevValues) =>
        {
          const mergedValues = [...nextYears, ...prevValues];
          return Array.from(new Set(mergedValues));
        });
      }
    }

    if(nearBottom)
    {
      const maxYear = Math.max(...years);
      const currentYear = new Date().getFullYear();

      if(maxYear < currentYear)
      {
        const nextYears = Array.from({length: currentYear - maxYear}, (_, i) => maxYear + i + 1);
        setYears((prevValues) => [...prevValues, ...nextYears]);
      }
    }
  }, [years, yearsBefore]);

  useEffect(() =>
  {
    window.addEventListener("scroll", handleScroll);

    return () =>
    {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() =>
  {
    if(emptyDivRef.current && window.location.hash === "")
    {
      emptyDivRef.current.scrollIntoView({behavior: "auto"});
    }
  }, []);

  return (
    <div className="movies-by-years">
      <div className="empty-div"></div>
      {yearsBefore.map((year) => (
        <MoviesPerYear
          key={year}
          year={year}
          genres={genres}
          filteredGenreIdSet={filteredGenreIdSet}
        />
      ))}
      <div
        className="empty-div"
        ref={emptyDivRef}
      ></div>
      {years.map((year) => (
        <MoviesPerYear
          key={year}
          year={year}
          genres={genres}
          filteredGenreIdSet={filteredGenreIdSet}
        />
      ))}
      <button onClick={handleScrollToTop}>
        {isAboveEmptyDiv ? "⬇️ Scroll to Start" : "⬆️ Scroll to Top"}
      </button>
      {showUpArrow && (
        <button
          className={`scroll-to-top-btn ${showUpArrow ? "show" : ""}`}
          onClick={handleScrollToTop}
          title={isAboveEmptyDiv ? "Scroll to Start" : "Scroll to Top"}
        >
          {isAboveEmptyDiv ? "⬇️" : "⬆️"}
        </button>
      )}
    </div>
  );
};

export default MoviesWithoutSearchQuery;
