import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import { getPopular, makePosterPath } from "../data/api";
import MovieDetail from "../components/MovieDetail";

// interface
interface IResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface IPopular {
  page: number;
  results: IResults[];
  total_pages: number;
  total_results: number;
}

// styles
const PopularList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
  place-items: center;
  gap: 24px;
  width: 80%;
  min-width: 400px;
  max-width: 1200px;
  padding-top: 48px;
  margin: 0 auto;
`;
const MovieItem = styled(motion.div)`
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

const Popular = () => {
  const { isLoading, data } = useQuery<IPopular>(["Popular"], getPopular);
  const [movieID, setMovieID] = useState<number | null>(null);

  return (
    !isLoading && (
      <>
        <PopularList>
          {data?.results.map((movie) => (
            <MovieItem
              key={movie.id}
              layoutId={`${movie.id}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setMovieID(movie.id)}
            >
              <img src={`${makePosterPath(movie.poster_path)}`} alt="" />
            </MovieItem>
          ))}
        </PopularList>
        <AnimatePresence>
          {movieID && <MovieDetail movieID={movieID} setMovieID={setMovieID} />}
        </AnimatePresence>
      </>
    )
  );
};

export default Popular;
