import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import { getPopular, makePosterPath } from "../data/api";
import MovieDetail from "../components/MovieDetail";

// styles
const List = styled.ul`
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
const Item = styled(motion.li)`
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => {
    return { opacity: 1, y: 0, transition: { delay: 0.05 * index } };
  },
};

const MovieList = () => {
  const [movieID, setMovieID] = useState<number | null>(null);

  return (
    <List>
      {data?.results.map((movie, index) => (
        <Item
          key={movie.id}
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          custom={index}
          layoutId={`${movie.id}`}
          whileHover={{ scale: 1.1 }}
          onClick={() => setMovieID(movie.id)}
        >
          <img src={`${makePosterPath(movie.poster_path)}`} alt="" />
        </Item>
      ))}
    </List>
  );
};

export default MovieList;
