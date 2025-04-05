import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import { getComingSoon, makePosterPath } from "../data/api";
import MovieDetail from "../components/MovieDetail";
import {IMovies} from "../data/interfaces"

// styles
const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
  place-items: center;
  gap: 24px;
  min-width: 400px;
  max-width: 1000px;
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

const ComingSoon = () => {
  const { isLoading, data } = useQuery<IMovies>(["ComingSoon"], getComingSoon);
  const [movieID, setMovieID] = useState<number | null>(null);

  return (
    !isLoading && (
      <>
        <MovieList>
          {data?.results.map((movie) => (
            <MovieItem
              key={movie.id}
              layoutId={`${movie.id}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setMovieID(movie.id)}
            >
              <img src={`${makePosterPath(movie.poster_path)}`} />
            </MovieItem>
          ))}
        </MovieList>
        <AnimatePresence>
          {movieID && <MovieDetail movieID={movieID} setMovieID={setMovieID} />}
        </AnimatePresence>
      </>
    )
  );
};

export default ComingSoon;
